from django.urls import path
from .views import InvitationSubmissionView, invitation_detail,confirmation_table

urlpatterns = [
    path('submit-invitation/', InvitationSubmissionView.as_view(), name='submit_invitation'),
    path("confirmations/", confirmation_table, name="confirmation_table"),
    path('<str:invitation_type>/', invitation_detail, name='invitation_detail'),
]