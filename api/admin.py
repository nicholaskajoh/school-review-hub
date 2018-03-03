from django.contrib import admin
from .models import *
from django.utils.html import format_html
from django.shortcuts import reverse


class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'rank', 'rating', 'location',
        'logo', 'site', 'created_at'
    )
    list_filter = ('rank', 'location')
    search_fields = ['name', 'description', 'website', 'logo_url', 'location']
    ordering = ('-created_at', )
    readonly_fields = ('logo', 'site', 'created_at', 'updated_at')

    def logo(self, obj):
        logo_img = format_html('<img src="{}" height="50px" width="50px" />', obj.logo_url)
        return logo_img
    
    def site(self, obj):
        site = format_html('<a href="{}" target="_blank">{}</a>', obj.website,obj.website)
        return site


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('content_', 'reviewer_', 'comments', 'upvotes', 'school_', 'created_at')
    # list_display_links = ('school', 'reviewer')
    list_filter = ('school',)
    search_fields = ('reviewer__username', 'reviewer__first_name',
        'reviewer__last_name', 'reviewer__email', 'school__name',
        'content'
    )
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)

    def content_(self, obj):
        if len(obj.content) > 50:
            return obj.content[:50] + '...'
        return obj.content

    def upvotes(self, obj):
        url = url = reverse('admin:api_upvote_changelist')
        count = Upvote.objects.filter(entity_id=obj.pk, entity='review').count()
        return format_html('<a href="{}" target="_blank">{}</a>', url, count)

    def comments(self, obj):
        url = url = reverse('admin:api_comment_changelist')
        count = Comment.objects.filter(entity_id=obj.pk, entity='review').count()
        return format_html('<a href="{}" target="_blank">{}</a>', url, count)

    def reviewer_(self, obj):
        url = reverse('admin:auth_user_change', args=(obj.reviewer.pk,))
        return format_html('<a href="{}" target="_blank">{}</a>', url, obj.reviewer.username)

    def school_(self, obj):
        url = reverse('admin:api_school_change', args=(obj.school.pk,))
        return format_html('<a href="{}" target="_blank">{}</a>', url, obj.school.name)


class CommentAdmin(admin.ModelAdmin):
    list_display = ('comment_', 'commenter_', 'upvotes', 'entity_', 'entity_id_', 'created_at')
    list_filter = ('entity',)
    search_fields = ('commenter__username', 'commenter__first_name',
        'commenter__last_name', 'commenter__email', 'comment', 'entity'
    )
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    
    def comment_(self, obj):
        if len(obj.comment) > 50:
            return obj.comment[:50] + '...'
        return obj.comment
    
    def upvotes(self, obj):
        url = url = reverse('admin:api_upvote_changelist')
        count = Upvote.objects.filter(entity_id=obj.pk, entity='comment').count()
        return format_html('<a href="{}" target="_blank">{}</a>', url, count)

    def commenter_(self, obj):
        url = reverse('admin:auth_user_change', args=(obj.commenter.pk,))
        return format_html('<a href="{}" target="_blank">{}</a>', url, obj.commenter.username)

    def entity_(self, obj):
        entity = obj.entity
        url = reverse('admin:api_{}_changelist'.format(entity))
        return format_html('<a href="{}" target="_blank">{}</a>', url, entity)

    def entity_id_(self, obj):
        entity = obj.entity
        url = reverse('admin:api_{}_change'.format(entity), args=(obj.entity_id,))
        return format_html('<a href="{}" target="_blank">{}</a>', url, obj.entity_id)


class ComparisonAdmin(admin.ModelAdmin):
    list_display = ('choice', 'comparer_', 'criterion_', 'school1_', 'school2_')
    list_filter = ('criterion', 'choice')
    search_fields = ('comparer__username', 'comparer__first_name',
        'comparer__last_name', 'comparer__email', 'criterion__description',
        'school1__name', 'school2__name', 'choice__name'
    )
    ordering = ('choice', )

    def school1_(self, obj):
        url = reverse('admin:api_school_change', args=(obj.school1.pk,))
        return format_html('<a href="{}" target="_blank">{}</a>', url, obj.school1.name)

    def school2_(self, obj):
        url = reverse('admin:api_school_change', args=(obj.school2.pk,))
        return format_html('<a href="{}" target="_blank">{}</a>', url, obj.school2.name)

    def comparer_(self, obj):
        url = reverse('admin:auth_user_change', args=(obj.comparer.pk,))
        return format_html('<a href="{}" target="_blank">{}</a>', url, obj.comparer.username)
    
    def criterion_(self, obj):
        criterion = obj.criterion
        url = reverse('admin:api_criterion_change', args=(criterion.id,))
        if len(criterion.description ) > 50:
            return format_html(
                '<a href="{}" target="_blank">{}</a>', url,
                criterion.description[:50] + '...'
            )
        return format_html('<a href="{}" target="_blank">{}</a>', url, criterion.description)
        if len(obj.criterion.description) > 50:
            return obj.criterion.description[:50] + '...'
        return obj.criterion.description



class CriterionAdmin(admin.ModelAdmin):
    list_display = ('description_', 'created_at')
    search_fields = ('description', )
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at', )

    def description_(self, obj):
        if len(obj.description ) > 150:
            return obj.description[:150] + '...'
        return obj.description


class ReportAdmin(admin.ModelAdmin):
    list_display = ('content_', 'reporter_', 'comments', 'upvotes', 'school_', 'created_at')
    list_filter = ('school',)
    search_fields = ('reporter__username', 'reporter__first_name',
        'reporter__last_name', 'reporter__email', 'content', 'school__name'
    )
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at', )

    def content_(self, obj):
        if len(obj.content ) > 50:
            return obj.content[:50] + '...'
        return obj.content
    
    def upvotes(self, obj):
        url = url = reverse('admin:api_upvote_changelist')
        count = Upvote.objects.filter(entity_id=obj.pk, entity='report').count()
        return format_html('<a href="{}" target="_blank">{}</a>', url, count)

    def comments(self, obj):
        url = url = reverse('admin:api_comment_changelist')
        count = Comment.objects.filter(entity_id=obj.pk, entity='report').count()
        return format_html('<a href="{}" target="_blank">{}</a>', url, count)

    def reporter_(self, obj):
        url = reverse('admin:auth_user_change', args=(obj.reporter.pk,))
        return format_html('<a href="{}" target="_blank">{}</a>', url, obj.reporter.username)

    def school_(self, obj):
        url = reverse('admin:api_school_change', args=(obj.school.pk,))
        return format_html('<a href="{}" target="_blank">{}</a>', url, obj.school.name)


class UpvoteAdmin(admin.ModelAdmin):
    list_display = ('upvoter', 'content_of_entity', 'entity_', 'entity_id_', 'created_at')
    list_filter = ('entity',)
    search_fields = ('upvoter__username', 'upvoter__first_name',
        'upvoter__last_name', 'upvoter__email', 'entity'
    )
    readonly_fields = ('created_at',)
    ordering = ('-created_at', )

    def content_of_entity(self, obj):
        entity = obj.entity
        url = reverse('admin:api_{}_change'.format(entity), args=(obj.entity_id,))
        entity = obj.entity
        if entity == 'review':
            review = Review.objects.get(pk=obj.entity_id)
            if len(review.content ) > 50:
                return format_html(
                    '<a href="{}" target="_blank">{}</a>', url,
                    review.content[:50] + '...'
                )
            return format_html('<a href="{}" target="_blank">{}</a>', url, review.content)
        if entity == 'report':
            report = Report.objects.get(pk=obj.entity_id)
            if len(report.content ) > 50:
                return format_html(
                    '<a href="{}" target="_blank">{}</a>', url,
                    report.content[:50] + '...'
                )
            return format_html('<a href="{}" target="_blank">{}</a>', url, report.content)
        if entity == 'comment':
            comment = Comment.objects.get(pk=obj.entity_id)
            if len(comment.content ) > 50:
                return format_html(
                    '<a href="{}" target="_blank">{}</a>', url,
                    comment.content[:50] + '...'
                )
            return format_html('<a href="{}" target="_blank">{}</a>', url, comment.content)
        return ''

    def entity_(self, obj):
        entity = obj.entity
        url = reverse('admin:api_{}_changelist'.format(entity))
        return format_html('<a href="{}" target="_blank">{}</a>', url, entity)

    def entity_id_(self, obj):
        entity = obj.entity
        url = reverse('admin:api_{}_change'.format(entity), args=(obj.entity_id,))
        return format_html('<a href="{}" target="_blank">{}</a>', url, obj.entity_id)


admin.site.register(School, SchoolAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Comparison, ComparisonAdmin)
admin.site.register(Criterion, CriterionAdmin)
admin.site.register(Report, ReportAdmin)
admin.site.register(Upvote, UpvoteAdmin)