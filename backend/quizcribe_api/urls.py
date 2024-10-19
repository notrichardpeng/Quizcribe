from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('quiz/<int:video_id>/', views.quiz, name='quiz'),
]
