import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Cart from './pages/Cart';
import History from './pages/History';
import AuthPage from './pages/AuthPage'; 

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </>
  )
}

export default App
