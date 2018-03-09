from django.core.management.base import BaseCommand, CommandError
from api.models import School, Comparison
from django.db.models import Q
from django.db.models import Count, FloatField, Avg, Sum
from django.db.models.functions import Cast

class Command(BaseCommand):
    help = "Rates and ranks all schools on SRH."

    def handle(self, *args, **options):
        schools = School.objects.all().order_by('name')

        # Add ratings.
        for school in schools:
            # Select comparisons involving a given school.
            rating = Comparison.objects.filter(Q(school1__id=school.id) | Q(school2=school.id))
            # Group them by comparer (user).
            rating = rating.values('comparer')
            # Calculate the number of times a comparer chose the school as better than another.
            rating = rating.annotate(wins=Cast(Count('comparer', filter=Q(choice__id=school.id)), FloatField()))
            # Calculate the average wins of the school, multiplied by 10; 10 is arbitrary.
            rating = rating.aggregate(score=Avg('wins') * 10)['score']
            # Set rating to zero if null.
            rating = rating if rating != None else 0
            # Add sentiment analysis aggregate score for reviews and reports of the school.
            sa_aggr_rev = school.reviews.all().aggregate(sentiment=Sum('sentiment'))['sentiment']
            rating += sa_aggr_rev if sa_aggr_rev != None else 0
            sa_aggr_rep = school.reports.all().aggregate(sentiment=Sum('sentiment'))['sentiment']
            rating += sa_aggr_rep if sa_aggr_rep != None else 0

            school.rating = rating

        # Sort the schools in descending order of rating rating.
        schools = sorted(schools, key=lambda s: s.rating, reverse=True)

        # Add ranks and save to DB.
        rank = 1
        previously_rated_school = None
        for school in schools:
            if previously_rated_school != None and previously_rated_school.rating == school.rating:
                school.rank = previously_rated_school.rank
            else:
                school.rank = rank
            school.save()
            previously_rated_school = school
            (self.stdout.write(self.style.SUCCESS("{0}, rating: {1}, rank: {2}"
                .format(school.name, school.rating, school.rank))))
            rank += 1

        self.stdout.write(self.style.SUCCESS("Rating and ranking completed!"))