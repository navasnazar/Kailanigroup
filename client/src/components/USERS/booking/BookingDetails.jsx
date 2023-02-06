import React from 'react'
import './booking.css'
import BookingHome from './BookingHome'
import BookingAvailability from './BookingAvailability'
import BookingOurSpecials from './BookingOurSpecials'

const BookingDetails = () => {
  return (
    <div>
       <BookingHome/>
       <BookingAvailability/>
       <BookingOurSpecials/>
    </div>
  )
}

export default BookingDetails