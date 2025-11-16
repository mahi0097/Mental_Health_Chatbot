import React from "react";

export const ChatBubble = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`max-w-md w-fit p-3 rounded-2xl shadow-md 
      ${isUser ? "chat-bubble-user text-white self-end rounded-br-none" 
               : "chat-bubble-bot text-gray-800 self-start rounded-bl-none"}`}
    >
      <p className="text-sm leading-relaxed">{message.text}</p>

      {message.timestamp && (
        <p
          className={`mt-1 text-xs text-right 
          ${isUser ? "text-purple-200" : "text-gray-500"}`}
        >
          {message.timestamp}
        </p>
      )}
    </div>
  );
};
