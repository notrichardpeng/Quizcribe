from django.db import models

# Create your models here.
class Video(models.Model):
    url = models.URLField()
    transript = models.TextField()
    summary = models.TextField()

class Question(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
    text = models.TextField()
    answer = models.TextField()
    user_answer = models.TextField()
