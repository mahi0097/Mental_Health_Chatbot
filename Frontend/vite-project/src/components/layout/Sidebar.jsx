import './header.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; 
import { signOut } from "firebase/auth";

const Sidebar = ({ isOpen, onClose, onNewChat }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); 
      navigate("/login");  
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const startNewChat = () => {
    setMessages([]); // clear chat history
    onNewChat();     // call parent function if needed
    onClose();       // close sidebar
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 z-30"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-white w-64 shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b mt-[45px]">
          <h2 className="text-xl font-bold text-purple-700">Menu</h2>
        </div>

        {/* Sidebar Links */}
        <ul className="mt-5 space-y-2 px-5">
          {/* ✅ New Chat */}
          <li>
            <button
              onClick={startNewChat}
              className="flex items-center space-x-2 w-full text-left p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>New Chat</span>
            </button>
          </li>

          {/* ✅ Logout */}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full text-left p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
