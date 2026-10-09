import os
import requests
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from useraccount.models import User
from google.oauth2.credentials import Credentials
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from rest_framework_simplejwt.tokens import RefreshToken
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])
def google_auth(request):
    try:
        logger.debug("Request data: %s", request.data)

        id_token_str = request.data.get('id_token')
        if not id_token_str:
            raise ValueError("No id_token provided")

        # Verify ID token — allow 10s of clock skew to prevent intermittent
        # failures caused by minor drift between local clock and Google servers.
        idinfo = id_token.verify_oauth2_token(
            id_token_str,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID,
            clock_skew_in_seconds=10,
        )

        email = idinfo['email']
        picture_url = idinfo.get('picture', '')
        user, created = User.objects.get_or_create(
            email=email,
            defaults={'name': idinfo.get('name', '')}
        )

        # Download and save avatar — isolated so a picture failure never
        # blocks the login flow (common for Google Workspace accounts).
        if picture_url:
            try:
                pic_response = requests.get(picture_url, timeout=5)
                if pic_response.status_code == 200:
                    filename = f"{user.id}.jpg"
                    user.avatar.save(filename, ContentFile(pic_response.content), save=True)
            except Exception as pic_err:
                logger.warning("Could not download avatar for %s: %s", email, pic_err)

        refresh = RefreshToken.for_user(user)

        # Safely resolve avatar URL — field may have no file if avatar was
        # never saved (e.g. new Workspace user whose picture download failed).
        try:
            profile_picture = user.avatar.url if user.avatar else ''
        except Exception:
            profile_picture = ''

        response_data = {
            'user_id': str(user.id),
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'profile_picture': profile_picture,
        }

        logger.debug("Response data: %s", response_data)

        return Response(response_data)

    except Exception as e:
        logger.error("Error during Google authentication [%s]: %s", type(e).__name__, str(e))
        return Response({'error': str(e), 'type': type(e).__name__}, status=400)