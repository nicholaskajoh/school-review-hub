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
    comments_count = serializers.SerializerMethodField()
    upvotes = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ('id', 'school', 'content', 'comments_count', 'upvotes', 'created_at', 'updated_at')
        read_only_fields = ('id', 'school', 'created_at')

    def get_comments_count(self, obj):
        return Comment.objects.filter(entity='review', entity_id=obj.id).count()

    def get_upvotes(self, obj):
        return Upvote.objects.filter(entity='review', entity_id=obj.id).count()


class CommentSerializer(serializers.ModelSerializer):
    upvotes = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'comment', 'upvotes', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at')

    def get_upvotes(self, obj):
        return Upvote.objects.filter(entity='report', entity_id=obj.id).count()


class CriterionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Criterion
        fields = ('id', 'description')
        read_only_fields = ('id', 'description')


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
    comments_count = serializers.SerializerMethodField()
    upvotes = serializers.SerializerMethodField()

    class Meta:
        model = Report
        fields = ('id', 'school', 'content', 'comments_count', 'upvotes', 'created_at', 'updated_at')
        read_only_fields = ('id', 'school', 'created_at')

    def get_comments_count(self, obj):
        return Comment.objects.filter(entity='report', entity_id=obj.id).count()

    def get_upvotes(self, obj):
        return Upvote.objects.filter(entity='report', entity_id=obj.id).count()


class UpvoteSerializer(serializers.ModelSerializer):
    upvoter = UserSerializer()

    class Meta:
        model = Upvote
        fields = ('id', 'entity', 'entity_id', 'upvoter', 'created_at')
        read_only_fields = ('id', 'entity', 'entity_id', 'upvoter', 'created_at')