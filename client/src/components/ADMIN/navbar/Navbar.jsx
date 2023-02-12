import React from 'react'
import './navbar.css'
import {BsSearch} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const handleLogout=()=>{
    localStorage.removeItem('admin')
    window.location.href ='/admin/login'
  }
  return (
    <div className='main_navbar_container'>
      <div className='dashboard_container'>
        <h2>Dashboard</h2>
      </div>
      <div className='search_container'>
        <div className='search_icon'><BsSearch/></div>
        <input placeholder='Search' className='search_input' style={{height:'10px'}} type="search" />
      </div>
      <div className='profile_container'>
        <div className='profile_items'>
          <p>Hi, Admin</p>
          <div className='profile_icon'><FiLogOut onClick={()=>handleLogout()}/></div> 
        </div>
      </div>
    </div>
  )
}

export default Navbar