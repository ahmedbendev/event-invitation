# Generated by Django 4.2.18 on 2025-01-26 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invitation_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Confirmation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=15)),
                ('confirmed_at', models.DateTimeField(auto_now_add=True)),
                ('agreed_to_terms', models.BooleanField(default=False)),
            ],
        ),
        migrations.AlterField(
            model_name='invitation',
            name='type',
            field=models.CharField(choices=[('partner', 'partner'), ('friend', 'friend'), ('prospect', 'prospect')], max_length=10, unique=True),
        ),
    ]
