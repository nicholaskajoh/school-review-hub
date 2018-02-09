release: python manage.py migrate && python manage.py test
web: gunicorn SchoolReviewHub.wsgi --log-file -
