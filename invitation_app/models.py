from django.db import models
from io import BytesIO
import qrcode
from django.core.files.base import ContentFile

class Invitation(models.Model):
    TYPE_CHOICES = [
        ('partenaires', 'partenaires'),
        ('prospects', 'prospects'),
        ('amis', 'amis'),
    ]

    type = models.CharField(
        max_length=20, 
        choices=TYPE_CHOICES, 
        unique=True  # Ensures only one invitation per type
    )
    text = models.TextField()  # Description or message for the invitation
    video_link = models.URLField()  # Vimeo video link
    qr_code = models.ImageField(upload_to='qr_codes/', blank=True, null=True)  # QR Code image

    def __str__(self):
        return f"Invitation for {self.type}"

    @property
    def unique_url(self):
        """Generate a unique URL based on the type with full domain."""
        base_url = "https://baynanawabaynakoum.beyn.io" 
        return f"{base_url}/invitation/{self.type.lower()}"

    def save(self, *args, **kwargs):
        """Generate a QR code for the invitation's unique URL."""
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(self.unique_url)  # Use full URL now
        qr.make(fit=True)

        # Create QR code image
        img = qr.make_image(fill_color="black", back_color="white")
        buffer = BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)

        # Save QR code to the field
        self.qr_code.save(f"invitation_{self.type.lower()}.png", ContentFile(buffer.read()), save=False)
        buffer.close()

        # Save the instance
        super().save(*args, **kwargs)



class Confirmation(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    confirmed_at = models.DateTimeField(auto_now_add=True)
    agreed_to_terms = models.BooleanField(default=False)  # Checkbox for agreement
    invitation_type = models.CharField(max_length=50)  # Add this field
    confirmed = models.BooleanField(default=False)  # Add this field
    created_at = models.DateTimeField(auto_now_add=True)  # Add this field

    def __str__(self):
        return f"{self.first_name} {self.last_name}"