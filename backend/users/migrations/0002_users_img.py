# Generated by Django 4.0.4 on 2022-05-01 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='img',
            field=models.ImageField(default='', upload_to='user_images'),
            preserve_default=False,
        ),
    ]
