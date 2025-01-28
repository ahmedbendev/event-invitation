from rest_framework import serializers
from .models import Invitation

class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = ['invitation_type', 'first_name', 'last_name', 'phone_number', 'agreed_to_terms']