from django.db import models

# Create your models here.
class Roles(models.Model):
    Dashboard=models.BooleanField()


    def _str_(self):
        return self.R_Id 

          
class Users(models.Model):
    Name = models.CharField(max_length=120)
    Surname = models.CharField(max_length=120)
    Username = models.CharField(max_length=120)
    Gender = models.CharField(max_length=120)
    Birthday = models.DateField()
    Role = models.ForeignKey(Roles,related_name="roles",on_delete=models.CASCADE)
    Phone = models.CharField(max_length=1200)
    Email = models.CharField(max_length=120)
    Password = models.CharField(max_length=500)
    img = models.ImageField(upload_to='user_images')



    def _str_(self):
        return self.U_Id    