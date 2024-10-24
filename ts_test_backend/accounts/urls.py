from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import google_login, CustomEmailConfirmView

urlpatterns = [
    # DRF Browsable API login
    path('api-auth/', include('rest_framework.urls')),

    # JWT Authentication
    path('auth/jwt/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT obtain
    path('auth/jwt/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # JWT refresh
    
    # Google OAuth2 login (Allauth social login)
    path('auth/social/google/', google_login),
    
    path('auth/', include('dj_rest_auth.urls')),  # Allauth endpoints (login/logout)
    path('auth/signup/', include('dj_rest_auth.registration.urls')),


    path('auth/confirm-email/<str:key>/', CustomEmailConfirmView.as_view(), name='account_confirm_email'),
]