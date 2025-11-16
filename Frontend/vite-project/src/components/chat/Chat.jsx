import { useState, useCallback } from "react"; 
import ChatHistory from "./ChatHistory";
import MessageInput from "./MessageInput";
import Home from "./Home";
import { sendMessageToBot } from "../../api/chatApi";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [showHome, setShowHome] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSend = useCallback(
    async (text) => {
      console.log("Chat.jsx handleSend received:", text);

      if (!text.trim()) return;

      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Add user message
      setMessages((prev) => [
        ...prev,
        { sender: "user", text, timestamp },
      ]);

      setLoading(true);

      try {
        const res = await sendMessageToBot(text);

        // Add bot message
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: res.data.reply, timestamp },
        ]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Backend error. Try again.", timestamp },
        ]);
      }

      setLoading(false);
    },
    []
  );

  const handleStartConversation = () => {
    setShowHome(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setShowHome(false);
    handleSend(suggestion);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {showHome ? (
        <Home 
          onStartConversation={handleStartConversation}
          onSuggestionClick={handleSuggestionClick}
        />
      ) : (
        <>
          <ChatHistory messages={messages} />
          <MessageInput onSend={handleSend} />
        </>
      )}
    </div>
  );
}