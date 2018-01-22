from .models import *
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'date_joined')
        read_only_fields = ('id', 'username', 'date_joined')


class SchoolSerializer(serializers.ModelSerializer):
    reviews_count = serializers.IntegerField(source='schools_reviewed.count', read_only=True)
    reports_count = serializers.IntegerField(source='schools_reported.count', read_only=True)

    class Meta:
        model = School
        fields = ('id', 'name', 'description', 'location', 'logo_url', 'website', 'rating', 'rank', 'reviews_count', 'reports_count')


class SchoolsListSerializer(serializers.ModelSerializer):

    class Meta:
        model = School
        fields = ('id', 'name')
        read_only_fields = ('id', 'name')


class ReviewSerializer(serializers.ModelSerializer):
    school = SchoolSerializer()

    class Meta:
        model = Review
        fields = ('id', 'school', 'content', 'created_at', 'updated_at')
        read_only_fields = ('id', 'school', 'created_at')


class CommentSerializer(serializers.ModelSerializer):
    commenter = UserSerializer()
    review = ReviewSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'comment', 'commenter', 'review', 'created_at', 'updated_at')
        read_only_fields = ('id', 'commenter', 'review', 'created_at')


class CriterionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Criterion
        fields = ('id', 'description', 'created_at', 'updated_at')
        read_only_fields = ('id', 'description', 'created_at')


class ComparisonSerializer(serializers.ModelSerializer):
    criterion = CriterionSerializer()
    comparer = UserSerializer()
    school1 = SchoolSerializer()
    school2 = SchoolSerializer()
    choice = SchoolSerializer()

    class Meta:
        model = Comparison
        fields = ('id', 'criterion', 'school1', 'school2', 'choice', 'comparer')
        read_only_fields = ('id', 'criterion', 'school1', 'school2', 'choice', 'comparer')


class ReportSerializer(serializers.ModelSerializer):
    school = SchoolSerializer()

    class Meta:
        model = Report
        fields = ('id', 'school', 'content', 'created_at', 'updated_at')
        read_only_fields = ('id', 'school', 'created_at')


class UpvoteSerializer(serializers.ModelSerializer):
    upvoter = UserSerializer()

    class Meta:
        model = Upvote
        fields = ('id', 'entity', 'entity_id', 'upvoter', 'created_at')
        read_only_fields = ('id', 'entity', 'entity_id', 'upvoter', 'created_at')