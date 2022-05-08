from django.shortcuts import render
from rest_framework import viewsets
from .serializers import  TranslateSerializer
from .models import  Translate
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

# Create your views here.



class  TranslateView(viewsets.ModelViewSet):
    serializer_class =  TranslateSerializer
    queryset =  Translate.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['Component', 'Lang']



 