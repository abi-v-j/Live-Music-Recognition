import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "./App.module.css";
import RecognizedMusic from "./RecognizedMusic/RecognizedMusic";

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedMusic, setRecognizedMusic] = useState(null);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Automatically stop recording after 5 seconds
      setTimeout(() => {
        stopRecordingAndSend();
      }, 5000);
    } catch (err) {
      setError("Microphone access is required for this feature.");
      console.error(err);
    }
  };

  const stopRecordingAndSend = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();

      mediaRecorderRef.current.onstop = async () => {
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });

          const formData = new FormData();
          formData.append("audio", audioBlob);

          const response = await axios.post("http://localhost:5001/identify", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setRecognizedMusic(response.data);
          console.log(response.data);
        } catch (err) {
          setError("Error recognizing audio.");
          console.error("Error recognizing audio:", err);
        } finally {
          // Clean up
          audioChunksRef.current = [];
          setIsRecording(false);
        }
      };
    }
  };

  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Live Music Recognition
      </motion.h1>

      {error && <p className={styles.error}>{error}</p>}

      <motion.div
        className={styles.recordButtonContainer}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button onClick={startRecording} className={styles.recordButton} disabled={isRecording}>
          {isRecording ? "Recording..." : "Start Recording"}
        </button>
      </motion.div>

      {recognizedMusic && (
        <motion.div
          className={styles.result}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Recognized Music:</h3>
          <RecognizedMusic data={recognizedMusic}/>
        </motion.div>
      )}
    </div>
  );
};

export default App;
