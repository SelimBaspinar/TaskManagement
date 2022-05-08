from django.db import models
from users.models import Users

# Create your models here.
class Tasks(models.Model):
    Name = models.CharField(max_length=1200)
    Description = models.CharField(max_length=12000)
    Priority=models.CharField(max_length=12000)
    Label=models.CharField(max_length=12000)
    Time = models.DateTimeField()
    User=models.ForeignKey(Users,related_name="user",on_delete=models.CASCADE)
    Reminder=models.BooleanField(default=False)
    Stat=models.CharField(max_length=12000)
    
    def _str_(self):
        return self.Name 