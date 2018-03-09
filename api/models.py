from django.db import models
from django.contrib.auth.models import User
import paralleldots
from paralleldots import sentiment as pd_sentiment
from django.conf import settings

# Setup ParallelDots.
paralleldots.set_api_key(settings.PARALLEL_DOTS_API_KEY)

class School(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=200)
    logo_url = models.URLField(max_length=300, default='')
    website = models.URLField(blank=True, null=True)
    rank = models.IntegerField(blank=True, null=True)
    rating = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    school = models.ForeignKey('School', related_name='reviews', on_delete=models.CASCADE)
    content = models.TextField()
    reviewer = models.ForeignKey(User, related_name='reviews', on_delete=models.CASCADE)
    sentiment = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content

    # Override models save method
    def save(self, *args, **kwargs):
        # Get sentiment score.
        sentiment_text = pd_sentiment(self.content)['sentiment']
        if sentiment_text == "positive":
            sentiment_score = 1
        elif sentiment_text == "negative":
            sentiment_score = -1
        elif sentiment_text == "neutral":
            sentiment_score = 0
        self.sentiment = sentiment_score
        
        super(Review, self).save(*args, **kwargs)


class Comparison(models.Model):
    criterion = models.ForeignKey('Criterion', related_name='comparisons', on_delete=models.CASCADE)
    school1 = models.ForeignKey('School', related_name='sch1_comparisons', on_delete=models.CASCADE)
    school2 = models.ForeignKey('School', related_name='sch2_comparisons', on_delete=models.CASCADE)
    choice = models.ForeignKey('School', related_name='choice_comparisons', on_delete=models.CASCADE)
    comparer = models.ForeignKey(User, related_name='comparisons', null=True, on_delete=models.SET_NULL)

    def schools(self):
        pks = [self.school1.pk, self.school2.pk]
        return pks

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
        # choice must either be school1 or school2
        if self.choice != self.school1 and self.choice != self.school2:
            raise ValueError('Choice must be either school1 or school2!')
        super(Comparison, self).save(*args, **kwargs)


class Criterion(models.Model):
    description = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.description


class Report(models.Model):
    school = models.ForeignKey('School', related_name='reports', on_delete=models.CASCADE)
    content = models.TextField()
    reporter = models.ForeignKey(User, related_name='reports', null=True, on_delete=models.SET_NULL)
    sentiment = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content

    # Override models save method
    def save(self, *args, **kwargs):
        # Get sentiment score.
        sentiment_text = pd_sentiment(self.content)['sentiment']
        if sentiment_text == "positive":
            sentiment_score = 1
        elif sentiment_text == "negative":
            sentiment_score = -1
        elif sentiment_text == "neutral":
            sentiment_score = 0
        self.sentiment = sentiment_score
        
        super(Report, self).save(*args, **kwargs)


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
    commenter = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
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
    upvoter = models.ForeignKey(User, related_name='upvotes', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        entity = self.entity
        cls = Review
        if entity == Upvote.REPORT:
            cls = Report
        elif entity == Upvote.COMMENT:
            cls = Comment
        entity_obj = cls.objects.get(pk=self.entity_id)
        if cls == Comment:
            if len(entity_obj.comment ) > 10:
                return '{} upvotes {}: \'{}...\''.format(self.upvoter.username, entity, entity_obj.comment[:10])
            return '{} upvotes {}: \'{}\''.format(self.upvoter.username, entity, entity_obj.comment)
        
        if len(entity_obj.content ) > 10:
            return '{} upvotes {}: \'{}...\''.format(self.upvoter.username, entity, entity_obj.content[:10])
        return '{} upvotes {}: \'{}\''.format(self.upvoter.username, entity, entity_obj.content)