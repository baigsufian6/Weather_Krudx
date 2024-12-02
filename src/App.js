import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);  // For storing the audio URL for playback
  const [audioBlob, setAudioBlob] = useState(null);  // For storing the audio Blob for upload
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState(null);  // For error messages
  const [retryCount, setRetryCount] = useState(0);  // For tracking retry attempts

  const apiKey = '43e59c7ffbmshae1d325531ab8f0p1a87eajsn91643a533b32'; // RapidAPI key for AI Transcriptions
  const apiHost = 'ai-transcriptions.p.rapidapi.com';

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaRecorder]);

  // Start recording the audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.start();
      console.log('Recording started');

      recorder.addEventListener('dataavailable', (event) => {
        const audioBlob = event.data;
        setAudioBlob(audioBlob);

        // Create an object URL for playback
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl); // Set the URL for playback
      });

      setRecording(true);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error('Error getting user media:', error);
      setError('Failed to access microphone. Please allow microphone access.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      console.log('Recording stopped');
      setRecording(false);
    }
  };

  // Upload audio to Cloudinary and get the URL
  const uploadAudioToCloudinary = async (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');
    formData.append('upload_preset', 'Sufian'); // Use your Cloudinary preset

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dextwaqcd/raw/upload', // Correct URL format for raw uploads
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Cloudinary upload response:', data);
      return data.secure_url; // Return the Cloudinary URL of the uploaded audio
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      setError('Error uploading audio to Cloudinary.');
      return null;
    }
  };

  // Transcribe the audio using AI Transcriptions API with retry logic
  const transcribeAudio = async () => {
    const cloudinaryAudioUrl = await uploadAudioToCloudinary(audioBlob); // Upload audio to Cloudinary

    if (cloudinaryAudioUrl) {
      const maxRetries = 5;
      const retryDelay = (attempt) => Math.min(2 ** attempt * 1000, 30000); // Exponential backoff

      while (retryCount < maxRetries) {
        try {
          console.log('Transcribing audio from URL:', cloudinaryAudioUrl);
          const response = await axios.post(
            'https://ai-transcriptions.p.rapidapi.com/speechtotext',
            {
              audioUrl: cloudinaryAudioUrl,  // Send the Cloudinary audio URL for transcription
              language: 'en',    // English language code
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-host': apiHost,
                'x-rapidapi-key': apiKey,  // Provide the RapidAPI key for AI Transcriptions
              },
            }
          );

          console.log('Transcription API response:', response.data);

          if (response.data && response.data.transcription) {
            setTranscription(response.data.transcription); // Set the transcription in state
            setError(null); // Clear any previous errors
            return;
          } else {
            setError('Failed to transcribe audio.');
            return;
          }
        } catch (error) {
          if (error.response && error.response.status === 429) {
            setRetryCount(retryCount + 1);
            console.error(`Rate limit exceeded. Retrying in ${retryDelay(retryCount) / 1000} seconds...`);
            setError(`Rate limit exceeded. Retrying in ${retryDelay(retryCount) / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay(retryCount)));
          } else {
            console.error('Error with transcription API:', error);
            setError('Failed to transcribe audio. Please try again.');
            return;
          }
        }
      }

      setError('Max retries exceeded. Please try again later.');
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Audio Recorder & Transcription</h1>

      <div className="control-container">
        {!recording ? (
          <button onClick={startRecording} className="start-button">Start Recording</button>
        ) : (
          <button onClick={stopRecording} className="stop-button">Stop Recording</button>
        )}
      </div>

      {/* Audio Playback */}
      {audioUrl && (
        <div className="audio-preview">
          <p>Audio Recording:</p>
          <audio controls src={audioUrl} className="audio-player" />
          <div className="button-container">
            <button onClick={transcribeAudio} className="upload-button">
              Transcribe Audio
            </button>
          </div>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {/* Transcription Box */}
      <div className="transcription-box">
        <p>{transcription || 'Waiting for transcription...'}</p>
      </div>
    </div>
  );
};

export default App;
