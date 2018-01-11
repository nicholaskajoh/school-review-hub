from .models import School, Comparison
from django.db.models import Q
from django.db.models import Count, FloatField, Avg
from django.db.models.functions import Cast

class SRHIndex:
  def __init__(self):
    schools = (School.objects
      .all()
      .annotate(reviews_count=Count('school_reviewed'))
      .annotate(reports_count=Count('school_reported')))
    # add ratings
    for school in schools:
      school.rating = (Comparison.objects
        .filter(Q(school1__id=school.id) | Q(school2=school.id)) # select comparisons involving a given school
        .values('comparer') # group them by comparer (user)
        .annotate(wins_fraction=Cast(Count('comparer', filter=Q(choice__id=school.id)), FloatField()) / Cast(Count('comparer'), FloatField())) # calculate the number of times a comparer chose the school as better, divided by the total number of comparisons they made
        .aggregate(score=Avg('wins_fraction') * 1000)['score']) # calculate the average win of a school multiplied by 1000
    # sort
    schools = sorted(schools, key=lambda s: s.rating, reverse=True)
    # add ranks
    r = 1
    for school in schools:
      school.rank = r
      r += 1

    self.srh_index = schools

  def get(self):
    return self.srh_index