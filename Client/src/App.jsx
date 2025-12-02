import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home'; // create Home.jsx if not alread
import ForgotPassword from './Pages/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;