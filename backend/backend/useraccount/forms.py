from django import forms
from .models import User

class AvatarUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['avatar']

    def clean_avatar(self):
        avatar = self.cleaned_data.get('avatar')

        # Check if the uploaded file exists
        if not avatar:
            raise forms.ValidationError("No file uploaded.")

        # Check file extension
        if not avatar.name.endswith(('.jpg', '.jpeg', '.png')):
            raise forms.ValidationError("Only JPG, JPEG, and PNG files are allowed.")

        # Check file size (limit: 5MB)
        if avatar.size > 5 * 1024 * 1024:  # 5MB
            raise forms.ValidationError("The file size exceeds the 5MB limit.")

        return avatar
    
class UserDetailsUpdateForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['name', 'about_me']