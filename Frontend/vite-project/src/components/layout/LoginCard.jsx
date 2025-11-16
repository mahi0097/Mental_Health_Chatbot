import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// 1. Added onAuthSuccess to the props
const LoginCard = ({ onSwitchToSignup, onAuthSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 2. The navigate hook is no longer needed here
  // const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      
      // 3. Call the onAuthSuccess callback instead of navigating
      onAuthSuccess(); 

    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message); // Use err.message for a cleaner error display
    }
  };

  return (
    <div className="relative bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">
      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-2 font-poppins">
        Welcome Back
      </h2>
      <p className="text-base text-purple-700 mb-8 text-center font-poppins">
        Login to your Account
      </p>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Input */}
        <div className="relative flex items-center bg-gray-50 rounded-lg border border-gray-200 p-3">
          <Mail className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Password Input with eye icon */}
        <div className="relative flex items-center bg-gray-50 rounded-lg border border-gray-200 p-3">
          <Lock className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
          />
          <button 
            type="button" 
            onClick={togglePasswordVisibility} 
            className="absolute right-3 focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Gradient Button */}
        <button 
          type="submit"
          className="w-full mt-4 py-3 px-4 rounded-xl text-white font-medium bg-gradient-to-r from-purple-600 to-pink-500 shadow-md hover:from-purple-700 hover:to-pink-600 transition duration-300"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="#" onClick={onSwitchToSignup} className="text-purple-600 font-medium hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginCard;