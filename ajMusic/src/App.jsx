import React, { useState, useRef } from "react";
import axios from "axios";

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
      }, 5000); // Adjust the duration as needed
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

          const response = await axios.post("http://localhost:5000/identify", formData, {
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
    <div>
      <h1>Live Music Recognition</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <button onClick={startRecording} disabled={isRecording}>
          {isRecording ? "Recording..." : "Start Recording"}
        </button>
      </div>
      {recognizedMusic && (
        <div>
          <h3>Recognized Music:</h3>
          <pre>{JSON.stringify(recognizedMusic, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
