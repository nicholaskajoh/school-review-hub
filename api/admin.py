from django.contrib import admin
from .models import *

# register the models so the admin can manipulate them
admin.site.register(School)
admin.site.register(Review)
admin.site.register(Comment)
admin.site.register(Comparison)
admin.site.register(Criterion)
admin.site.register(Report)
admin.site.register(Upvote)