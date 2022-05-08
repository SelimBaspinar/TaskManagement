from rest_framework import serializers
from .models import Users, Roles

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = "__all__"  


class UsersSerializer(serializers.ModelSerializer):
    roles=serializers.CharField(read_only=True)
    class Meta:
        model = Users
        fields = "__all__"  

