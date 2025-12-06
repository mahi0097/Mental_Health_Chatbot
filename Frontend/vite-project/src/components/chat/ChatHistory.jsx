import React, { useEffect, useRef } from "react";
import { ChatBubble } from "./ChatBubble";

const ChatHistory = ({ messages, loading }) => {
  const chatEndRef = useRef(null);

 
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="
        flex flex-col flex-grow 
        p-6 sm:px-12 md:px-20 lg:px-32 xl:px-48 
        space-y-4 
        overflow-y-auto overflow-x-hidden 
        scrollbar-hide
      "
    >
      {messages.map((msg, index) => (
        <ChatBubble key={index} message={msg} />
      ))}

      
      {loading && (
        <div className="flex justify-start">
          <div className="max-w-md w-fit p-3 rounded-2xl shadow-md chat-bubble-bot text-gray-800 self-start rounded-bl-none">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Auto-scroll anchor */}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatHistory;