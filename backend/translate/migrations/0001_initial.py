# Generated by Django 4.0.3 on 2022-04-19 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Translate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('txt', models.JSONField()),
                ('Component', models.JSONField()),
                ('Lang', models.JSONField()),
            ],
        ),
    ]
