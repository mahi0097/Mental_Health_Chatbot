import React, { useState, useRef } from "react";
import MicIcon from "../common/MicIcon";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);

  // Initialize Web Speech API
  const initRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return null;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "hi-IN";  // Hindi
    // recognition.lang = "en-US";  // If you want English

    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // When voice → text completes
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      console.log("Voice text:", text);

      setMessage(text); // Auto-fill input box
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return recognition;
  };

  // START recording on mouse down
  const handleMicDown = () => {
    if (isListening) return;

    let recognition = recognitionRef.current;

    if (!recognition) {
      recognition = initRecognition();
      recognitionRef.current = recognition;
    }

    if (!recognition) return;

    setIsListening(true);
    recognition.start();
  };

  // STOP recording on mouse up
  const handleMicUp = () => {
    const recognition = recognitionRef.current;

    if (recognition && isListening) {
      recognition.stop();
    }
  };

  // Send message
  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white shadow-lg">

      {/* Input box */}
      <input
        type="text"
        className="flex-1 border rounded-xl p-3"
        placeholder="Type here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Mic button */}
      <button
        onMouseDown={handleMicDown}
        onMouseUp={handleMicUp}
        className={`p-3 rounded-full ${
          isListening ? "bg-red-500" : "bg-purple-600"
        } text-white`}
      >
        <MicIcon />
      </button>

      {/* Send button */}
      <button
        className="p-3 bg-pink-500 rounded-full text-white"
        onClick={handleSend}
      >
        ➤
      </button>
    </div>
  );
};

export default MessageInput;
