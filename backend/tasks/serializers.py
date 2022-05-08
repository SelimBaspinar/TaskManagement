from rest_framework import serializers
from .models import Tasks




class TasksSerializer(serializers.ModelSerializer):
    user=serializers.CharField(read_only=True)

    class Meta:
        model = Tasks
        fields = "__all__"  

