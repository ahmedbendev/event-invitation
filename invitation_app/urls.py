from django.urls import path
from .views import InvitationDeclinationView, InvitationSubmissionView,EventAddReviewView, invitation_detail,confirmation_table,declination_table,add_review

urlpatterns = [
    path('decline-invitation/', InvitationDeclinationView.as_view(), name='decline_invitation'),
    path('submit-invitation/', InvitationSubmissionView.as_view(), name='submit_invitation'),
    path("event-add-review/", EventAddReviewView.as_view(), name="event_add_review"),
    path("confirmations/", confirmation_table, name="confirmation_table"),
    path("declinations/", declination_table, name="declination_table"),
    path("add-review/", add_review, name="add_review"),
    path('<str:invitation_type>/', invitation_detail, name='invitation_detail'),
]