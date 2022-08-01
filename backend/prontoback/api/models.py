from django.db import models

class Task(models.Model):
    descripcion = models.CharField(max_length=60)
    esfinalizado = models.BooleanField()

    def __str__(self):
        return self.descripcion