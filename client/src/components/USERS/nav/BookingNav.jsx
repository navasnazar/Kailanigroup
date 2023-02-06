import React from 'react'
import './nav.css'
import {Link} from 'react-router-dom'

import {AiOutlineHome, AiOutlineUser} from 'react-icons/ai'
import {RiServiceLine} from 'react-icons/ri'
import {TiMessages} from 'react-icons/ti'
import {TfiGallery} from 'react-icons/tfi'
import { useState } from 'react'
import {FiGrid} from 'react-icons/fi'

//Registration details
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Modal
} from 'antd';
// import "antd/dist/antd.css";
import { QuestionCircleOutlined } from '@ant-design/icons';
//registration details end....

const GalleryNav = () => {
  const [activeNav, setActiveNav]=useState('booking')


  return (
    <nav>
      <Link to="/" >
          <AiOutlineHome/>
      </Link>
      {/* <a href="#about" 
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
      </a> */}
      <Link to='/gallery'
        // onClick={()=>setActiveNav('/gallery')}
        className={activeNav === 'gallery' ? 'active' : ''}>
        <TfiGallery/>
      </Link>
      <a href={activeNav}
        className={activeNav === 'booking' ? 'active' : ''}>
        <FiGrid/>
      </a>
    </nav>
  )
}

export default GalleryNav