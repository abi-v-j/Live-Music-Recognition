import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import MusicFound from './MusicFound/MusicFound';
const Animation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedMusic, setRecognizedMusic] = useState(null);
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleClick = async () => {
    if (isRecording) return;

    try {
      setError(null);
      setIsAnimating(true);
      audioChunksRef.current = []; // Clear previous chunks

      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      streamRef.current = stream;

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 128000
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');

        try {
          const response = await axios.post('https://live-music-recognition-2pyx.vercel.app/identify', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            timeout: 30000,
          });

          if (response.data) {
            setRecognizedMusic(response.data);
            setShowModal(true);
          }
        } catch (err) {
          console.error('Recognition error:', err.response?.data || err.message);
          setError(err.response?.data?.message || 'Error recognizing audio. Please try again.');
        } finally {
          audioChunksRef.current = [];
          setIsRecording(false);
          setIsAnimating(false);
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
          }
        }
      };

      mediaRecorderRef.current.start(100); // Collect data every 100ms
      setIsRecording(true);

      // Record for 5 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      }, 5000);

    } catch (err) {
      console.error('Recording error:', err);
      setError('Microphone access is required for this feature.');
      setIsAnimating(false);
    }
  };



  const closeModal = () => {
    setShowModal(false);
    setRecognizedMusic(null);
  };

  const circleVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 0 0 0 rgba(0, 186, 255, 0.4)',
    },
    animate: {
      scale: [1, 1.1, 1],
      boxShadow: [
        '0 0 0 0 rgba(0, 186, 255, 0.4)',
        '0 0 0 20vmin rgba(0, 186, 255, 0.3)',
        '0 0 0 0 rgba(0, 186, 255, 0)',
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const modalVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #00b4ff, #0078ff)',
      }}
    >
      <motion.div
        className="logo"
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: '#00d1ff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        }}
        onClick={handleClick}
        variants={circleVariants}
        initial="initial"
        animate={isAnimating ? 'animate' : 'initial'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#ffffff"
          width="50px"
          height="50px"
        >
          <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2zM11 18h2v3h-2z" />
        </svg>
        {isRecording && (
          <motion.p
            style={{
              color: '#ffffff',
              fontSize: '16px',
              marginTop: '12px',
              textAlign: 'center',
              fontWeight: '525',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Listening
          </motion.p>
        )}
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              padding: '20px',
            }}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              className="modal-content"
              style={{
                borderRadius: '10px',
                color: 'white',
                fontSize: '20px',
                textAlign: 'center',
                padding: '20px',
                fontFamily: "'Arial', sans-serif",
                position: 'relative',
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
              >
                &times;
              </button>
              {recognizedMusic ? (
                <MusicFound music={recognizedMusic} />
              ) : (
                <p>{error || 'No music recognized.'}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Animation;
