from django.dispatch import receiver
from allauth.socialaccount.signals import social_account_added, social_account_updated
from rest_framework_simplejwt.tokens import RefreshToken
from ts_test_backend.serializers import CustomJWTSerializer
from django.http import JsonResponse

@receiver(social_account_added)
@receiver(social_account_updated)
def create_jwt_after_google_login(request, sociallogin, **kwargs):
    user = sociallogin.user
    refresh = RefreshToken.for_user(user)

    # Use the custom serializer to create the JWT
    serializer = CustomJWTSerializer(user)
    token_data = serializer.data

    # You can return or log the JWT token as needed
    return JsonResponse(token_data)