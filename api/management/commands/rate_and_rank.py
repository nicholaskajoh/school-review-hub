from django.core.management.base import BaseCommand, CommandError
from api.models import School, Comparison
from django.db.models import Q
from django.db.models import Count, FloatField, Avg
from django.db.models.functions import Cast

class Command(BaseCommand):
    help = "Rates and ranks all schools on SRH."

    def handle(self, *args, **options):
        schools = School.objects.all()

        # Add ratings.
        for school in schools:
            # Select comparisons involving a given school.
            rating = Comparison.objects.filter(Q(school1__id=school.id) | Q(school2=school.id))
            # Group them by comparer (user).
            rating = rating.values('comparer')
            # Calculate the number of times a comparer chose the school as better, divided by the total number of comparisons they made.
            rating = rating.annotate(wins_fraction=Cast(Count('comparer', filter=Q(choice__id=school.id)), FloatField()) / Cast(Count('comparer'), FloatField()))
            # Calculate the average win (win_fraction) of a school multiplied by 1000; 1000 is arbitrary.
            rating = rating.aggregate(score=Avg('wins_fraction') * 1000)['score']
            school.rating = rating

        # Sort the schools in descending order of rating rating.
        schools = sorted(schools, key=lambda s: s.rating, reverse=True)

        # Add ranks and save to DB.
        rank = 1
        for school in schools:
            school.rank = rank
            school.save()
            (self.stdout.write(self.style.SUCCESS("{0}, rating: {1}, rank: {2}"
                .format(school.name, school.rating, school.rank))))
            rank += 1

        self.stdout.write(self.style.SUCCESS("Rating and ranking completed!"))