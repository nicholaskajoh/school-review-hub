from django.http import Http404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import status, generics
from django.contrib.auth.models import User
from .models import *
from .serializers import *
# from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

class SchoolView(generics.RetrieveAPIView):
  model = School
  serializer_class = SchoolSerializer
  # lookup_field = 'id'
  permission_classes = (IsAuthenticated, )

  def get_school(self, school_id):
    try:
      return School.objects.get(pk=school_id)
    except School.DoesNotExist:
      raise Http404("School does not exist!")

  def get_queryset(self):
    return self.get_school(self.kwargs['school_id'])

  # single school
  def get(self, request, school_id, format=None):
    school = self.get_school(school_id)
    serializer = SchoolSerializer(school)
    return Response(serializer.data)


class SchoolsListView(generics.ListAPIView):
  queryset = School.objects.all()
  serializer_class = SchoolsListSerializer
