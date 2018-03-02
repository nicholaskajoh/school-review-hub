from django.forms import ModelForm
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from .models import Review, Report, Comment

class RegisterForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
        # there's a 'fields' property now
        self.fields['username'].validators.append(
            RegexValidator(
                regex='^[a-zA-Z][a-zA-Z0-9_-]+$',
                message='Only alphabets, numbers, - and _ are allowed for usernames and your username must start with an alphabet.',
                code='invalid_username',
            )
        )
        self.fields['email'].required = True
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        error_messages = {
            'username': {
                'required': 'Username is required'
            },
            'email': {
                'required': 'Email address is required'
            },
            'password': {
                'required': 'Password is required'
            }
        }

    def clean(self):
        cleaned_data = super(RegisterForm, self).clean()
        username = cleaned_data.get('username')
        email = cleaned_data.get('email')
        # email must be unique
        if User.objects.filter(email=email).exists():
            self.add_error('email', 'That email address is already in use')
        return cleaned_data

class ReviewForm(ModelForm):
    class Meta:
        model = Review
        fields = ['content', 'school', 'reviewer']
        error_messages = {
            'content': {
                'required': 'Content of the review is required'
            },
            'school': {
                'required': 'School is required'
            }
        }

class ReportForm(ModelForm):
    class Meta:
        model = Report
        fields = ['content', 'school', 'reporter']
        error_messages = {
            'content': {
                'required': 'Content of the report is required'
            },
            'school': {
                'required': 'School is required'
            }
        }

class CommentForm(ModelForm):
    class Meta:
        model = Comment
        fields = ['comment', 'entity', 'entity_id', 'commenter']
        error_messages = {
            'comment': {
                'required': 'Content of the comment is required'
            },
            'entity': {
                'required': 'Entity is required'
            }
        }