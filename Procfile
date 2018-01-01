release: npm run build && python manage.py collectstatic --noinput
web: gunicorn bootcamp.wsgi --log-file -