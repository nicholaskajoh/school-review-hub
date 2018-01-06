from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from .views import *

urlpatterns = [
	path('token-auth', obtain_auth_token),
	path('school/<int:school_id>', SchoolView.as_view(), name='school'),
]