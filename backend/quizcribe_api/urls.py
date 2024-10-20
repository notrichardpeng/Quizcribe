from django.urls import path
from .views import TranscribeAndSummarizeView, GenerateQAView

urlpatterns = [
    path('transcribe/', TranscribeAndSummarizeView.as_view(), name='transcribe'),
    path('generate-qa/', GenerateQAView.as_view(), name='generate-qa'),
]
