from statistics import mode
from django.db import models

import os.path

          
class Translate(models.Model):
    txt = models.JSONField()
    Component = models.CharField(max_length=1200)
    Lang = models.CharField(max_length=1200)



    def _str_(self):
        return self.Name    



