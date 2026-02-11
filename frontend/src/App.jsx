import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/userLogin'
import VendorLogin from './pages/VendorLogin'
import VendorSignupPage from './pages/vendorSignup'
import AdminLoginPage from './pages/AdminLogin'
import VendorDashboard from './pages/VendorDashboard'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-signup' element={<UserSignup />} />
        <Route path='/vendor-login' element={<VendorLogin />} />
        <Route path='/vendor-signup' element={<VendorSignupPage />} />
        <Route path='/admin-login' element={<AdminLoginPage />} />
        <Route path='/vendor-dashboard' element={<VendorDashboard />} />
        <Route path='/user-dashboard' element={<UserDashboard />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
      </Routes>
    </>
  )
}

export default App
