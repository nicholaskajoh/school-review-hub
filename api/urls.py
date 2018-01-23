from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from .views import *

urlpatterns = [
	path('token-auth', obtain_auth_token),
	path('school/<int:id>', SchoolView.as_view(), name='school'),
	path('school/<int:id>/reviews/<int:page>', SchoolReviewsView.as_view(), name='school_reviews'),
	path('school/<int:id>/reports/<int:page>', SchoolReportsView.as_view(), name='school_reports'),
	path('schools-list', SchoolsListView.as_view(), name='schools_list'),
	path('top-schools', TopSchoolsView.as_view(), name='top_schools'),
	path('srh-index/<int:page>', SRHIndexView.as_view(), name='srh_index'),
	path('review/<int:id>', ReviewView.as_view(), name='review'),
	path('<entity>/<int:id>/comments/<int:page>', CommentsView.as_view(), name='comments'),
	path('criteria', CriteriaListView.as_view(), name='criteria_list'),
	path('top-reviews', TopReviewsView.as_view(), name='top_reviews'),
	path('top-reports', TopReportsView.as_view(), name='top_reports'),
	path('rated-higher-than/<int:school_id>', RatedHigherThanView.as_view(), name='rated_higher_than'),
]