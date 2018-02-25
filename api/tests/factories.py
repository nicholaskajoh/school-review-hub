import factory
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from random import randint

class UserFactory(factory.django.DjangoModelFactory):
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = factory.Faker('email')
    username = factory.Faker('user_name')
    password = make_password('password')

    class Meta:
        model = User

class SchoolFactory(factory.django.DjangoModelFactory):
    rating = float(randint(10, 200))
    rank = randint(1, 30)

    class Meta:
        model = 'api.School'

class ReviewFactory(factory.django.DjangoModelFactory):
    reviewer = factory.SubFactory(UserFactory)
    school = factory.SubFactory(SchoolFactory)

    class Meta:
        model = 'api.Review'

class CriterionFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = 'api.Criterion'

class ComparisonFactory(factory.django.DjangoModelFactory):
    criterion = factory.SubFactory(CriterionFactory)
    school1 = factory.SubFactory(SchoolFactory)
    school2 = factory.SubFactory(SchoolFactory)
    choice = factory.SubFactory(SchoolFactory)
    comparer = factory.SubFactory(UserFactory)

    class Meta:
        model = 'api.Comparison'

class CommentFactory(factory.django.DjangoModelFactory):
    ENTITY_CHOICES = (
        ('review', 'Review'),
        ('report', 'Report'),
    )
    # entity = models.CharField(max_length=15, choices=ENTITY_CHOICES)
    # entity_id = models.IntegerField()
    commenter = factory.SubFactory(UserFactory)

    class Meta:
        model = 'api.Comment'

class ReportFactory(factory.django.DjangoModelFactory):
    school = factory.SubFactory(SchoolFactory)
    reporter = factory.SubFactory(UserFactory)

    class Meta:
        model = 'api.Report'

class UpvoteFactory(factory.django.DjangoModelFactory):
    upvoter = factory.SubFactory(UserFactory)
    ENTITY_CHOICES = (
        ('review', 'Review'),
        ('report', 'Report'),
        ('comment', 'Comment'),
    )
    # entity_id
    # entity = models.CharField(max_length=15, choices=ENTITY_CHOICES)

    class Meta:
        model = 'api.Upvote'
