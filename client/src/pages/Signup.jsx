import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Signup() {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const googleAuth = () => {
    window.open(`${VITE_BACKEND_URL}/auth/google/callback`, "_self");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign Up</h1>
        <p className="text-gray-600 mb-6">
          Create an account to get started!
        </p>
        <button
          className="w-full py-3 flex items-center justify-center bg-violet-700 text-white rounded-full shadow-md hover:bg-violet-800 transition-all duration-300"
          onClick={googleAuth}
        >
          <FaGoogle className="mr-3" size={20} />
          Sign up with Google
        </button>
        <p
          className="mt-4 text-gray-600 cursor-pointer hover:text-violet-700 hover:font-semibold transition-all duration-300"
          onClick={() => navigate('/login')}
        >
          Already have an account? <span className="underline">Log in</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
