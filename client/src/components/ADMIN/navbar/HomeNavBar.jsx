import React from 'react'
import './nav.css'
import {NavLink, Link} from 'react-router-dom'
import { useState, useEffect } from 'react'


const HomeNavBar = (props) => {


  return (
    <nav>
      <Link to="/admin"
      className={props.home ? 'active' : ''}>
      Home</Link>
      
      <Link 
      className={props.booking ? 'active' : ''}
      to="/admin/booking">Booking</Link>
      
      <Link 
      className={props.services ? 'active' : ''}
      to="/admin/services">Services</Link>

      <Link to="/admin/users">Users</Link>
    </nav>
  )
}

export default HomeNavBar