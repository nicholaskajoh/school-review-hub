from django.http import Http404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework import status, generics
from django.contrib.auth.models import User
from .models import *
from .serializers import *
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
import datetime

# Pagination function.
def paginate(input_list, page, results_per_page=10):
    paginator = Paginator(input_list, results_per_page)
    try:
        output_list = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver 1st page.
        output_list = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), return last page.
        output_list = paginator.page(paginator.num_pages)
    return output_list

class SchoolView(generics.RetrieveAPIView):
    queryset = School.objects.all()
    lookup_field = 'id'
    serializer_class = SchoolSerializer


class SchoolReviewsView(APIView):
    def get(self, request, id, page=1):
        reviews = Review.objects.filter(school__id=id)
        reviews = paginate(reviews, page, 10)
        serializer =  ReviewSerializer(reviews, many=True)
        response = Response(serializer.data)
        # add pagination headers
        response['X-Has-Previous'] = reviews.has_previous()
        response['X-Has-Next'] = reviews.has_next()
        return response


class SchoolReportsView(APIView):
    def get(self, request, id, page=1):
        reports = Report.objects.filter(school__id=id)
        reports = paginate(reports, page, 10)
        serializer =  ReportSerializer(reports, many=True)
        response = Response(serializer.data)
        # add pagination headers
        response['X-Has-Previous'] = reports.has_previous()
        response['X-Has-Next'] = reports.has_next()
        return response


class SchoolsListView(generics.ListAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolsListSerializer


class TopSchoolsView(generics.ListAPIView):
    queryset = School.objects.all()[:5]
    serializer_class = SchoolSerializer


class SRHIndexView(APIView):
    def get(self, request, page=1):
        srhi = School.objects.all().order_by('rank')
        srhi = paginate(srhi, page, 20)
        serializer =  SchoolSerializer(srhi, many=True)
        response = Response(serializer.data)
        # add pagination headers
        response['X-Has-Previous'] = srhi.has_previous()
        response['X-Has-Next'] = srhi.has_next()
        return response


class ReviewView(generics.RetrieveAPIView):
    queryset = Review.objects.all()
    lookup_field = 'id'
    serializer_class = ReviewSerializer


class ReportView(generics.RetrieveAPIView):
    queryset = Report.objects.all()
    lookup_field = 'id'
    serializer_class = ReportSerializer


class CommentsView(APIView):
    def get(self, request, entity, id, page=1):
        comments = Comment.objects.filter(entity=entity, entity_id=id)
        comments = paginate(comments, page, 10)
        serializer =  CommentSerializer(comments, many=True)
        response = Response(serializer.data)
        # add pagination headers
        response['X-Has-Previous'] = comments.has_previous()
        response['X-Has-Next'] = comments.has_next()
        return response


class CriteriaListView(generics.ListAPIView):
    queryset = Criterion.objects.all()
    serializer_class = CriterionSerializer


class TopReviewsView(generics.ListAPIView):
    queryset = Review.objects.filter(created_at__gt=datetime.datetime.today() - datetime.timedelta(days=30 * 3))[:5]
    serializer_class = ReviewSerializer


class TopReportsView(generics.ListAPIView):
    queryset = Report.objects.filter(created_at__gt=datetime.datetime.today() - datetime.timedelta(days=30 * 3))[:5]
    serializer_class = ReportSerializer