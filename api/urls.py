from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import *

urlpatterns = [
	path('token-auth', obtain_auth_token, name="login"),
	path('logout', LogoutView.as_view(), name='logout'),
	path('school/<int:id>', SchoolView.as_view(), name='school'),
	path('school/<int:id>/reviews/<int:page>', SchoolReviewsView.as_view(), name='school_reviews'),
	path('school/<int:id>/reports/<int:page>', SchoolReportsView.as_view(), name='school_reports'),
	path('schools-list', SchoolsListView.as_view(), name='schools_list'),
	path('top-schools', TopSchoolsView.as_view(), name='top_schools'),
	path('srh-index/<int:page>', SRHIndexView.as_view(), name='srh_index'),
	path('review/<int:id>', ReviewView.as_view(), name='review'),
	path('report/<int:id>', ReportView.as_view(), name='report'),
	path('<entity>/<int:id>/comments/<int:page>', CommentsView.as_view(), name='comments'),
	path('criteria', CriteriaListView.as_view(), name='criteria_list'),
	path('top-reviews', TopReviewsView.as_view(), name='top_reviews'),
	path('top-reports', TopReportsView.as_view(), name='top_reports'),
	path('rated-higher-than/<int:school_id>', RatedHigherThanView.as_view(), name='rated_higher_than'),
	path('suggested-matches', SuggestedMatchesView.as_view(), name='suggested_matches'),
	path('rating', RatingView.as_view(), name='rating'),
	path('profile', ProfileView.as_view(), name='profile'),
	path('profile/ratings/<int:page>', ProfileRatingsView.as_view(), name='profile_ratings'),
	path('rating/<int:school1_id>/<int:school2_id>', DeleteRatingView.as_view(), name='delete_rating'),
	path('register', RegisterView.as_view(), name='register'),
	path('upvote/<int:entity_id>/<entity_type>', UpvoteView.as_view(), name='upvote'),
	path('add-comment', CommentView.as_view(), name='comment'),
	path('add-review', AddReviewView.as_view(), name='add_review'),
	path('add-report', AddReportView.as_view(), name='add_report'),
	path('check-upvote/<int:entity_id>/<entity_type>', CheckUpvoteView.as_view(), name='check_upvote'),
]