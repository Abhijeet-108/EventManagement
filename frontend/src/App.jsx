import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import VendorLogin from './pages/VendorLogin'
import VendorSignupPage from './pages/vendorSignup'
import AdminLoginPage from './pages/AdminLogin'
import VendorDashboard from './pages/VendorDashboard'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ItemViewPage from './components/vendor/VendorItem.jsx'
import AddItem from './components/vendor/addItem.jsx'
import VendorList from './components/user/vendor.jsx'
import VendorItems from './components/user/vendorItems.jsx'

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
        <Route path='/vendor-items' element={<ItemViewPage />} />
        <Route path='/add-item' element={<AddItem />} />
        <Route path="/vendors/:category" element={<VendorList />} />
        <Route path="/vendor-items/:vendorId" element={<VendorItems />} />
      </Routes>
    </>
  )
}

export default App
