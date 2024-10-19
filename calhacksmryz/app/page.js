'use client'
import React, { useState } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';

export default function Home() {
  const [url, setUrl] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
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
          <Button variant="contained">
            Quizcribe
          </Button>
        </Box>
      </Container>
    </>
  );
}
