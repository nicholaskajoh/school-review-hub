from django.test import TestCase
from .factories import *
from api.models import School, Review, Comment, Comparison, Criterion, Report, Upvote

class SchoolTestCase(TestCase):

  def setUp(self):
    # self.user = UserFactory(first_name='', last_name='')
    pass

  def test_school_string_representation(self):
    school = School(name="school name")
    self.assertEqual(str(school), school.name)
    # test the logo_url and website if they are urls

class ReviewTestCase(TestCase):
  def setUp(self):
    pass
  
  def test_review_string_representation(self):
    review = Review(content="review content")
    self.assertEqual(str(review), review.content)


class CommentTestCase(TestCase):
  def setUp(self):
    pass
  
  def test_comment_string_representation(self):
    comment = Comment(comment="comment")
    self.assertEqual(str(comment), comment.comment)


class ComparisonTestCase(TestCase):
  def setUp(self):
    pass

  def test_comparison_string_representation(self):
    school1 = School(name="school1 name")
    school2 = School(name="school2 name")
    criterion = Criterion(description="criterion description")
    choice = school1
    comparer = User(username="user1")
    comparison = Comparison(school1=school1,school2=school2, choice=choice,
      criterion=criterion,comparer=comparer
    )
    self.assertEqual(str(comparison),"{0} (vs) {1} [{2}], {3}".format(\
      school1,school2,criterion,comparer
      )
    )

class CriterionTestCase(TestCase):
  def setUp(self):
    pass

  def test_criterion_string_representation(self):
    criterion = Criterion(description="criterion description")
    self.assertEqual(str(criterion), criterion.description)

class ReportTestCase(TestCase):
  def setUp(self):
    pass

  def test_report_string_representation(self):
    report = Report(content="report content")
    self.assertEqual(str(report), report.content)


class UpvoteTestCase(TestCase):
  def setUp(self):
    pass
