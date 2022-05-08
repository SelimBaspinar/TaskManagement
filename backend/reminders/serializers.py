from asyncio import tasks
from rest_framework import serializers
from .models import Reminders




class RemindersSerializer(serializers.ModelSerializer):
    task=serializers.CharField(read_only=True)

    class Meta:
        model = Reminders
        fields = "__all__"  

