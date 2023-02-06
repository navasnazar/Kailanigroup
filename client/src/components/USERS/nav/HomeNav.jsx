import React from 'react'
import './nav.css'
import {AiOutlineHome, AiOutlineUser} from 'react-icons/ai'
import {RiServiceLine} from 'react-icons/ri'
import {TiMessages} from 'react-icons/ti'
import {TfiGallery} from 'react-icons/tfi'
import { useState } from 'react'
import {FiGrid} from 'react-icons/fi'




const HomeNav = () => {
  const [activeNav, setActiveNav]=useState('#')




  return (
    <nav>
      <a href="#" 
        onClick={()=>setActiveNav('#')} 
        className={activeNav === '#' ? 'active' : ''}>
          <AiOutlineHome/>
      </a>
      

      <a href="#about" 
        onClick={()=>setActiveNav('#about')} 
        className={activeNav === '#about' ? 'active' : ''}>
        <AiOutlineUser/>
      </a>


      <a href="#services"
        onClick={()=>setActiveNav('#services')} 
        className={activeNav === '#services' ? 'active' : ''}>
        <RiServiceLine/>
      </a>
      <a href="#contact"
        onClick={()=>setActiveNav('#contact')} 
        className={activeNav === '#contact' ? 'active' : ''}>
        <TiMessages/>
      </a>
      <a href='/gallery'
        onClick={()=>setActiveNav('/gallery')}
        className={activeNav === '/gallery' ? 'active' : ''}>
        <TfiGallery/>
      </a>
      <a href='/booking'
        onClick={()=>setActiveNav('/booking')}
        className={activeNav === '/booking' ? 'active' : ''}>
        <FiGrid/>
      </a>
    </nav>
  )
}

export default HomeNav