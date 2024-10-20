'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function Home() {
  const router = useRouter();
  const HOST_URL = "http://localhost:8000/quizcribe_api"

  const [url, setUrl] = useState('');
  const [fetched, setFetched] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setIsHidden(true);

      const response = await fetch(`${HOST_URL}/transcribe/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setFetched(data["response"]);
        setIsHidden(false);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error submitting URL:", error);
    }
  };

  const enterQuiz = () => {
    const complexData = { text: 'Hello' };
    const queryString = encodeURIComponent(JSON.stringify(complexData));
    router.push(`/quiz?data=${queryString}`);
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          py: 10,
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Header */}
        <Box component="header">
          <Typography variant="h3" component="h1" fontWeight="bold">
            Quizcribe
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Summarizing and generating practice quizzes from educational videos.
          </Typography>
        </Box>

        {isHidden ? (
          <div style={{ textAlign: "center", paddingTop: "2rem" }}>
            <CircularProgress />
            <p>Dissecting video... This may take a while...</p>
          </div>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 10,
              display: "grid",
              gap: 2,
              p: 4,
              backgroundColor: "background.paper",
              borderRadius: "12px",
              width: { xs: "100%", md: "60%" },
              boxShadow: 1,
            }}
          >
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
        )}

        {fetched && (
          <>
            <Box sx={{ mt: 5 }}>
              <Typography variant="h6" component="div">
                {fetched}
              </Typography>
            </Box>
            <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button variant="contained" onClick={enterQuiz}>
                Test My Knowledge!
              </Button>
            </Box>
          </>
        )}

      </Container>
    </>
  );
}
