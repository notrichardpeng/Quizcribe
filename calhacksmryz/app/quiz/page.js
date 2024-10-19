'use client';

import Head from 'next/head'
import { useState } from 'react';
import CardTemp from './card';

const questions = [
    {
      question: "What is 1+1?",
      choices: [
        { text: "3", correct: false },
        { text: "2", correct: true },
        { text: "1", correct: false },
      ]
    },
    {
      question: "What color is the sky?",
      choices: [
        { text: "Blue", correct: true },
        { text: "Green", correct: false },
        { text: "Red", correct: false },
      ]
    },
    {
      question: "What is 2+2?",
      choices: [
        { text: "3", correct: false },
        { text: "4", correct: true },
        { text: "5", correct: false },
      ]
    }
  ];

export default function QuizPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const totalQuestions = questions.length;

    const handleChoiceSelect = (choice) => {
        setSelectedChoice(choice);
        setSubmitted(false);
        setIsCorrect(null);
    };

    const handleSubmit = () => {
        if (selectedChoice) {
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
            {!isFinished ? (
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
            <div>
                <h1>Your Score: {score}/{totalQuestions}</h1>
            </div>
            )}
        </div>
    </>
  )
}