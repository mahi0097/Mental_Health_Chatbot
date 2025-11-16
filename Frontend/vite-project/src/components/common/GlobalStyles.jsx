const GlobalStyles = () => (
  <style>{`
    .header-bg {
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(4px);
    }
    .header-avatar-bg {
      background-color: #e9d5ff; 
    }
    .sidebar-link:hover {
      background-color: #f3e8ff; 
    }
    .home-suggestion-btn {
      background-color: #ffffff;
    }
    .home-suggestion-btn:hover {
      background-color: #f3f4f6; 
    }
    .home-start-btn {
      background-color: #9333ea; 
    }
    .home-start-btn:hover {
      background-color: #7e22ce; 
    }
    .chat-bubble-user {
      background-color: #9333ea; 
    }
    .chat-bubble-bot {
      background-color: #ffffff;
    }
    .message-input-container-bg {
      background-color: #f9fafb; 
    }
    .mic-btn:hover {
      background-color: #e5e7eb; 
    }
    .send-btn-bg {
      background-image: linear-gradient(to bottom right, #f87171, #fb923c); /* Tailwind from-red-400 to-orange-400 */
    }
  `}</style>
);

export default GlobalStyles;