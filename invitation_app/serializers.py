from rest_framework import serializers
from .models import Confirmation

class ConfirmationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Confirmation
        fields = ['invitation_type', 'first_name', 'last_name', 'phone_number', 'agreed_to_terms']