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
        self.user1 = UserFactory()
        self.user2 = UserFactory()
        self.school = SchoolFactory(
        name='CU',location='Ogun',logo_url='',website='covenantuniversity.edu.ng',
        rank=1,rating=140.0,
        )
        # create 11 reviews for pagination
        for x in range(11):
            ReviewFactory(reviewer=self.user1, school=self.school)

    def test_if_school_reviews_endpoint_is_working(self):
        url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_if_school_reviews_endpoint_returns_review(self):
        url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':1})
        response = self.client.get(url)
        reviews = Review.objects.filter(school=self.school).order_by('-updated_at')
        reviews = paginate(reviews, 1, 10)
        serialized = ReviewSerializer(reviews, many=True)
        self.assertEqual(response.data, serialized.data)

    def test_if_school_reviews_endpoint_returns_correct_next_page(self):
        url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':2})
        response = self.client.get(url)
        reviews = Review.objects.filter(school=self.school).order_by('-updated_at')
        reviews = paginate(reviews, 2, 10)
        serialized = ReviewSerializer(reviews, many=True)
        self.assertEqual(response.data, serialized.data)

    def test_if_school_reviews_endpoint_returns_last_page_result_on_empty_page(self):
        # set page to a page higher than number of pages
        url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':10})
        response = self.client.get(url)
        reviews = Review.objects.filter(school=self.school).order_by('-updated_at')
        # get result of the last page
        reviews = paginate(reviews, 2, 10)
        serialized = ReviewSerializer(reviews, many=True)
        # it should return the last page results
        self.assertEqual(response.data, serialized.data)

    def test_if_school_reviews_endpoint_has_has_previous_and_has_next_keys(self):
        url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':1})
        response = self.client.get(url)
        # page one should have 'X-Has-Next' but 'X-Has-Previous'
        self.assertEqual(response['X-Has-Next'], 'True')
        self.assertEqual(response['X-Has-Previous'], 'False')

        url = reverse('school_reviews', kwargs={'id':self.school.pk,'page':2})
        response = self.client.get(url)
        # the last page should have 'X-Has-Previous' not 'X-Has-Next'
        self.assertEqual(response['X-Has-Previous'], 'True')
        self.assertEqual(response['X-Has-Next'], 'False')

class SchoolReportsViewTestCase(TestCase):

    def setUp(self):
        self.user = UserFactory()
        self.school = SchoolFactory(
        name='CU',location='Ogun',logo_url='',website='covenantuniversity.edu.ng',
        rank=1,rating=140.0,
        )
        # create 11 reports for pagination
        for x in range(11):
            ReportFactory(reporter=self.user, school=self.school)

    def test_if_school_reports_endpoint_is_working(self):
        url = reverse('school_reports', kwargs={'id':self.school.pk,'page':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_if_school_reports_endpoint_returns_report(self):
        url = reverse('school_reports', kwargs={'id':self.school.pk,'page':1})
        response = self.client.get(url)
        reports = Report.objects.filter(school=self.school).order_by('-updated_at')
        reports = paginate(reports, 1, 10)
        serialized = ReportSerializer(reports, many=True)
        self.assertEqual(response.data, serialized.data)
    
    def test_if_school_reports_endpoint_returns_correct_next_page(self):
        url = reverse('school_reports', kwargs={'id':self.school.pk,'page':2})
        response = self.client.get(url)
        reports = Report.objects.filter(school=self.school).order_by('-updated_at')
        reports = paginate(reports, 2, 10)
        serialized = ReportSerializer(reports, many=True)
        self.assertEqual(response.data, serialized.data)

    def test_if_school_reports_endpoint_returns_last_page_result_on_empty_page(self):
        # set page to a page higher than number of pages
        url = reverse('school_reports', kwargs={'id':self.school.pk,'page':10})
        response = self.client.get(url)
        reports = Report.objects.filter(school=self.school).order_by('-updated_at')
        # get result of the last page
        reports = paginate(reports, 2, 10)
        serialized = ReportSerializer(reports, many=True)
        # it should return the last page results
        self.assertEqual(response.data, serialized.data)

    def test_if_school_reports_endpoint_has_has_previous_and_has_next_keys(self):
        url = reverse('school_reports', kwargs={'id':self.school.pk,'page':1})
        response = self.client.get(url)
        # page one should have none of these 'X-Has-Next', 'X-Has-Previous'
        # since it has
        self.assertEqual(response['X-Has-Next'], 'True')
        self.assertEqual(response['X-Has-Previous'], 'False')

        url = reverse('school_reports', kwargs={'id':self.school.pk,'page':2})
        response = self.client.get(url)
        # the last page should have 'X-Has-Previous' not 'X-Has-Next'
        self.assertEqual(response['X-Has-Previous'], 'True')
        self.assertEqual(response['X-Has-Next'], 'False')


class SchoolViewTestCase(TestCase):

    def setUp(self):
        self.school = SchoolFactory(
          name='CU',location='Ogun',logo_url='',website='covenantuniversity.edu.ng',
          rank=1,rating=140.0,
        )

    def test_if_school_endpoint_is_working(self):
        url = reverse('school', kwargs={'id':self.school.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_if_school_endpoint_returns_school(self):
        url = reverse('school', kwargs={'id':self.school.pk})
        response = self.client.get(url)
        serialized = SchoolSerializer(self.school)
        self.assertEqual(response.data, serialized.data)

    def test_if_school_endpoint_returns_error_on_wrong_school_id(self):
        # put an id of a school that does not exist
        url = reverse('school', kwargs={'id':5})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)


class SchoolsListViewTestCase(TestCase):

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

    def test_if_school_list_endpoint_is_working(self):
        url = reverse('schools_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_if_school_list_endpoint_returns_all_schools(self):
        url = reverse('schools_list')
        response = self.client.get(url)
        schools = School.objects.all()
        serialized = SchoolsListSerializer(schools, many=True)
        self.assertEqual(len(response.data), schools.count())
        self.assertEqual(response.data, serialized.data)

    def test_if_school_list_contains_only_id_and_data(self):
        url = reverse('schools_list')
        response = self.client.get(url)
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

    def test_if_top_schools_endpoint_is_working(self):
        url = reverse('top_schools')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_if_top_schools_endpoint_returns_5_top_schools(self):
        url = reverse('top_schools')
        response = self.client.get(url)
        schools = School.objects.all().order_by('rank')[:5]
        serialized = SchoolSerializer(schools, many=True)

        self.assertEqual(len(response.data), schools.count())
        self.assertEqual(response.data, serialized.data)

    def test_if_top_schools_ranks_correctly(self):
        url = reverse('top_schools')
        response = self.client.get(url)
        current_top = response.data[0]
        for top_school in response.data:
            self.assertTrue(top_school['rank'] >= current_top['rank'])


class SRHIndexViewTestCase(TestCase):

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
        # make 20 more schools
        for x in range(20):
            SchoolFactory()

    def test_if_srh_index_endpoint_is_working(self):
        url = reverse('srh_index', kwargs={'page':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_if_srh_index_ranks_schools_correctly(self):
        url = reverse('srh_index', kwargs={'page':1})
        response = self.client.get(url)
        current = response.data[0]
        for school in response.data:
            self.assertTrue(school['rank'] >= current['rank'])

    def test_if_srh_index_returns_20_schools_on_page_one(self):
        url = reverse('srh_index', kwargs={'page':1})
        response = self.client.get(url)
        schools = School.objects.all().order_by('rank')
        schools = paginate(schools, 1, 20)
        serialized = SchoolSerializer(schools, many=True)
        self.assertEqual(response.data, serialized.data)

    def test_if_srh_index_returns_remaining_5_schools_on_page_two(self):
        url = reverse('srh_index', kwargs={'page':2})
        response = self.client.get(url)
        schools = School.objects.all().order_by('rank')
        schools = paginate(schools, 2, 20)
        serialized = SchoolSerializer(schools, many=True)
        self.assertEqual(response.data, serialized.data)

    def test_if_srh_index_endpoint_returns_last_page_result_on_empty_page(self):
        # set page to a page higher than number of pages
        url = reverse('srh_index', kwargs={'page':10})
        response = self.client.get(url)
        schools = School.objects.all().order_by('rank')
        # get result of the last page
        schools = paginate(schools, 2, 20)
        serialized = SchoolSerializer(schools, many=True)
        # it should return the last page results
        self.assertEqual(response.data, serialized.data)

    def test_if_srh_index_endpoint_has_has_previous_and_has_next_keys(self):
        url = reverse('srh_index', kwargs={'page':1})
        response = self.client.get(url)
        # page one should have 'X-Has-Next' but 'X-Has-Previous'
        self.assertEqual(response['X-Has-Next'], 'True')
        self.assertEqual(response['X-Has-Previous'], 'False')

        url = reverse('srh_index', kwargs={'page':2})
        response = self.client.get(url)
        # the last page should have 'X-Has-Previous' not 'X-Has-Next'
        self.assertEqual(response['X-Has-Previous'], 'True')
        self.assertEqual(response['X-Has-Next'], 'False')
