import React from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarEvents from './CalendarEvents.jsx';

function Home({ user }) {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const logout = () => {
    window.open(`${VITE_BACKEND_URL}/auth/logout`, "_self");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {user.name}!</h1>
        <img
          src={user.picture}
          alt="User profile"
          className="w-24 h-24 rounded-full mx-auto shadow-md mb-4"
        />
        <p className="text-gray-600 mb-2">
          <span className="font-bold">Email:</span> {user.email}
        </p>
       <div className='space-x-2'>
       {user && <button onClick={()=>navigate('/calendar')} className='px-6 py-2 text-white shadow-md bg-violet-700 hover:bg-violet-800 rounded-full transition-all duration-300 '>Calendar Events</button>}
        <button
          onClick={logout}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all duration-300"
        >
          Log Out
        </button>
       </div>
      </div>
    </div>
  );
}

export default Home;
