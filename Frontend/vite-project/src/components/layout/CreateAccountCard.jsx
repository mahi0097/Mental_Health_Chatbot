import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { register } from "../../api/authApi"; 

const CreateAccountCard = ({ onSwitchToLogin, onAuthSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await register({ fullName, email, password });

      console.log("Account created:", response.data.message);

      onAuthSuccess(); // redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">

      <h2 className="text-3xl text-purple-700 mb-6 text-center font-poppins">
        Create an Account
      </h2>

      <form onSubmit={handleSignup} className="space-y-4">

        {/* Full Name */}
        <div className="relative flex items-center bg-gray-50 rounded-lg border p-3">
          <User className="h-5 w-5 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Full Name" 
            className="flex-1 bg-transparent focus:outline-none"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

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
          <button type="button" className="absolute right-3" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative flex items-center bg-gray-50 rounded-lg border p-3">
          <Lock className="h-5 w-5 text-gray-400 mr-2" />
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Confirm Password"
            className="flex-1 bg-transparent focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
          <button type="button" className="absolute right-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-500"
        >
          Signup
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account?
        <Link to="#" onClick={onSwitchToLogin} className="text-purple-600 ml-1">
          Login
        </Link>
      </p>

    </div>
  );
};

export default CreateAccountCard;
