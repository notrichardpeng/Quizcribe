import React from 'react';
import { Card, CardContent, CardActions, CardMedia, Box, Button, Typography, IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Image from 'next/image';

export default function CustomCard({ toggle, settoggle }) {
  return (
    <Card sx={{ display: 'flex', width: 800, height: 328, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 3 }}>

      <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          Question 1
        </Typography>

        <Typography variant="h4" component="div">
          Question 1 Question 1 Question 1 Question 1
        </Typography>

        <CardActions sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb:0, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button variant="contained" color="primary" sx={{ width: 80, height:40, mx: 2 }}>
              True
            </Button>
            <Button variant="contained" color="primary" sx={{ width: 80, height:40, mx: 2 }}>
              False
            </Button>
          </Box>
        </CardActions>
        
        <CardActions sx={{ justifyContent: 'center', mt:1 }}>
          <Button variant="contained" startIcon={<ArrowForwardIosIcon />} color="primary">
           Next
          </Button>
        </CardActions>

      </CardContent>
    </Card>
  );
}
