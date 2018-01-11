from django.http import Http404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework import status, generics
from django.contrib.auth.models import User
from .models import *
from .serializers import *
from .srh_index import SRHIndex
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

def paginate(input_list, page, results_per_page=10):
  paginator = Paginator(input_list, results_per_page)
  try:
    output_list = paginator.page(page)
  except PageNotAnInteger:
    # If page is not an integer, deliver 1st page.
    output_list = paginator.page(1)
  except EmptyPage:
    # If page is out of range (e.g. 9999), return last page
    output_list = paginator.page(paginator.num_pages)
  return output_list

class SchoolView(generics.RetrieveAPIView):
  queryset = School.objects.all()
  lookup_field = 'id'
  serializer_class = SchoolSerializer


class SchoolsListView(generics.ListAPIView):
  queryset = School.objects.all()
  serializer_class = SchoolsListSerializer


class SRHIndexView(APIView):
  def get(self, request, page=1):
    srhi = SRHIndex()
    srhi = paginate(srhi.get(), page, 20)
    serializer =  SRHIndexSerializer(srhi, many=True)
    response = Response(serializer.data)
    # add pagination headers
    response['X-Has-Previous'] = srhi.has_previous()
    response['X-Has-Next'] = srhi.has_next()
    return response