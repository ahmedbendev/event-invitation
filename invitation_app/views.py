
from django.shortcuts import render
from .models import Confirmation,Invitation
from .forms import ConfirmationForm
from django.contrib import messages
from django.shortcuts import get_object_or_404
# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ConfirmationSerializer



def invitation_detail(request, invitation_type):
    """
    View to render an invitation based on the type.
    """
    # Fetch the invitation for the given type
    invitation = get_object_or_404(Invitation, type=invitation_type)

    # Render the invitation page with the form
    return render(request, 'invitation_app/invitation.html', {'invitation': invitation})


class InvitationSubmissionView(APIView):
    def post(self, request):
        # Deserialize the incoming data
        print("Received Data:", request.data)
        serializer = ConfirmationSerializer(data=request.data)

        # Check if the data is valid
        if serializer.is_valid():
            # Save the data to the database
            serializer.save()
            return Response({'message': 'Invitation submitted successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

