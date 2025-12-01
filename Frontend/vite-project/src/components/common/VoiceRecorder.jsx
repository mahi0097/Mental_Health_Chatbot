import React, { useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

export default function VoiceRecorder({ isListening, onResult }) {
  let recorder = {};

  useEffect(() => {
    if (isListening) {
      recorder.startRecording();
    } else {
      recorder.stopRecording();
    }
  }, [isListening]);

  const sendAudio = async (blob) => {
    const formData = new FormData();
    formData.append("audio", blob, "voice.webm");

    const res = await fetch("http://localhost:5000/api/voice-to-text", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Speech text:", data.text);

    if (data.text) {
      onResult(data.text); // ⭐ yaha se message input me text jaayega
    }
  };

  return (
    <ReactMediaRecorder
      audio
      blobPropertyBag={{ type: "audio/webm" }}
      onStop={(blobUrl, blob) => sendAudio(blob)}
      render={({ startRecording, stopRecording }) => {
        recorder = { startRecording, stopRecording };
        return null;
      }}
    />
  );
}
