from django.urls import path
from views import TranscribeAndSummarizeView

urlpatterns = [
    path('transcribe/', TranscribeAndSummarizeView.as_view(), name='transcribe'),  # Map the view to the URL
]
