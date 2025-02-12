from rest_framework import serializers
from .models import Confirmation,Declination

class ConfirmationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Confirmation
        fields = ['invitation_type', 'first_name', 'last_name', 'phone_number', 'email', 'agreed_to_terms']
        
    def create(self, validated_data):
        # Ensure the email field is included in the validated data
        if 'email' not in validated_data:
            raise serializers.ValidationError("Email is required.")
        return Confirmation.objects.create(**validated_data)
    



class DeclinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Declination
        fields = ['invitation_type', 'first_name', 'last_name', 'phone_number']
        