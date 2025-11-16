import React, { useState } from "react";
import GlobalStyles from "./components/common/GlobalStyles.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import Header from "./components/layout/Header.jsx";
import Home from "./components/chat/Home.jsx";
import ChatHistory from "./components/chat/ChatHistory.jsx";
import MessageInput from "./components/chat/MessageInput.jsx";
import LoginCard from "./components/layout/LoginCard.jsx";
import CreateAccountCard from "./components/layout/CreateAccountCard.jsx";
import { sendMessageToBot } from "./api/chatApi"; // Make sure this path is correct


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);
  const [authView, setAuthView] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Chat functions
  const handleStartConversation = async () => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    
    try {
      // Call API with a greeting message
      const response = await sendMessageToBot("Hello, I need someone to talk to.");
      
      const initialBotMessage = {
        id: 1,
        text: response.data.reply, // Use actual API response
        sender: "bot",
        timestamp: timestamp
      };
      setMessages([initialBotMessage]);
      setIsChatActive(true);
    } catch (error) {
      console.error("Error starting conversation:", error);
      // Fallback message
      const initialBotMessage = {
        id: 1,
        text: "Hello! I'm here to listen and help. What's on your mind today?",
        sender: "bot",
        timestamp: timestamp
      };
      setMessages([initialBotMessage]);
      setIsChatActive(true);
    }
  };

  const handleSendMessage = async (text) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    
    // Add user message immediately
    const newUserMessage = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: timestamp
    };
    setMessages((prev) => [...prev, newUserMessage]);
    
    setLoading(true);

    try {
      // Call your actual backend API
      const response = await sendMessageToBot(text);
      
      const botTimestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      
      // Use the actual response from your RAG backend
      const botResponse = {
        id: Date.now() + 1,
        text: response.data.reply, // Use the actual API response
        sender: "bot",
        timestamp: botTimestamp
      };
      setMessages((prev) => [...prev, botResponse]);
      
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      
      const errorTimestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      
      // Show error message
      const errorResponse = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting. Please try again.",
        sender: "bot",
        timestamp: errorTimestamp
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = async (text) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    
    // Add user suggestion message
    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: timestamp
    };
    
    try {
      // Call API with the suggestion text
      const response = await sendMessageToBot(text);
      
      const botMessage = {
        id: Date.now() + 1,
        text: response.data.reply, // Use actual API response
        sender: "bot",
        timestamp: timestamp
      };
      
      setMessages([userMessage, botMessage]);
      setIsChatActive(true);
    } catch (error) {
      console.error("Error with suggestion:", error);
      // Fallback response
      const botMessage = {
        id: Date.now() + 1,
        text: "I understand you're mentioning: " + text + ". Can you tell me more about how you're feeling?",
        sender: "bot",
        timestamp: timestamp
      };
      setMessages([userMessage, botMessage]);
      setIsChatActive(true);
    }
  };
  
  const handleNewChat = () => {
    setMessages([]);
    setIsChatActive(false);
    setSidebarOpen(false);
  };

  // Auth functions
  const handleAuthClick = () => setAuthView("login");
  const handleCloseAuth = () => setAuthView(null);
  const handleSwitchAuthView = (view) => setAuthView(view);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsChatActive(false);
    setMessages([]);
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setAuthView(null);
    setIsChatActive(false);
  };

  const renderAuthCard = () => {
    if (authView === "login") {
      return (
        <LoginCard
          onSwitchToSignup={() => handleSwitchAuthView("signup")}
          onAuthSuccess={handleAuthSuccess}
        />
      );
    }
    if (authView === "signup") {
      return (
        <CreateAccountCard
          onSwitchToLogin={() => handleSwitchAuthView("login")}
          onAuthSuccess={handleAuthSuccess}
        />
      );
    }
    return null;
  };

  return (
    <>
      <GlobalStyles />
      <div className="flex h-screen w-screen bg-gradient-to-br from-purple-100 via-white to-orange-100 font-sans overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          onNewChat={handleNewChat} 
        />

        {/* Main content */}
        <div className="flex-1 flex flex-col max-h-screen transition-all duration-300 ease-in-out">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            onAuthClick={handleAuthClick}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />

          <main className="flex-1 flex flex-col items-center justify-center text-center overflow-y-auto bg-transparent p-4">
            {!isLoggedIn ? (
              <h2 className="text-xl text-gray-700">
                👋 Welcome! Please{" "}
                <button
                  className="text-purple-600 font-semibold underline"
                  onClick={handleAuthClick}
                >
                  login
                </button>{" "}
                to start chatting.
              </h2>
            ) : !isChatActive ? (
              <Home
                onStartConversation={handleStartConversation}
                onSuggestionClick={handleSuggestionClick}
              />
            ) : (
              <ChatHistory messages={messages} loading={loading} />
            )}
          </main>

          {/* Message Input - Fixed prop name to onSend */}
          {isLoggedIn && isChatActive && (
            <MessageInput onSend={handleSendMessage} />
          )}
        </div>
      </div>

      {/* Authentication modal */}
      {authView && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center z-50 p-4">
          <div className="relative">
            <button
              onClick={handleCloseAuth}
              className="absolute -top-3 -right-3 bg-white text-gray-800 rounded-full h-8 w-8 flex items-center justify-center text-xl font-bold shadow-lg hover:bg-gray-100 z-50"
            >
              &times;
            </button>
            {renderAuthCard()}
          </div>
        </div>
      )}
    </>
  );
}