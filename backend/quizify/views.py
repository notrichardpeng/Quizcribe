from django.shortcuts import render, redirect
from .models import Video, Question
from .utils import summarize_video, generate_quiz

def index(request):
    if request.method == "POST":
        url = request.POST.get('url')

        existing_video = Video.objects.filter(url=url).first()
        if existing_video:
            return redirect('quiz', video_id=existing_video.id)
        else:
            summary = summarize_video(url)
            questions = generate_quiz(url)
            
            video = Video.objects.create(url=url, summary=summary)
            for question in questions:
                Question.objects.create(video=video, text=question['question'], answer=question['answer'])
            
            return redirect('quiz', video_id=video.id)
    
    return render(request, 'quizify/index.html')
 
def quiz(request, video_id):
    video = Video.objects.get(id=video_id)
    questions = Question.objects.filter(video=video)
    return render(request, 'quizify/quiz.html', {'video': video, 'questions': questions})
