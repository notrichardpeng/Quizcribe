'use client';

import Head from 'next/head'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CardTemp from './card';
import QuizResult from './result';
import { Card, CardContent, CardActions, CardMedia, Box, Button, Typography, IconButton } from '@mui/material';

export default function QuizPage() {
  const questions = JSON.parse(sessionStorage.getItem('questions'));
  
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const totalQuestions = questions?.length;

  const handleChoiceSelect = (choice) => {
    if(!submitted){
      setSelectedChoice(choice);
      setSubmitted(false);
      setIsCorrect(null);  
    }
  };
  
  const handleSubmit = () => {
      if (selectedChoice) {
          setUserAnswers([...userAnswers, selectedChoice.text]);
          if (selectedChoice.correct) {
              setScore(score + 1);
              setIsCorrect(true);
          } else {
              setIsCorrect(false);
          }
          setSubmitted(true);
      }
  };

  const handleNext = () => {
    if (submitted) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedChoice(null);
        setSubmitted(false);
        setIsCorrect(null);
      } else {
        setIsFinished(true)
      }
    }
  };

  return (
    <>
      <Head>
        <title>QuizPage</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className='h-[100vh] w-[100vw] flex justify-center ease-linear duration-300 items-center'>
        {questions !== undefined && (
          !isFinished ? (
              <CardTemp
                  question={questions[currentQuestionIndex]}
                  questionIndex={currentQuestionIndex + 1}
                  totalQuestions={totalQuestions}
                  onChoiceSelect={handleChoiceSelect}
                  onSubmit={handleSubmit}
                  onNext={handleNext}
                  selectedChoice={selectedChoice}
                  submitted={submitted}
                  isCorrect={isCorrect}
              />
          ) : (
              <QuizResult score={score} totalQuestions={totalQuestions} questions={questions} userAnswers={userAnswers} />
          )
        )}
      </div>
    </>
  )
}