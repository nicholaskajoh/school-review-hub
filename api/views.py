from django.http import Http404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from api.models import *
from api.serializers import *
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
import datetime
from django.utils import timezone
from django.db.models import Q
from random import shuffle
from django.db.models import Count
from .forms import *

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
        reviews = Review.objects.filter(school__id=id).order_by('-updated_at')
        reviews = paginate(reviews, page, 10)
        serializer =  ReviewSerializer(reviews, many=True)
        response = Response(serializer.data)
        # add pagination headers
        response['X-Has-Previous'] = reviews.has_previous()
        response['X-Has-Next'] = reviews.has_next()
        return response


class SchoolReportsView(APIView):
    def get(self, request, id, page=1):
        reports = Report.objects.filter(school__id=id).order_by('-updated_at')
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
    queryset = School.objects.all().order_by('rank')[:5]
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
        comments = Comment.objects.filter(entity=entity, entity_id=id).order_by('-created_at')
        comments = paginate(comments, page, 5)
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
    queryset = Review.objects.filter(
        created_at__gt=timezone.now() - datetime.timedelta(days=30 * 3)
    ).order_by('-created_at')[:5]
    serializer_class = ReviewSerializer


class TopReportsView(generics.ListAPIView):
    queryset = Report.objects.filter(
        created_at__gt=timezone.now() - datetime.timedelta(days=30 * 3)
    ).order_by('-created_at')[:5]
    serializer_class = ReportSerializer


class RatedHigherThanView(APIView):
    def get(self, request, school_id):
        school = School.objects.filter(id=school_id).first()
        if school:
            lower_rated_schools = School.objects.filter(rating__lt=school.rating).order_by('rank')
            serializer =  SchoolSerializer(lower_rated_schools, many=True)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)


class SuggestedMatchesView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        matches = []
        user_comparisons = request.user.comparisons.all()
        user_schools = []
        for x in user_comparisons:
            user_schools += x.schools()
        user_schools = set(user_schools)
        # exlude schools that the user has already compared
        schools = School.objects.exclude(pk__in=user_schools)\
            .order_by('-id').values_list('id', 'name')
        selected_schools = []
        schools = list(schools)
        shuffle(schools)
        for school1 in schools:
            for school2 in schools:
                if len(matches) == 5:
                        break
                if not school1[0] == school2[0] and not school1[0] in selected_schools and not school2[0] in selected_schools:
                    # Avoid duplicates i.e school1 vs school2 and school2 vs school1
                    match_a = {'school1_id': school1[0], 'school2_id': school2[0], 'school1': school1[1], 'school2': school2[1]}
                    match_b = {'school1_id': school2[0], 'school2_id': school1[0], 'school1': school2[1], 'school2': school1[1]}                
                    selected_schools.append(school1[0])
                    selected_schools.append(school2[0])
                    if match_a not in matches and match_b not in matches:
                        matches.append(match_a)
        shuffle(matches)
        return Response(matches)


class RatingView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        import json
        data = json.loads(request.POST.get('data'))

        school1_id = data['schools']['school1_id']
        school2_id = data['schools']['school2_id']
        choices = data['choices']

        if school1_id != school2_id:
            # school1 id must be less than school2 id
            # swap variables if not
            if school1_id > school2_id:
                school1_id, school2_id = school2_id, school1_id

            for choice in choices:
                comparison, created = Comparison.objects.update_or_create(
                    criterion=Criterion.objects.get(id=choice['criterion_id']),
                    school1=School.objects.get(id=school1_id),
                    school2=School.objects.get(id=school2_id),
                    choice=School.objects.get(id=choice['choice']),
                    comparer=request.user)
                comparison.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class ProfileRatingsView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, page=1):
        ratings = (list(set(Comparison.objects
            .filter(comparer=request.user)
            .order_by('-id')
            .values_list('school1__id', 'school2__id', 'school1__name', 'school2__name'))))
        return Response(ratings)


class DeleteRatingView(APIView):
    permission_classes = (IsAuthenticated, )

    def delete(self, request, school1_id, school2_id):
        Comparison.objects.filter(school1__id=school1_id, school2__id=school2_id, comparer=request.user).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RegisterView(APIView):
    def post(self, request):
        form = RegisterForm(request.data or None)
        if form.is_valid():
            username = form.cleaned_data['username'].lower()
            email = form.cleaned_data['email'].lower()
            user = User(username=username, email=email)
            user.set_password(form.cleaned_data['password'])
            user.save()
            token  = Token.objects.create(user=user)
            return Response(data={'token':token.key}, status=status.HTTP_201_CREATED)
        return Response(data=form.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class UpvoteView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, entity_id, entity_type):
        upvote = Upvote.objects.filter(entity = entity_type,entity_id = entity_id,
            upvoter = request.user).first()
        if upvote:
            upvote.delete()
        else:
            Upvote.objects.create(entity = entity_type,entity_id = entity_id,
            upvoter = request.user)
        return Response(status=status.HTTP_200_OK)


class CheckUpvoteView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, entity_id, entity_type):
        upvote = Upvote.objects.filter(entity = entity_type,entity_id = entity_id,
            upvoter = request.user)
        if upvote.exists():
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)


class AddReviewView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        data = {
            'content': request.data['content'],
            'school': request.data['school'],
            'reviewer': request.user.id
        }
        form = ReviewForm(data or None)
        if form.is_valid():
            content = form.cleaned_data['content']
            school = form.cleaned_data['school']
            reviewer = form.cleaned_data['reviewer']
            review = Review.objects.filter(pk=request.data.get('id')).first()
            if review:
                review.content = content
                review.save()
            else:
                review = Review.objects.create(
                    reviewer=reviewer,school=school,
                    content=content
                )
            return Response(data=ReviewSerializer(review).data,status=status.HTTP_200_OK)
        return Response(data=form.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)    


class AddReportView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        data = {
            'content': request.data['content'],
            'school': request.data['school'],
            'reporter': request.user.id
        }
        form = ReportForm(data or None)
        if form.is_valid():
            content = form.cleaned_data['content']
            school = form.cleaned_data['school']
            reporter = form.cleaned_data['reporter']
            report = Report.objects.filter(pk=request.data.get('id')).first()
            if report:
                report.content = content
                report.save()
            else:
                report = Report.objects.create(
                    reporter=reporter,school=school,
                    content=content
                )
            return Response(data=ReportSerializer(report).data, status=status.HTTP_200_OK)
        return Response(data=form.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class CommentView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        data = {
            'comment': request.data['comment'],
            'entity_id': request.data['entity_id'],
            'entity': request.data['entity'],
            'commenter': request.user.id
        }
        form = CommentForm(data or None)
        if form.is_valid():
            comment_ = form.cleaned_data['comment']
            entity_id = form.cleaned_data['entity_id']
            entity = form.cleaned_data['entity']
            commenter = form.cleaned_data['commenter']
            comment = Comment.objects.create(
                commenter=commenter,entity_id=entity_id,
                entity=entity,comment=comment_
            )
            return Response(data=CommentSerializer(comment).data,status=status.HTTP_200_OK)
        return Response(data=form.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)    


class CheckOwnerView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, entity_id, entity_type):
        if entity_type == 'review':
            review = Review.objects.filter(pk=entity_id).first()
            if review and review.reviewer == request.user:
                return Response(status=status.HTTP_200_OK)
        
        if entity_type == 'report':
            report = Report.objects.filter(pk=entity_id).first()
            if report and report.reporter == request.user:
                return Response(status=status.HTTP_200_OK)

        if entity_type == 'comment':
            comment = Comment.objects.filter(pk=entity_id).first()
            if comment and comment.commenter == request.user:
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def get(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
