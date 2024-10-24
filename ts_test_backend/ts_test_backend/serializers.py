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
            'token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'username': user.username,
            'email': user.email,
        }


class CustomLoginSerializer(LoginSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        custom_jwt_serializer = CustomJWTSerializer(user)
        token_data = custom_jwt_serializer.data
        data.update(token_data)
        return data

class CustomRegisterSerializer(RegisterSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.save(request=self.context.get('request'))
        custom_jwt_serializer = CustomJWTSerializer(user)
        token_data = custom_jwt_serializer.data
        data.update(token_data)
        return data