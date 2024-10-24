from google.auth.transport import requests
from google.oauth2 import id_token
from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from ts_test_backend.serializers import CustomJWTSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt


from allauth.account.views import ConfirmEmailView
from django.shortcuts import redirect

User = get_user_model()

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def google_login(request):
    token = request.data.get('token')

    try:
        # Verify the token with Google's servers
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.SOCIAL_AUTH_GOOGLE_CLIENT_ID)
        # Get user info from token
        google_user_id = idinfo['sub']
        email = idinfo.get('email')

        # Create or get the user
        user, created = User.objects.get_or_create(email=email)

        # Use your custom serializer to generate the JWT token
        serializer = CustomJWTSerializer(user)
        token_data = serializer.data

        return JsonResponse(token_data)
    except ValueError:
        print("token--->>>" , token)
        return JsonResponse({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class CustomEmailConfirmView(ConfirmEmailView):
    def get(self, *args, **kwargs):
        # Handle the email confirmation logic
        response = super().get(*args, **kwargs)

        # On success, redirect to your Next.js app
        if self.request.method == 'GET':
            # Replace '/email-confirmed' with the actual route in your Next.js app
            return redirect('http://localhost:3000/auth/email-confirmed')
        
        return response