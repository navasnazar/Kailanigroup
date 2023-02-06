import React from 'react'
import './sidebar.css'
import {AiOutlineHome} from 'react-icons/ai'
import {RiServiceLine} from 'react-icons/ri'
import {FiGrid} from 'react-icons/fi'
import {FiUsers} from 'react-icons/fi'
import LOGO from '../../../assets/Images/logo.png'
import {NavLink, Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='main_Sidebar_Container'>
      <div>
        <div className='logo_container'>
          <img src={LOGO} alt="" />
        </div>
        <ul className='ul_container'>
          <li className='li_container'>
            <div className='sidebar_icons'><AiOutlineHome/></div>
            <Link className='sidebar_menu' to='/admin'>Home</Link>
          </li>
          <li className='li_container'>
            <div className='sidebar_icons'><RiServiceLine/></div>
            <Link className='sidebar_menu' to="/admin/services">Services</Link>
          </li>
          <li className='li_container'>
            <div className='sidebar_icons'><FiGrid/></div>
            <Link className='sidebar_menu' to="/admin/booking">Booking</Link>
          </li>
          <li className='li_container'>
            <div className='sidebar_icons'><FiUsers/></div>
            <Link className='sidebar_menu' to="/admin/users">Users</Link>
          </li>
          
        </ul>
      </div>
    </div>
  )
}

export default Sidebar