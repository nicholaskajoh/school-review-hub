release: npm run build && python manage.py collectstatic --noinput
web: gunicorn SchoolReviewHub.wsgi --log-file -