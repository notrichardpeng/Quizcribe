# Quizcribe
Calhacks 11.0 Michael Siu, Richard Peng, Yiling Yuan, Zhen Liu
![image](https://github.com/user-attachments/assets/c3e677cb-60ae-4082-a772-d5cc865e4787)

## Overview
Quizcribe is educational software that supplements students with AI-powered study resources generated from inputted videos or audio.
By entering a link to a video, such as one from YouTube, Quizcribe automatically transcribes the video and returns a detailed summary of its content, allowing for an efficient review of key concepts in various academic settings. Additionally, users have the option to generate small problem sets based on the inputted video, providing quick and accurate study materials on the go. 

Purpose: This app was made to create a solution for more versatile and time-efficient study methods. Along with this, Quizcribe aims to expand the accessibility of educational resources to people of all academic fields and levels. 

Main Features:
* Automated voice-to-speech transcription that converts videos/audio of any length into text.
* AI-powered video summary and practice problem generation.
* Video detection and transcription support for 16 languages. 

## Installation Instructions
To install dependencies:
```
pip install -r requirements.txt
```
```
cd calhacksmryz
npm install
```

Run App and API Server:
```
npm run dev
```
```
cd backend
python manage.py runserver
```
The app should be at `localhost:3000`

## Tech Stack
* Frontend: Next.js/React, Tailwind CSS, Material UI
* Backend: Django/Python
* API: Deepgram (Speech to Text), Google Gemini 1.5, YouTube DL

## Key Functionalities

### Video/Audio to Transcript Generation using Deepgram
* Users are prompted to input a link, which is passed to the YouTube DL and extracted into a video file URL.
* Deepgram AI's Speech-To-Text API is then used to convert the audio into transcripts.
* Deepgram AI's built-in language detection system allows for the transcription of videos/audio in 16 languages.

### Content Summarization using Google Gemini
* Gemini API is used to automatically provide a consistently structured summary of the educational video.
### Problem Set Generation using Google Gemini
* Using a chain of thought approach, problem sets are generated from the summarized content. The logic behind this feature involves step-by-step prompt engineering that ensures the generated questions are relevant, thought-provoking, and aligned with the key concepts in the summarized content.
* Corrent answer are determined by AI-powered logic reasoning.

### Demo
* Summary to video url provided
![image (1)](https://github.com/user-attachments/assets/7a036987-1203-4f49-8456-accf12a5f14d)
* Quiz
![image (2)](https://github.com/user-attachments/assets/e7b33303-5641-4325-8a1c-6dd0e53fd341)
* Result
![image (3)](https://github.com/user-attachments/assets/293ff408-c2a7-4627-b823-908b60d44961)
