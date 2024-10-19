'use client';
import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

export default function Home() {
  const [url, setUrl] = useState('');
  const [fetched, setFetched] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setFetched(data.url);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error submitting URL:', error);
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box sx={{ mt: '25vh', display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label="Video URL"
            variant="outlined"
            fullWidth
            rows={1}
            value={url}
            onChange={handleInputChange}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Quizcribe
          </Button>
        </Box>

        {fetched && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h6" component="div">
              Submitted URL: {fetched}
            </Typography>
          </Box>
        )}

      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="contained" href='quiz'>
          Quiz
        </Button>
      </Box>

      </Container>
    </>
  );
}
