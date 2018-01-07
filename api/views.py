from django.http import Http404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import status, generics
from django.contrib.auth.models import User
from .models import *
from .serializers import *
# from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

class SchoolView(generics.RetrieveAPIView):
  queryset = School.objects.all()
  lookup_field = 'id'
  serializer_class = SchoolSerializer


class SchoolsListView(generics.ListAPIView):
  queryset = School.objects.all()
  serializer_class = SchoolsListSerializer
