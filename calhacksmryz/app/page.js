'use client';
import React, { useState } from 'react';
import { Container, TextField, Box } from '@mui/material';

export default function Home() {
  const [url, setUrl] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box sx={{ mt: '25vh' }}>
          <TextField
            label="Video URL to Quizify"
            variant="outlined"
            fullWidth
            rows={1}
            value={url}
            onChange={handleInputChange}
          />
        </Box>
      </Container>
    </>
  );
}
