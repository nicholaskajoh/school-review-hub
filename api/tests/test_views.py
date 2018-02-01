from django.test import TestCase
from .factories import *
from django.shortcuts import reverse
from api.serializers import *
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
# from api.models import School, Review, Comment, Comparison, Criterion, Report, Upvote

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

class SchoolReviewsViewTestCase(TestCase):

  def setUp(self):
    self.user1 = UserFactory(email='user1@srh.com')
    self.user2 = UserFactory(email='user2@srh.com')
    self.school = SchoolFactory(
      name='CU',location='Ogun',logo_url='',website='covenantuniversity.edu.ng',
      rank=1,rating=140.0,
    )
    self.review1 = ReviewFactory(reviewer=self.user1, school=self.school)
    self.review2 = ReviewFactory(reviewer=self.user2, school=self.school)

  def test_school_reviews_endpoint_is_working(self):
    url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':1})
    response = self.client.get(url)
    self.assertEqual(response.status_code, 200)

  def test_if_endpoint_returns_review(self):
    url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':1})
    response = self.client.get(url)
    reviews = Review.objects.filter(school=self.school).order_by('-updated_at')
    reviews = paginate(reviews, 1, 1)
    serialized = ReviewSerializer(reviews, many=True)
    self.assertEqual(response.data, serialized.data)

  def test_if_endpoint_returns_second_review_with_page_2(self):
    url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':2})
    response = self.client.get(url)
    reviews = Review.objects.filter(school=self.school).order_by('-updated_at')
    reviews = paginate(reviews, 2, 1)
    serialized = ReviewSerializer(reviews, many=True)
    self.assertEqual(response.data, serialized.data)

class SchoolReportsViewTestCase(TestCase):

  def setUp(self):
    self.user1 = UserFactory(email='user1@srh.com')
    self.user2 = UserFactory(email='user2@srh.com')
    self.school = SchoolFactory(
      name='CU',location='Ogun',logo_url='',website='covenantuniversity.edu.ng',
      rank=1,rating=140.0,
    )
    self.report = ReportFactory(reporter=self.user1, school=self.school)
    self.report2 = ReportFactory(reporter=self.user2, school=self.school)

  def test_school_reports_endpoint_is_working(self):
    url = reverse('school_reports', kwargs={'id':self.school.pk,'page':1})
    response = self.client.get(url)
    self.assertEqual(response.status_code, 200)

  def test_if_endpoint_returns_report(self):
    url = reverse('school_reports', kwargs={'id':self.school.pk,'page':1})
    response = self.client.get(url)
    reports = Report.objects.filter(school=self.school).order_by('-updated_at')
    reports = paginate(reports, 1, 10)
    serialized = ReportSerializer(reports, many=True)
    self.assertEqual(response.data, serialized.data)

  def test_if_endpoint_returns_first_page_result_on_empty_page(self):
    # set page to a page higher than number of pages
    url = reverse('school_reports', kwargs={'id':self.school.pk,'page':10})
    response = self.client.get(url)
    reports = Report.objects.filter(school=self.school).order_by('-updated_at')
    # get result of the first page
    reports = paginate(reports, 1, 10)
    serialized = ReportSerializer(reports, many=True)
    # it should return the first page results
    self.assertEqual(response.data, serialized.data)

  # self.assertContains(response, '1-title')
