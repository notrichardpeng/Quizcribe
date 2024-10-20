from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from ai_core import transcribe

class TranscribeAndSummarizeView(APIView):
    """
    Handles transcribing and summarizing using Deepgram and Gemini
    """
    permission_classes = [AllowAny]

    def post(self, request):
        url = request.data.get('url')
        if not url:
            return Response({'error': 'No URL provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # # Testing
        # return Response({'response': "Brownian motion, any of various physical phenomena in which some quantity is constantly undergoing small, random fluctuations. It was named for the Scottish botanist Robert Brown, the first to study such fluctuations (1827)."}, status=status.HTTP_200_OK)

        try:
            print("Transcribing video...")
            transcript = transcribe(url)
            print("Summarizing video...")
            summary = summarize_text(transcript)
            return Response({'response': summary}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class GenerateQA(APIView):
    """
    Handles generating questions and answers
    """
    
    def post(self, request):
        text = request.data.get('text')
        if not text:
            return Response({'error': 'No text provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            quiz_questions = api_generate_quiz(text)
            return Response({'quiz_questions': quiz_questions}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
