from django import forms
from .models import Confirmation

class ConfirmationForm(forms.ModelForm):
    class Meta:
        model = Confirmation
        fields = ['first_name', 'last_name', 'phone_number', 'agreed_to_terms', 'invitation_type']
