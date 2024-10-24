from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.contrib.auth import get_user_model

from dj_rest_auth.serializers import LoginSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer

User = get_user_model()

class CustomJWTSerializer(serializers.Serializer):
    token = serializers.CharField(read_only=True)
    refresh_token = serializers.CharField(read_only=True)
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)

    def to_representation(self, user):
        # Generate the JWT tokens
        refresh = RefreshToken.for_user(user)

        # Return the tokens and user info in the serialized format
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'username': user.username,
            'email': user.email,
        }