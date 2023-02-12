import React from 'react'
import AdminBookingDetails from '../../components/ADMIN/booking/AdminBookingDetails'
import Sidebar from '../../components/ADMIN/sidebar/Sidebar'
import './booking.css'

const Booking = () => {


  return (
    <>
      <div className='main_booking_container'>
        <Sidebar booking/>
        <AdminBookingDetails/>
    </div>
    </>
  )
}

export default Booking
