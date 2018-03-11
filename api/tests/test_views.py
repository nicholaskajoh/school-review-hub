from django.test import TestCase
from .factories import *
from django.shortcuts import reverse
from api.serializers import *
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from api.management.commands import rate_and_rank
# from unittest import mock
import datetime
from django.conf import settings

# set PRODUCTION to false to prevent api calls to sentiment service
settings.PRODUCTION = False


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
        self.school = SchoolFactory()
        # create many reviews for pagination
        for x in range(21):
            ReviewFactory(school=self.school)

    def test_if_school_reviews_endpoint_returns_review(self):
        url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        reviews = Review.objects.filter(school=self.school).order_by('-updated_at')
        reviews = paginate(reviews, 1, 10)
        serialized = ReviewSerializer(reviews, many=True)
        self.assertEqual(response.data, serialized.data)

    def test_if_school_reviews_endpoint_returns_correct_next_page(self):
        url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':2})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        reviews = Review.objects.filter(school=self.school).order_by('-updated_at')
        reviews = paginate(reviews, 2, 10)
        serialized = ReviewSerializer(reviews, many=True)
        self.assertEqual(response.data, serialized.data)

    def test_if_school_reviews_endpoint_returns_last_page_result_on_empty_page(self):
        # set page to a page higher than number of pages
        url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':10})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        reviews = Review.objects.filter(school=self.school).order_by('-updated_at')
        # get result of the last page
        reviews = paginate(reviews, 3, 10)
        serialized = ReviewSerializer(reviews, many=True)
        # it should return the last page results
        self.assertEqual(response.data, serialized.data)

    def test_if_school_reviews_endpoint_has_has_previous_and_has_next_keys(self):
        url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        # page one should have 'X-Has-Next' but 'X-Has-Previous'
        self.assertEqual(response['X-Has-Next'], 'True')
        self.assertEqual(response['X-Has-Previous'], 'False')

        url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':2})
        response = self.client.get(url)
        # any middle page should have 'X-Has-Previous' and 'X-Has-Next'
        self.assertEqual(response['X-Has-Previous'], 'True')
        self.assertEqual(response['X-Has-Next'], 'True')

        url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':3})
        response = self.client.get(url)
        # the last page should have 'X-Has-Previous' not 'X-Has-Next'
        self.assertEqual(response['X-Has-Previous'], 'True')
        self.assertEqual(response['X-Has-Next'], 'False')

class SchoolReportsViewTestCase(TestCase):

    def setUp(self):
        self.school = SchoolFactory()
        # create many reports for pagination
        for x in range(21):
            ReportFactory(school=self.school)

    def test_if_school_reports_endpoint_returns_report(self):
        url = reverse('school_reports', kwargs={'id':self.school.pk,'page':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        reports = Report.objects.filter(school=self.school).order_by('-updated_at')
        reports = paginate(reports, 1, 10)
        serialized = ReportSerializer(reports, many=True)
        self.assertEqual(response.data, serialized.data)
    
    def test_if_school_reports_endpoint_returns_correct_next_page(self):
        url = reverse('school_reports', kwargs={'id':self.school.pk,'page':2})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        reports = Report.objects.filter(school=self.school).order_by('-updated_at')
        reports = paginate(reports, 2, 10)
        serialized = ReportSerializer(reports, many=True)
        self.assertEqual(response.data, serialized.data)

    def test_if_school_reports_endpoint_returns_last_page_result_on_empty_page(self):
        # set page to a page higher than number of pages
        url = reverse('school_reports', kwargs={'id':self.school.pk,'page':10})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        reports = Report.objects.filter(school=self.school).order_by('-updated_at')
        # get result of the last page
        reports = paginate(reports, 3, 10)
        serialized = ReportSerializer(reports, many=True)
        # it should return the last page results
        self.assertEqual(response.data, serialized.data)

    def test_if_school_reports_endpoint_has_has_previous_and_has_next_keys(self):
        url = reverse('school_reports', kwargs={'id':self.school.pk,'page':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        # page one should have none of these 'X-Has-Next', 'X-Has-Previous'
        # since it has
        self.assertEqual(response['X-Has-Next'], 'True')
        self.assertEqual(response['X-Has-Previous'], 'False')

        url = reverse('school_reports', kwargs={'id':self.school.pk,'page':2})
        response = self.client.get(url)
        # any middle page should have 'X-Has-Previous' and 'X-Has-Next'
        self.assertEqual(response['X-Has-Previous'], 'True')
        self.assertEqual(response['X-Has-Next'], 'True')

        url = reverse('school_reports', kwargs={'id':self.school.pk,'page':3})
        response = self.client.get(url)
        # the last page should have 'X-Has-Previous' not 'X-Has-Next'
        self.assertEqual(response['X-Has-Previous'], 'True')
        self.assertEqual(response['X-Has-Next'], 'False')


class SchoolViewTestCase(TestCase):

    def setUp(self):
        self.school = SchoolFactory()

    def test_if_school_endpoint_returns_school(self):
        url = reverse('school', kwargs={'id':self.school.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        serialized = SchoolSerializer(self.school)
        self.assertEqual(response.data, serialized.data)

    def test_if_school_endpoint_returns_error_on_wrong_school_id(self):
        # put an id of a school that does not exist
        url = reverse('school', kwargs={'id':5})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)


class SchoolsListViewTestCase(TestCase):

    def setUp(self):
        # create five schools
        for x in range(5):
            SchoolFactory()

    def test_if_school_list_endpoint_returns_all_schools(self):
        url = reverse('schools_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        schools = School.objects.all()
        serialized = SchoolsListSerializer(schools, many=True)
        self.assertEqual(len(response.data), schools.count())
        self.assertEqual(response.data, serialized.data)

    def test_if_school_list_contains_only_id_and_data(self):
        url = reverse('schools_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        for school in response.data:
            # test number of ordered dict it has, it should be 2 i.e ('id', ), ('name', '')
            self.assertEqual(school.__len__(), 2)

            self.assertEqual(str(school.keys()), "odict_keys(['id', 'name'])")
            self.assertTrue(school.__contains__('id'))
            self.assertTrue(school.__contains__('name'))


class TopSchoolsViewTestCase(TestCase):

    def setUp(self):
        self.school = SchoolFactory(
          name='CU',location='Ogun',logo_url='',website='covenantuniversity.edu.ng',
          rank=1,rating=140.0,
        )
        self.school2 = SchoolFactory(
          name='ABUAD',location='Ekiti',logo_url='',website='abuad.edu.ng',
          rank=2,rating=130.0,
        )
        self.school3 = SchoolFactory(
          name='LMU',location='Kwara',logo_url='',website='lmu.edu.ng',
          rank=3,rating=120.0,
        )
        self.school4 = SchoolFactory(
          name='Harvard',location='Abia',logo_url='',website='havard.edu.ng',
          rank=3,rating=100.0,
        )
        self.school5 = SchoolFactory(
          name='Crest',location='Kaduna',logo_url='',website='crest.edu.ng',
          rank=5,rating=80.0,
        )
        self.school6 = SchoolFactory(
          name='Avengers',location='Marvel',logo_url='',website='avg.edu.ng',
          rank=6,rating=60.0,
        )
        self.school7 = SchoolFactory(
          name='Justice League',location='DC',logo_url='',website='jl.edu.ng',
          rank=7,rating=40.0,
        )

    def test_if_top_schools_endpoint_returns_5_top_schools(self):
        url = reverse('top_schools')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        schools = School.objects.all().order_by('rank')[:5]
        serialized = SchoolSerializer(schools, many=True)

        self.assertEqual(len(response.data), schools.count())
        self.assertEqual(response.data, serialized.data)

    def test_if_top_schools_ranks_correctly(self):
        url = reverse('top_schools')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        current_top = response.data[0]
        for top_school in response.data:
            self.assertTrue(top_school['rank'] >= current_top['rank'])


class SRHIndexViewTestCase(TestCase):

    def setUp(self):
        # create schools and comparisons
        for x in range(30):
            school1 = SchoolFactory()
            school2 = SchoolFactory()
            ComparisonFactory(school1=school1, school2=school2, choice=school2)
        # run the rate_and_rank command
        # so there would be rating and ranking for the schools
        cmd = rate_and_rank.Command()
        cmd.handle()


    def test_if_srh_index_ranks_schools_correctly(self):
        url = reverse('srh_index', kwargs={'page':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        current = response.data[0]
        for school in response.data:
            self.assertTrue(school['rank'] >= current['rank'])

    def test_if_srh_index_returns_20_schools_on_page_one(self):
        url = reverse('srh_index', kwargs={'page':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        schools = School.objects.all().order_by('rank')
        schools = paginate(schools, 1, 20)
        serialized = SchoolSerializer(schools, many=True)
        self.assertEqual(response.data, serialized.data)

    def test_if_srh_index_returns_next_20_schools_on_page_two(self):
        url = reverse('srh_index', kwargs={'page':2})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        schools = School.objects.all().order_by('rank')
        schools = paginate(schools, 2, 20)
        serialized = SchoolSerializer(schools, many=True)
        self.assertEqual(response.data, serialized.data)

    def test_if_srh_index_endpoint_returns_last_page_result_on_empty_page(self):
        # set page to a page higher than number of pages
        url = reverse('srh_index', kwargs={'page':10})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        schools = School.objects.all().order_by('rank')
        # get result of the last page
        schools = paginate(schools, 3, 20)
        serialized = SchoolSerializer(schools, many=True)
        # it should return the last page results
        self.assertEqual(response.data, serialized.data)

    def test_if_srh_index_endpoint_has_has_previous_and_has_next_keys(self):
        url = reverse('srh_index', kwargs={'page':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        # page one should have 'X-Has-Next' but 'X-Has-Previous'
        self.assertEqual(response['X-Has-Next'], 'True')
        self.assertEqual(response['X-Has-Previous'], 'False')

        url = reverse('srh_index', kwargs={'page':2})
        response = self.client.get(url)
        # any middle page should have 'X-Has-Previous' and 'X-Has-Next'
        self.assertEqual(response['X-Has-Previous'], 'True')
        self.assertEqual(response['X-Has-Next'], 'True')

        url = reverse('srh_index', kwargs={'page':3})
        response = self.client.get(url)
        # the last page should have 'X-Has-Previous' not 'X-Has-Next'
        self.assertEqual(response['X-Has-Previous'], 'True')
        self.assertEqual(response['X-Has-Next'], 'False')


class ReviewViewTestCase(TestCase):

    def setUp(self):
        self.review = ReviewFactory()

    def test_if_review_endpoint_returns_review(self):
        url = reverse('review', kwargs={'id':self.review.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        serialized = ReviewSerializer(self.review)
        self.assertEqual(response.data, serialized.data)

    def test_if_review_endpoint_returns_error_on_wrong_review_id(self):
        # put an id of a review that does not exist
        url = reverse('review', kwargs={'id':5})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)


class ReportViewTestCase(TestCase):

    def setUp(self):
        self.report = ReportFactory()

    def test_if_report_endpoint_returns_report(self):
        url = reverse('report', kwargs={'id':self.report.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        serialized = ReportSerializer(self.report)
        self.assertEqual(response.data, serialized.data)

    def test_if_report_endpoint_returns_error_on_wrong_report_id(self):
        # put an id of a report that does not exist
        url = reverse('report', kwargs={'id':5})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)


class CommentsViewTestCase(TestCase):

    def setUp(self):
        self.review = ReviewFactory()
        for x in range(11):
            CommentFactory(entity='review', entity_id=self.review.pk)


    def test_if_comments_endpoint_returns_comments(self):
        url = reverse('comments', kwargs={'entity': 'review',
            'id':self.review.pk, 'page': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        comments = Comment.objects.filter(entity='review', entity_id=self.review.pk)\
            .order_by('-created_at')
        
        comments = paginate(comments, 1, 5)

        serialized = CommentSerializer(comments, many=True)
        self.assertEqual(response.data, serialized.data)

    def test_if_comments_endpoint_has_has_previous_and_has_next_keys(self):
        url = reverse('comments', kwargs={'entity': 'review',
            'id':self.review.pk, 'page': 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        # page one should have 'X-Has-Next' but 'X-Has-Previous'
        self.assertEqual(response['X-Has-Next'], 'True')
        self.assertEqual(response['X-Has-Previous'], 'False')

        url = reverse('comments', kwargs={'entity': 'review',
            'id':self.review.pk, 'page': 2})
        response = self.client.get(url)
        # any middle page should have 'X-Has-Previous' and 'X-Has-Next'
        self.assertEqual(response['X-Has-Previous'], 'True')
        self.assertEqual(response['X-Has-Next'], 'True')

        url = reverse('comments', kwargs={'entity': 'review',
            'id':self.review.pk, 'page': 3})
        response = self.client.get(url)
        # the last page should have 'X-Has-Previous' not 'X-Has-Next'
        self.assertEqual(response['X-Has-Previous'], 'True')
        self.assertEqual(response['X-Has-Next'], 'False')


# mock the date created.
class TopReviewsViewTestCase(TestCase):

    def setUp(self):
        # create reviews whose date is 3 months before timezone.now()
        for x in range(5):
            review = ReviewFactory()
            review.created_at = datetime.datetime(2018, 1, 6, 20, 32, 35, 74424)
            review.save()
        
        # create reviews whose date is ealier than 3 months
        for x in range(5):
            review = ReviewFactory()
            review.created_at = datetime.datetime(2016, 12, 6, 20, 32, 35, 74424)
            review.save()
    
    # @mock.patch('api.views.datetime.timedelta')
    # @mock.patch('api.views.timezone.now')
    def test_if_top_reviews_endpoint_returns_top_5_reviews(self):
    # def test_if_top_review_endpoint_returns_top_5_reviews(self, mock_now, mock_timedelta):        
        # def func(days):
        #     return datetime.datetime(days)            
        # mock_timedelta.return_value = func

        # def func2():
        #     return datetime.datetime(2018, 3, 6, 20, 35, 25, 650482)
        # mock_now.return_value = func2

        url = reverse('top_reviews')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        # mock_timedelta.assert_called_with(30 * 3)
        # mock_now.assert_called()

        # assert that there are 10 reviews in the database
        self.assertEqual(Review.objects.count(), 10)

        reviews = Review.objects.filter(
            created_at__gt=datetime.datetime(2017, 12, 6, 20, 35, 25, 650482)
        ).order_by('-created_at')
        # assert that there are 5 reviews within specified date
        self.assertEqual(reviews.count(), 5)
        serialized = ReviewSerializer(reviews, many=True)
        self.assertEqual(response.data, serialized.data)


class TopReportsViewTestCase(TestCase):

    def setUp(self):
        # create reports whose date is 3 months before timezone.now()
        for x in range(5):
            report = ReportFactory()
            report.created_at = datetime.datetime(2018, 1, 6, 20, 32, 35, 74424)
            report.save()
        
        # create reports whose date is ealier than 3 months
        for x in range(5):
            report = ReportFactory()
            report.created_at = datetime.datetime(2016, 12, 6, 20, 32, 35, 74424)
            report.save()
    
    # @mock.patch('api.ports.datetime.timedelta')
    # @mock.patch('api.ports.timezone.now')
    def test_if_top_reports_endpoint_returns_top_5_reports(self):
    # def test_if_top_report_endpoint_returns_top_5_reports(self, mock_now, mock_timedelta):        
        # def func(days):
        #     return datetime.datetime(days)            
        # mock_timedelta.return_value = func

        # def func2():
        #     return datetime.datetime(2018, 3, 6, 20, 35, 25, 650482)
        # mock_now.return_value = func2

        url = reverse('top_reports')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        # mock_timedelta.assert_called_with(30 * 3)
        # mock_now.assert_called()

        # assert that there are 10 reports in the database
        self.assertEqual(Report.objects.count(), 10)

        reports = Report.objects.filter(
            created_at__gt=datetime.datetime(2017, 12, 6, 20, 35, 25, 650482)
        ).order_by('-created_at')
        # assert that there are 5 reports within specified date
        self.assertEqual(reports.count(), 5)
        serialized = ReportSerializer(reports, many=True)
        self.assertEqual(response.data, serialized.data)