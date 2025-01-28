
from django.shortcuts import render
from django.http import JsonResponse
from .models import Confirmation,Invitation
from .forms import ConfirmationForm
from django.contrib import messages
from django.shortcuts import get_object_or_404

def invitation_detail(request, invitation_type):
    """
    View to render an invitation based on the type.
    """
    # Fetch the invitation for the given type
    invitation = get_object_or_404(Invitation, type=invitation_type)
    # Pass the form to the template
    form = ConfirmationForm()

    # Render the invitation page with the form
    return render(request, 'invitation_app/invitation.html', {'invitation': invitation, 'form': form})



# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Invitation
from .serializers import InvitationSerializer

class InvitationSubmissionView(APIView):
    def post(self, request):
        # Deserialize the incoming data
        serializer = InvitationSerializer(data=request.data)

        # Check if the data is valid
        if serializer.is_valid():
            # Save the data to the database
            serializer.save()
            return Response({'message': 'Invitation submitted successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
# import json
# from .models import Invitation

# @method_decorator(csrf_exempt, name='dispatch')
# def handle_invitation_submission(request):
#     if request.method == "POST":
#         print("doing")
#         try:
#             print("doing")
#             data = json.loads(request.body)
#             invitation_type = data.get('invitation_type')
#             first_name = data.get('first_name')
#             last_name = data.get('last_name')
#             phone_number = data.get('phone_number')
#             agreed_to_terms = data.get('agreed_to_terms', False)

#             # Create an Invitation instance
#             Invitation.objects.create(
#                 invitation_type=invitation_type,
#                 first_name=first_name,
#                 last_name=last_name,
#                 phone_number=phone_number,
#                 agreed_to_terms=agreed_to_terms,
#             )

#             print("done")

#             return JsonResponse({'message': 'Invitation submitted successfully.'}, status=201)
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
#     return JsonResponse({'error': 'Invalid request method.'}, status=405)

