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
  LinearProgress
} from "@mui/material";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const router = useRouter();
  const HOST_URL = "http://localhost:8000/quizcribe_api"

  const [url, setUrl] = useState('');
  const [fetched, setFetched] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setIsHidden(true);

      const response = await fetch(`${HOST_URL}/transcribe/`, {
        method: "POST",
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

  const enterQuiz = async () => {
    setIsTesting(true);

    const response = await fetch(`${HOST_URL}/generate-qa/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "text": fetched }),
    });

    const data = await response.json();
    sessionStorage.setItem("questions", JSON.stringify(data["response"]));
    router.push("/quiz");

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
        <Box component="header" sx={{ width: { xs: "100%", md: "55%" } }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold", fontFamily: 'Helvetica Neue' }}>
            <Typewriter
              words={["Quizcribe"]}
              cursor
              cursorStyle="_"
              loop={100}
              typeSpeed={100}
              deleteSpeed={80}
              delaySpeed={5000}
            ></Typewriter>
          </h1>

          <Typography variant="body1" fontWeight="semibold" sx={{ mt: 2, fontFamily: 'Helvetica Neue' }}>
            Rewriting open education.
          </Typography>
        </Box>

        {isHidden ? (
          <Box
            sx={{
              textAlign: "center",
              fontWeight: "semibold",
              mt: 10  // Material-UI's spacing system (theme spacing multiplier)
            }}
          >
            <CircularProgress size="3rem" />
            <p>Dissecting video... This may take a while...</p>
          </Box>
        ) : (
          <Box
            className='bg-white'
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
            <Button
              className="bg-zinc-700 text-white"
              variant="contained"
              onClick={handleSubmit}
            >
              Quizcribe
            </Button>
          </Box>
        )}

        {fetched && (
          <>
            <Box
              className='bg-white text-black'
              component="form"
              onSubmit={handleSubmit}
              sx={{
                mt: 10,
                display: "grid",
                gap: 2,
                p: 4,
                backgroundColor: "background.paper",
                borderRadius: "12px",
                width: { xs: "100%", md: "90%" },
                boxShadow: 1,
              }}
            >
              <Typography className="text-zinc-800" variant="h4" fontWeight="bold" sx={{ justifyContent: 'center', textAlign: 'center', }}>
                Summary
              </Typography>
              <Typography variant="h6" component="div">
                {fetched}
              </Typography>

            </Box>

            <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {isTesting ? (
                <div style={{ textAlign: "center" }}>
                  <LinearProgress />
                  <p>Generating your quiz... Please wait...</p>
                </div>
              ) : (
                <Button className='bg-zinc-700' variant="contained" onClick={enterQuiz}>
                  Test My Knowledge!
                </Button>
              )}
            </Box>
          </>
        )}

        <footer className="border-t text-center border-t-zinc-100 dark:border-t-zinc-800 pt-4 mt-20">
          <p>
            Built using{" "}
            <a href="https://gemini.google.com/" target="_blank" class="custom-link">
              Deepgram
            </a>
            ,{" "}
            <a href="https://deepgram.com/" target="_blank" class="custom-link">
              Google Gemini
            </a>
            .
          </p>
          <p className="mt-4">
            <a
              href="https://github.com/notrichardpeng/Quizcribe"
              target="_blank"
              className="inline-flex hover:bg-transparent text-inherit hover:text-emerald-500"
            >
              <svg
                height="24"
                width="24"
                aria-hidden="true"
                viewBox="0 0 16 16"
                version="1.1"
                fill="currentColor"
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
            </a>
          </p>
        </footer>
      </Container>
    </>
  );
}
