from django.urls import path
from . import views
from .views import InvitationSubmissionView, invitation_detail


urlpatterns = [
    path('<str:invitation_type>/', invitation_detail, name='invitation_detail'),
    # path('submit-invitation/', views.handle_invitation_submission, name='submit_invitation'),
    path('submit-invitation/', InvitationSubmissionView.as_view(), name='submit_invitation'),
]