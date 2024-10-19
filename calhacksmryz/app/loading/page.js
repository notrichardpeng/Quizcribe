"use client";

import React, { useState } from 'react';
import { CircularProgress, Button } from '@mui/material';

const Loading = () => {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleStartProcessing = () => {
    setLoading(true);
    setAiResponse('');

    // Simulate AI processing with a timeout (replace this with a real API call)
    setTimeout(() => {
      const response = 'AI has generated the answer!';
      setAiResponse(response);
      setLoading(false);
    }, 3000); // Simulate 3 seconds of loading
  };

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',  // Full viewport height
        flexDirection: 'column' // For vertical stacking
      }}
    >
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
          <p>Generating AI response...</p>
        </div>
      ) : (
        <Button
          onClick={handleStartProcessing}
          variant="contained"
          color="primary"
        >
          Start AI Processing
        </Button>
      )}

      {aiResponse && <p className="text-green-500 mt-4">{aiResponse}</p>}
    </div>
  );
};

export default Loading;