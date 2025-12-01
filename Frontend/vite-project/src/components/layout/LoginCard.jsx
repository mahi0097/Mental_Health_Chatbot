import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { loginUser } from "../../api/authApi";
const LoginCard = ({ onSwitchToSignup, onAuthSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser({ email, password });

      // store token
      localStorage.setItem("token", response.data.token);

      console.log("Login successful");
      onAuthSuccess(); // call parent function
    } catch (err) {
      console.error("Login error:", err.response?.data?.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-xl max-w-md w-full border border-gray-100">

      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-2 font-poppins">
        Welcome Back
      </h2>

      <form onSubmit={handleLogin} className="space-y-4">
        
        {/* Email */}
        <div className="relative flex items-center bg-gray-50 rounded-lg border p-3">
          <Mail className="h-5 w-5 text-gray-400 mr-2" />
          <input 
            type="email" 
            placeholder="Email" 
            className="flex-1 bg-transparent focus:outline-none" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        {/* Password */}
        <div className="relative flex items-center bg-gray-50 rounded-lg border p-3">
          <Lock className="h-5 w-5 text-gray-400 mr-2" />
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password"
            className="flex-1 bg-transparent focus:outline-none" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="button" className="absolute right-3" onClick={togglePasswordVisibility}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <button 
          type="submit"
          className="w-full mt-4 py-3 rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-500"
        >
          Login
        </button>
      </form>

      <p className="text-center mt-4">
        Don't have an account?
        <Link to="#" onClick={onSwitchToSignup} className="text-purple-600 ml-1">
          Sign Up
        </Link>
      </p>

    </div>
  );
};

export default LoginCard;
