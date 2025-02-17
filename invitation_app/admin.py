from django.contrib import admin
from django.utils.safestring import mark_safe  # Import mark_safe for rendering HTML in admin
from .models import Invitation, Confirmation, Declination,Review

@admin.register(Invitation)
class InvitationAdmin(admin.ModelAdmin):
    # Fields to display in the admin list view
    list_display = ('type', 'text_preview', 'video_link', 'qr_code_preview')

    # Fields to search
    search_fields = ('type', 'text')

    # Read-only fields
    readonly_fields = ('qr_code',)

    # Customize the fieldset
    fieldsets = (
        (None, {
            'fields': ('type', 'text', 'video_link', 'qr_code')
        }),
    )

    def text_preview(self, obj):
        """Short preview of the text field for the admin list display."""
        return obj.text[:50] + "..." if len(obj.text) > 50 else obj.text
    text_preview.short_description = 'Text Preview'

    def qr_code_preview(self, obj):
        """Display a thumbnail of the QR code in the admin list view."""
        if obj.qr_code:
            return mark_safe(f'<img src="{obj.qr_code.url}" style="width: 50px; height: 50px;" />')
        return "No QR Code"
    qr_code_preview.short_description = 'QR Code'
    qr_code_preview.allow_tags = True


class ConfirmationAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'phone_number','email', 'invitation_type','agreed_to_terms',  'confirmed_at')
    search_fields = ('first_name', 'last_name', 'phone_number','email')
    list_filter = ('agreed_to_terms', 'invitation_type')  # Filter confirmations based on 'confirmed' status and invitation type

# Registering the models in the admin interface
admin.site.register(Confirmation, ConfirmationAdmin)


class DeclinationAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'phone_number', 'invitation_type',  'declined_at')
    search_fields = ('first_name', 'last_name', 'phone_number')

# Registering the models in the admin interface
admin.site.register(Declination, DeclinationAdmin)


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'rating','msg','created_at')
    search_fields = ('first_name', 'last_name')

# Registering the models in the admin interface
admin.site.register(Review, ReviewAdmin)

