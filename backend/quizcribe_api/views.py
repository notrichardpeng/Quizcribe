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

        print("\n\n\n\n")

        url = request.data.get('url')
        if not url:
            return Response({'error': 'No URL provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        print(url)
        try:
            transcript = transcribe(url)
            return Response({'response': transcript}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# class GenerateQA(APIView):
#     """
#     Handles generating questions and answers
#     """
#     def post(self, request):
#         text = request.data.get('text')
#         if not text:
#             return Response({'error': 'No text provided'}, status=status.HTTP_400_BAD_REQUEST)
        
#         try:
#             summary = generate_summary(text)
#             return Response({'summary': summary}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
