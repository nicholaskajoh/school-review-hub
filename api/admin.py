from django.contrib import admin
from .models import *
from django.utils.html import format_html

# register the models so the admin can manipulate them
class SchoolAdmin(admin.ModelAdmin):
    list_display = ('name', 'rank', 'rating', 'location',
        'logo', 'site', 'created_at'
    )
    list_filter = ('rank', 'location')
    search_fields = ['name', 'description', 'website', 'logo_url', 'location']
    ordering = ('-created_at', )
    # date_hierarchy = 'created_at'
    readonly_fields = ('logo', 'site', 'created_at', 'updated_at')

    def logo(self, obj):
        logo_img = format_html('<img src="{}" height="50px" width="50px" />'.format(obj.logo_url) )
        return logo_img
    
    def site(self, obj):
        site = format_html('<a href="{}" target="_blank">{}</a>'.format(obj.website,obj.website))
        return site

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('content_', 'school', 'reviewer', 'created_at')
    # list_display_links = ('school', 'reviewer')
    list_filter = ('school',)
    search_fields = ('reviewer__username', 'reviewer__first_name',
        'reviewer__last_name', 'reviewer__email', 'school__name',
        'content'
    )
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at', )

    def content_(self, obj):
        if len(obj.content ) > 60:
            return obj.content[:60] + '...'
        return obj.content

class CommentAdmin(admin.ModelAdmin):
    list_display = ('comment_', 'commenter', 'entity', 'entity_id', 'created_at')
    list_filter = ('entity',)
    search_fields = ('commenter__username', 'commenter__first_name',
        'commenter__last_name', 'commenter__email', 'comment', 'entity'
    )
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at', )
    
    def comment_(self, obj):
        if len(obj.comment ) > 60:
            return obj.comment[:60] + '...'
        return obj.comment

class ComparisonAdmin(admin.ModelAdmin):
    list_display = ('choice', 'comparer', 'criterion', 'school1', 'school2')
    list_filter = ('criterion', 'choice')
    search_fields = ('comparer__username', 'comparer__first_name',
        'comparer__last_name', 'comparer__email', 'criterion__description',
        'school1__name', 'school2__name', 'choice__name'
    )
    ordering = ('choice', )

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
    list_display = ('content_', 'reporter', 'school', 'created_at')
    list_filter = ('school',)
    search_fields = ('reporter__username', 'reporter__first_name',
        'reporter__last_name', 'reporter__email', 'content', 'school__name'
    )
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at', )

    def content_(self, obj):
        if len(obj.content ) > 60:
            return obj.content[:60] + '...'
        return obj.content

class UpvoteAdmin(admin.ModelAdmin):
    list_display = ('upvoter', 'entity', 'entity_id')
    list_filter = ('entity',)
    search_fields = ('upvoter__username', 'upvoter__first_name',
        'upvoter__last_name', 'upvoter__email', 'entity'
    )
    readonly_fields = ('created_at',)
    ordering = ('-created_at', )

admin.site.register(School, SchoolAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Comparison, ComparisonAdmin)
admin.site.register(Criterion, CriterionAdmin)
admin.site.register(Report, ReportAdmin)
admin.site.register(Upvote, UpvoteAdmin)

# TODO:
# customize the list diplay links
# add admin inline where necessary
# ad admin actions where necessary