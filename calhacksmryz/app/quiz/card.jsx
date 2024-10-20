import React from 'react';
import { Card, CardContent, CardActions, CardMedia, Box, Button, Typography, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Image from 'next/image';

export default function CardTemp({ question, questionIndex, totalQuestions, onChoiceSelect, onSubmit, onNext, selectedChoice, submitted, isCorrect }) {
  return (
    <Card className='bg-zinc-50' sx={{ display: 'flex', width: 800, height: 328, borderRadius: 3, boxShadow: 3 }}>

      <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          Question {questionIndex} of {totalQuestions}
        </Typography>

        <Typography variant="h4" component="div">
          {question.question}
        </Typography>

        <CardActions sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 0, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', gap: 2 }}>
            {question.choices.map((choice, index) => {
              let buttonVariant = "outlined";
              let buttonColor = "primary";
              let isDisabled = false;

              // 如果已经提交，判断按钮颜色
              if (submitted) {
                if (choice === selectedChoice && choice.correct) {
                  // 用户选择的正确答案，绿色背景
                  buttonVariant = "contained";
                  buttonColor = "success";
                } else if (choice === selectedChoice && !choice.correct) {
                  // 用户选择的错误答案，红色背景
                  buttonVariant = "contained";
                  buttonColor = "error";
                } else if (choice.correct) {
                  // 正确的答案，绿色背景
                  buttonVariant = "contained";
                  buttonColor = "success";
                } else {
                  isDisabled = true;
                }
              } else if (choice === selectedChoice) {
                buttonVariant = "contained";
                buttonColor = "primary";
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant}
                  color={buttonColor}
                  onClick={() => onChoiceSelect(choice)}
                  disabled={isDisabled}
                  sx={{ my: 1, flexGrow: 1 }}
                >
                  {choice.text}
                </Button>
              );
            })}
          </Box>
        </CardActions>


        <CardActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
          <Button onClick={onSubmit} variant="contained" color="primary" disabled={submitted || !selectedChoice}>
            Submit
          </Button>

          <Button className='bg-zinc-700 text-white' onClick={onNext} variant="contained" color="secondary" sx={{ mt: 2 }} disabled={!submitted}>
            Next
          </Button>
        </CardActions>

      </CardContent>
    </Card>
  );
}