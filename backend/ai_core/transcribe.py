from deepgram import (
    DeepgramClient,
    PrerecordedOptions,
)
import yt_dlp

# The API key 
DEEPGRAM_API_KEY = ''

def extract_video(link):

    # Define the YouTube video URL
    video_url = link

    # Create a YouTubeDL instance
    ydl_opts = {
        'format': 'bestaudio',  # Choose the best available quality format
        'quiet': True, 
        'skip_download': True
    }

    # Extract video information
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(video_url, download=False)  # Set download=False to avoid downloading the video
        video_url = info_dict.get('url', None)
    
    return video_url

import http.client
import json

def transcribe(video_url):
    video_link = extract_video(video_url)

    # Create the connection
    conn = http.client.HTTPSConnection("api.deepgram.com")

    # Define the payload for the HTTP request
    payload = json.dumps({"url": video_link})

    # Define the headers for the HTTP request
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + DEEPGRAM_API_KEY
    }

    # Make the HTTP request
    conn.request("POST", "/v1/listen?smart_format=true&detect_language=true", payload, headers)

    # Get the response from the HTTP request
    res = conn.getresponse()
    data = res.read()

    starting = data.decode("utf-8").index('"transcript"')
    ending = data.decode("utf-8").index('"words"')
    return data.decode("utf")[starting + 14:ending - 26]
