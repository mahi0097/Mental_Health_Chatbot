import React from "react";
import MenuIcon from "../common/MenuIcon";
import './header.css'

const Header = ({ onMenuClick, onAuthClick, onLogout, isLoggedIn }) => {
  return (
    <header className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0 bg-white relative">
      {/* Menu Button */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-md hover:bg-purple-500"
      >
        <MenuIcon />
      </button>

      {/* Title always centered */}
     <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg md:text-xl font-semibold bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">
  MindEase AI
</h1>

      {/* Auth Buttons */}
      <div className="ml-auto flex space-x-2">
  {isLoggedIn ? (
    <button
      onClick={onLogout}
      className="px-4 py-2 text-sm font-semibold rounded-full shadow-md logout-btn"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={onAuthClick}
      className="px-4 py-2 text-sm font-semibold rounded-full shadow-md login-btn"
    >
      Login / Sign Up
    </button>
  )}
</div>
    </header>
  );
};

export default Header;
