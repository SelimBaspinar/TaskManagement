from math import fabs
from django.db import models
from tasks.models import Tasks

# Create your models here.
class Reminders(models.Model):
    Task=models.ForeignKey(Tasks,related_name="task",on_delete=models.CASCADE)
    RemindTime=models.DateTimeField()
    ReminderStat=models.BooleanField(default=False)

    def _str_(self):
        return self.Task 