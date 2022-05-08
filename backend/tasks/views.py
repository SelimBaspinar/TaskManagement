import imp
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import  TasksSerializer
from .models import Tasks
from channels.layers import get_channel_layer
from random import randint
from django.http import HttpResponse
from asgiref.sync import async_to_sync
import logging
from channels.generic.websocket import WebsocketConsumer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class TasksView(viewsets.ModelViewSet):
    serializer_class = TasksSerializer
    queryset = Tasks.objects.all()    

@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Tasks.objects.get(pk=pk)
    except Tasks.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TasksSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TasksSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
