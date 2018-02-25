from django.test import TestCase
from .factories import *
from api.models import School, Review, Comment, Comparison, Criterion, Report, Upvote

class SchoolTestCase(TestCase):
    
    def setUp(self):
        pass

    def test_school_string_representation(self):
        school = SchoolFactory(name="school name")
        self.assertEqual(str(school), school.name)


class ReviewTestCase(TestCase):
    
    def setUp(self):
        pass
  
    def test_review_string_representation(self):
        review = ReviewFactory(content="review content")
        self.assertEqual(str(review), review.content)


class CommentTestCase(TestCase):
    
    def setUp(self):
        pass
  
    def test_comment_string_representation(self):
        comment = Comment(comment="comment")
        self.assertEqual(str(comment), comment.comment)


class ComparisonTestCase(TestCase):      
    
    def setUp(self):
        self.school1 = SchoolFactory(name="school1 name")
        self.school2 = SchoolFactory(name="school2 name")
        self.criterion = CriterionFactory(description="criterion description")
        self.choice = self.school1
        self.comparer = UserFactory()
        self.comparison = ComparisonFactory(school1=self.school1,school2=self.school2,
            choice=self.choice, criterion=self.criterion, comparer=self.comparer
        )
    
    def test_comparison_string_representation(self):
        self.assertEqual(str(self.comparison),"{0} (vs) {1} [{2}], {3}"\
            .format( self.school1, self.school2, self.criterion,self.comparer)
        )
    
    def test_comparison_rejects_comparing_the_same_school(self):
        # update the second school field to be the same school
        self.comparison.school2 = self.school1
        # test if the save() method raises an execption
        with self.assertRaises(ValueError):
            self.comparison.save()


class CriterionTestCase(TestCase):
    
    def setUp(self):
        pass

    def test_criterion_string_representation(self):
        criterion = CriterionFactory(description="criterion description")
        self.assertEqual(str(criterion), criterion.description)


class ReportTestCase(TestCase):
    
    def setUp(self):
        pass

    def test_report_string_representation(self):
        report = ReportFactory(content="report content")
        self.assertEqual(str(report), report.content)


class UpvoteTestCase(TestCase):
    
    def setUp(self):
        pass
