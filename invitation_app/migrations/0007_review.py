# Generated by Django 4.2.18 on 2025-02-17 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invitation_app', '0006_declination_alter_invitation_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('rating', models.IntegerField(default=5)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
