from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import User
from .serializers import UserDetailSerializer
from .forms import AvatarUpdateForm, UserDetailsUpdateForm

@api_view(['GET'])
def user_details(request,pk):
    user=User.objects.get(pk=pk)
    serializer=UserDetailSerializer(user)
    return JsonResponse(serializer.data)

@api_view(['POST'])
def update_avatar(request):
    if 'avatar' not in request.FILES:
        return JsonResponse({
            'success': False,
            'message': 'No avatar file provided'
        }, status=400)

    form = AvatarUpdateForm(request.POST, request.FILES, instance=request.user)
    if form.is_valid():
        user = form.save()
        return JsonResponse({
            'success': True,
            'message': 'Avatar updated successfully',
            'avatar_url': user.avatar.url if user.avatar else None,
        })
    else:
        error_messages = {
            'field_errors': form.errors,
            'non_field_errors': form.non_field_errors()
        }
        return JsonResponse({
            'success': False,
            'errors': error_messages,
        }, status=400)
    

@api_view(['POST'])
def update_user_details(request):
    form = UserDetailsUpdateForm(request.POST,instance=request.user)
    if form.is_valid():
        user = form.save()
        return JsonResponse({
            'success': True,
            'message': 'User details updated successfully',
        })
    
    else:
        error_messages = {
            'field_errors': form.errors,
            'non_field_errors': form.non_field_errors()
        }
        return JsonResponse({
            'success': False,
            'errors': error_messages,
        }, status=400)