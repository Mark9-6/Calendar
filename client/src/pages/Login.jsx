import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

function Login() {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  console.log(VITE_BACKEND_URL)
  const navigate = useNavigate();

  const googleAuth = () => {
    window.open(`${VITE_BACKEND_URL}/auth/google`, "_self");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>
        <button type="button"
          className="w-full py-3 flex items-center justify-center bg-violet-700 text-white rounded-full shadow-md hover:bg-violet-800 transition-all duration-300"
          onClick={googleAuth}
        >
          <FaGoogle className="mr-3" size={20} />
          Login with Google
        </button>
        <p
          className="mt-4 text-gray-600 cursor-pointer hover:text-violet-700 hover:font-semibold transition-all duration-300 "
          onClick={() => navigate('/signup')}
        >
          Don't have an account? <span className="underline">Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
