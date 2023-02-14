import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import HomePage from './Pages/user/Home';
import Gallery from './Pages/user/Gallery';
import Booking from './Pages/user/Booking';
import AdminLogin from './Pages/admin/Login'
import AdminHome from './Pages/admin/Home'
import ResetPassword from './components/ADMIN/login/ResetPassword'
import AdminUsers from './Pages/admin/Users'
import AdminBooking from './Pages/admin/Booking'
import AdminServices from './Pages/admin/Services'
import Payment from './Pages/user/Payment'
import UserProfile from './Pages/user/Profile'
import FinaleInvoice from './Pages/user/FinalInvoice'
import PreBookingInv from './Pages/user/PreBookingInv'
import PreBookingInvAdmin from './Pages/admin/PreBookingInvAdmin'
import Err404 from './Pages/Err'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const App = () => {

  const user = useSelector((state)=>state.user.loginUserDetails)
  const admin = localStorage.getItem('admin')

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            {/* <Route exact path="/login" element={<Register/>} /> */}
            <Route exact path="/gallery" element={<Gallery/>} />
            <Route path="/booking" element={user ? <Booking/> : <Navigate to='/'/>} />
            <Route path="/proceed" element={user ? <Payment/> : <Navigate to='/'/>} />
            <Route path="/profile" element={user ? <UserProfile/> : <Navigate to='/'/>} />
            <Route path="/invoice" element={user ? <FinaleInvoice/> : <Navigate to='/'/>} />
            <Route path="/PreInvoice" element={user ? <PreBookingInv/> : <Navigate to='/'/>} />
            <Route exact path="/*" element={<Err404/>} />
    
            <Route exact path="/admin/login" element={admin? <AdminHome/> : <AdminLogin/>} />
            <Route exact path="/admin" element={admin ? <AdminHome/> : <AdminLogin/>} />
            <Route exact path="/admin/resetpass/:token" element={<ResetPassword/>} />
            <Route exact path="/admin/users" element={admin ? <AdminUsers/> : <AdminLogin/>} />
            <Route exact path="/admin/booking" element={admin ? <AdminBooking/> : <AdminLogin/>} />
            <Route exact path="/admin/services" element={admin ? <AdminServices/> : <AdminLogin/>} />
            <Route exact path="/admin/PreInvoice" element={admin ? <PreBookingInvAdmin/> : <AdminLogin/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

