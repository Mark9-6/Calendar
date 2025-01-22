import React, { useEffect, useState } from 'react';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import CalendarEvents from './pages/CalendarEvents.jsx';

function App() {
  const [user, setUser] = useState(null);
  
  
  console.log(import.meta.env.VITE_BACKEND_URL);
  console.log(import.meta.env.VITE_BACKEND_URL);
  console.log(import.meta.env.VITE_BACKEND_URL);
  console.log(import.meta.env.VITE_BACKEND_URL);
  const getUser = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/auth/login/success`;
 

      const { data } = await axios.get(url, { withCredentials: true });

      setUser(data.user._json); // Store the user data

    } catch (error) {
      console.log("error:" + error); // Log any error that occurs during the API call
    }
  };

  useEffect(() => {
    getUser();  
  }, []);  

  // console.log(user);  

  return (
    <div className='min-h-screen  flex flex-col'>
      <Routes>
        <Route path='/' element={user ? <Home user={user} /> : <Navigate to={'/login'} />} />
        <Route path='/calendar' element= {<CalendarEvents user={user}/>}  />
        <Route path='/login' element={user ? <Navigate to={'/'} /> : <Login />} />
        <Route path='/signup' element={user ? <Navigate to={'/'} /> : <Signup />} />
      </Routes>
    </div>
  );
}

export default App;
