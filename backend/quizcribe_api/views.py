from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class TranscribeAndSummarizeView(APIView):
    """
    Handles AI-related processing using GPT.
    """
    def post(self, request):
        prompt = request.data.get('prompt')
        if not prompt:
            return Response({'error': 'No prompt provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            generated_text = generate_gpt_response(prompt)
            return Response({'response': generated_text}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GPTSummaryView(APIView):
    """
    Handles AI-related processing for summarization tasks.
    """
    def post(self, request):
        text = request.data.get('text')
        if not text:
            return Response({'error': 'No text provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            summary = generate_summary(text)
            return Response({'summary': summary}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
