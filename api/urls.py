from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from .views import *

urlpatterns = [
	path('token-auth', obtain_auth_token),
	path('school/<int:id>', SchoolView.as_view(), name='school'),
	path('schools-list', SchoolsListView.as_view(), name='schools_list'),
	path('srh-index/<int:page>', SRHIndexView.as_view(), name='srh_index'),
]