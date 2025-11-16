import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
// 1. Import updateProfile from firebase/auth
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

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
      setError("Passwords do not match");
      return;
    }

    try {
      // Create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Update their profile with the full name
      await updateProfile(userCredential.user, {
        displayName: fullName
      });

      console.log("✅ Account created and profile updated!");
      
      if (onAuthSuccess) onAuthSuccess();

    } catch (err) {
      console.error("❌ Signup error:", err.message);
      // This maps common Firebase errors to friendlier messages
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email address is already in use.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        default:
          setError('Failed to create an account. Please try again.');
      }
    }
  };

  return (
    <div className="relative bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
      <h2 className="text-3xl font-semibold text-purple-700 mb-6 text-center font-poppins">
        Create an Account
      </h2>

      <form onSubmit={handleSignup} className="space-y-4">
        {/* Full Name Input */}
        <div className="relative flex items-center bg-gray-50 rounded-lg border border-gray-200 p-3">
          <User className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Email Input */}
        <div className="relative flex items-center bg-gray-50 rounded-lg border border-gray-200 p-3">
          <Mail className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Password Input */}
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
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 focus:outline-none"
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="relative flex items-center bg-gray-50 rounded-lg border border-gray-200 p-3">
          <Lock className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 focus:outline-none"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full mt-6 py-3 px-4 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-pink-500 shadow-md hover:from-purple-700 hover:to-pink-600 transition duration-300"
        >
          Signup
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="#" onClick={onSwitchToLogin} className="text-purple-600 font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default CreateAccountCard;