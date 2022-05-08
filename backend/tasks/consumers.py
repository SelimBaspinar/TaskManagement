# chat/consumers.py
from ast import While
from asyncio import tasks
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from reminders.models import Reminders
from tasks.models import Tasks
from channels.consumer import SyncConsumer
from time import sleep
from datetime import datetime
from users.models import Users
from django.core import serializers
import asyncio
import os
import django
from datetime import timezone
from channels.exceptions import StopConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rest.settings')
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
django.setup()

class ReminderConsumer(AsyncWebsocketConsumer):
    async  def connect(self):
        roomname=self.scope['url_route']['kwargs']['room_name']
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        self.tasks= await database_sync_to_async(self.get_tasks)()
        self.reminders= await database_sync_to_async(self.get_reminders)()

        self.date =  datetime.now()
        self.date_time = self.date.strftime("%m/%d/%Y, %H:%M:%S")
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
            )

        await self.accept()
        
        while True:
            await asyncio.sleep(2)
            self.tasks= await database_sync_to_async(self.get_tasks)()
            self.reminders= await database_sync_to_async(self.get_reminders)()

            self.date =  datetime.now()
            self.date_time = self.date.strftime("%m/%d/%Y, %H:%M")
            tmpJson = serializers.serialize("json", self.tasks)
            taskjson = json.loads(tmpJson)
            tmpJson1 = serializers.serialize("json", self.reminders)
            remindersjson = json.loads(tmpJson1)
            for task in taskjson:
                if str(task["fields"]["User"]) == str(self.room_name):
                    if task["fields"]["Reminder"] == True:
                        for reminder in remindersjson:
                            if reminder["fields"]["Task"]==task["pk"] and reminder["fields"]["ReminderStat"]==False:
                                if str( datetime.fromisoformat(str(reminder["fields"]["RemindTime"]).replace('Z', '+00:00')).astimezone(timezone.utc).strftime("%m/%d/%Y, %H:%M"))==str(self.date_time):
                                        await self.send(text_data=json.dumps({
                                        'Task': task["fields"]["Name"],
                                        'Description':task["fields"]["Description"],
                                        'Label':task["fields"]["Label"],
                                        'Priority':task["fields"]["Priority"],
                                        'Task_Id':task["pk"],
                                        'Reminder_Id':reminder["pk"],    
                                        'RemindTime':str( datetime.fromisoformat(str(reminder["fields"]["RemindTime"]).replace('Z', '+00:00')).astimezone(timezone.utc).strftime("%m/%d/%Y, %H:%M")),
                                        'TodayDate':str(self.date_time),
                                    }))
                                        await asyncio.sleep(2)
                                        Reminders.objects.filter(pk = reminder["pk"]).update(ReminderStat = True)
  



    async def disconnect(self, close_code):

        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        raise StopConsumer()

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        Task = text_data_json['Task']
        Description = text_data_json['Description']
        Label = text_data_json['Label']
        Priority = text_data_json['Priority']
        Task_Id=text_data_json['Task_Id']
        Reminder_Id=text_data_json['Reminder_Id']   
        RemindTime = text_data_json['RemindTime']
        TodayDate = text_data_json['TodayDate']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'Task': Task,
                'Description':Description,
                'Label': Label,
                'Priority': Priority,
                'Task_Id':Task_Id,
                'Reminder_Id':Reminder_Id , 
                'RemindTime': RemindTime,
                'TodayDate':TodayDate
            }
        )
    
    

    # Receive message from room group
    async def chat_message(self, event):
        Task = event['Task']
        Description = event['Description']
        Label = event['Label']
        Priority = event['Priority']
        Task_Id = event['Task_Id']
        Reminder_Id = event['Reminder_Id']
        RemindTime = event['Description']
        TodayDate = event['Label']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'Task': Task,
            'Description': Description,
            'Label':Label,
            'Priority':Priority,
            'Task_Id':Task_Id,
            'Reminder_Id':Reminder_Id , 
            'RemindTime': RemindTime,
            'TodayDate':TodayDate,
        }))
    def get_reminders(self):
        return Reminders.objects.all()

    def get_users(self):
        return Users.objects.all()

    def get_tasks(self):
        return Tasks.objects.all()





class BackgroundTaskConsumer(SyncConsumer):
    def task_a(self, message):
        self.send(text_data=json.dumps({
            'Task': "Task",
            'WhoSend': "WhoSend",
            'Date':"Date",
        }))
        sleep(5)

    def task_b(self, message):
        sleep(message['wait'])
    def test_print(self, message):
        print("Test: " + message["text"])


