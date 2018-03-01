from django.db import models
from django.contrib.auth.models import User

class School(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=200)
    logo_url = models.URLField(max_length=300, default='')
    website = models.URLField()
    rank = models.IntegerField()
    rating = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    school = models.ForeignKey('School', related_name='schools_reviewed', on_delete=models.CASCADE)
    content = models.TextField()
    reviewer = models.ForeignKey(User, related_name='reviewer', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content


class Comparison(models.Model):
    criterion = models.ForeignKey('Criterion', related_name='criteria', on_delete=models.CASCADE)
    school1 = models.ForeignKey('School', related_name='school1', on_delete=models.CASCADE)
    school2 = models.ForeignKey('School', related_name='school2', on_delete=models.CASCADE)
    choice = models.ForeignKey('School', related_name='choice', on_delete=models.CASCADE)
    comparer = models.ForeignKey(User, related_name='comparer', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return ('{0} (vs) {1} [{2}], {3}'
        .format(
            self.school1,
            self.school2,
            self.criterion,
            self.comparer))

    # Override models save method
    def save(self, *args, **kwargs):
        # school1 and school2 must not be the same
        if self.school1 == self.school2:
            raise ValueError('Cannot compare the same school!')
        super(Comparison, self).save(*args, **kwargs)


class Criterion(models.Model):
    description = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.description


class Report(models.Model):
    school = models.ForeignKey('School', related_name='schools_reported', on_delete=models.CASCADE)
    content = models.TextField()
    reporter = models.ForeignKey(User, related_name='reporter', null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content


class Comment(models.Model):
    REVIEW = 'review'
    REPORT = 'report'
    ENTITY_CHOICES = (
        (REVIEW, 'Review'),
        (REPORT, 'Report'),
    )
    entity = models.CharField(max_length=15, choices=ENTITY_CHOICES)
    entity_id = models.IntegerField()
    comment = models.TextField()
    commenter = models.ForeignKey(User, related_name='commenter', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.comment


class Upvote(models.Model):
    REVIEW = 'review'
    REPORT = 'report'
    COMMENT = 'comment'
    ENTITY_CHOICES = (
        (REVIEW, 'Review'),
        (REPORT, 'Report'),
        (COMMENT, 'Comment'),
    )
    entity = models.CharField(max_length=15, choices=ENTITY_CHOICES)
    entity_id = models.IntegerField()
    upvoter = models.ForeignKey(User, related_name='upvoter', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)