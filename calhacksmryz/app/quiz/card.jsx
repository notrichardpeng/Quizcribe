import React from 'react';
import { Card, CardContent, CardActions, CardMedia, Box, Button, Typography, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Image from 'next/image';

export default function CardTemp({ question, questionIndex, totalQuestions, onChoiceSelect, onSubmit, onNext, selectedChoice, submitted, isCorrect }) {
  return (
    <Card className='bg-zinc-50' sx={{
      display: 'flex',
      width: { xs: '90%', sm: '85%', md: '80%', lg: '75%' }, // Maintain a fixed width or make it responsive
      minWidth: 300, // Minimum width can help maintain layout integrity
      maxWidth: '100%', // Optional: Limit the width to the parent container's width
      borderRadius: 3,
      boxShadow: 3,
      overflow: 'hidden', // Prevents content from spilling outside the card
    }}>

      <CardContent sx={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          p: 2,
        }}>

        <Typography variant="subtitle1" color="primary" gutterBottom>
          Question {questionIndex} of {totalQuestions}
        </Typography>

        <Typography 
          variant="h5" 
          component="div" 
          fontWeight="semibold" 
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            width: '100%',
            mb: 2,
            wordBreak: "break-word",
            hyphens: 'auto',
            maxWidth:1000,
          }}
        >
          {question.question}
        </Typography>

        <CardActions sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 0, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', gap: 2 }}>
            {question.choices.map((choice, index) => {
              let buttonVariant = "outlined";
              let buttonColor = "primary";
              let isDisabled = false;

              if (submitted) {
                if (choice?.text === selectedChoice?.text && choice?.correct) {
                  buttonVariant = "contained";
                  buttonColor = "success";
                } else if (choice?.text === selectedChoice?.text && !choice?.correct) {
                  buttonVariant = "contained";
                  buttonColor = "error";
                } else if (choice?.correct) {
                  buttonVariant = "contained";
                  buttonColor = "success";
                } else {
                  isDisabled = true;
                }
              } else if (choice?.text === selectedChoice?.text) {
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
                  sx={{ 
                    my: 1, 
                    flexGrow: 1,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                    width: '100%',
                    mb: 2,
                    wordBreak: "break-word",
                    hyphens: 'auto',
                    maxWidth:350,
                  }}
                >
                  {choice.text}
                </Button>
              );
            })}
          </Box>
        </CardActions>


        <CardActions sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          <Button onClick={onSubmit} variant="contained" color="primary" disabled={submitted || !selectedChoice} sx={{ mx: 1, width: '150px' }}>
            Submit
          </Button>

          <Button className='bg-zinc-700 text-white' onClick={onNext} variant="contained" color="secondary" sx={{ mx: 1, width: '150px' }} disabled={!submitted}>
            Next
          </Button>
        </CardActions>


      </CardContent>
    </Card>
  );
}