from django.shortcuts import render
from rest_framework import viewsets
from .serializers import  UsersSerializer,RolesSerializer
from .models import Users,Roles

# Create your views here.

class RolesView(viewsets.ModelViewSet):
    serializer_class = RolesSerializer
    queryset = Roles.objects.all()   

class UsersView(viewsets.ModelViewSet):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()    

