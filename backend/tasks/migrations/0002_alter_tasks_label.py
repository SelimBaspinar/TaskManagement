# Generated by Django 4.0.4 on 2022-05-01 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tasks',
            name='Label',
            field=models.CharField(max_length=12000),
        ),
    ]
