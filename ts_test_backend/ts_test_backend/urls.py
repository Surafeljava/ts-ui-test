"""
URL configuration for afroawi_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import google_login, CustomEmailConfirmView

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Test Savant Documentation",
        default_version='v1',
        description="API documentation for Test Savant UI application",
        terms_of_service="https://testsavant.ai/terms/",
        contact=openapi.Contact(email="testsavant@aspn.ai"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
]

urlpatterns += [
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