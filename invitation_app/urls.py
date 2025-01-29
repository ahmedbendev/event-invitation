from django.urls import path
from .views import InvitationSubmissionView, invitation_detail

urlpatterns = [
    path('submit-invitation/', InvitationSubmissionView.as_view(), name='submit_invitation'),
    path('<str:invitation_type>/', invitation_detail, name='invitation_detail'),
]