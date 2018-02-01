# import os.path
from django import forms
from django.forms import ModelForm
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
# from .models import *

class RegisterForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
        # there's a 'fields' property now
        self.fields['username'].validators.append(
            RegexValidator(
                regex='^[a-zA-Z][a-zA-Z0-9_]+$',
                message='Only alphabets, numbers, and _ are allowed for usernames. Your username must start with an alphabet.',
                code='invalid_username',
            )
        )
        self.fields['email'].required = True
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        error_messages = {
            'username': {
                'required': 'A username is required.',
            },
            'email': {
                'required': 'An email address is required.',
            },
            'password': {
                'required': 'A password is required.',
            },
        }

    def clean(self):
        cleaned_data = super(RegisterForm, self).clean()
        username = cleaned_data.get("username")
        email = cleaned_data.get("email")
        # email must be unique
        if User.objects.filter(email=email).exists() and email != "":
            raise ValidationError("A user with that email address already exists.")
        return cleaned_data
