import React from 'react'
import './nav.css'
import {Link} from 'react-router-dom'
import {AiOutlineHome, AiOutlineUser} from 'react-icons/ai'
import {RiServiceLine} from 'react-icons/ri'
import {TiMessages} from 'react-icons/ti'
import {TfiGallery} from 'react-icons/tfi'
import { useState } from 'react'
import {FiGrid} from 'react-icons/fi'
import {MdPayment} from 'react-icons/md'

const PaymentNav = () => {
    const [activeNav, setActiveNav]=useState('payment')


  return (
    <nav>
      <Link to="/" >
          <AiOutlineHome/>
      </Link>

      <Link to='/gallery'>
        <TfiGallery/>
      </Link>

      <Link to='/booking'>
        <FiGrid/>
      </Link>

      <a href={activeNav}
        // onClick={()=>setActiveNav('/gallery')}
        className={activeNav === 'payment' ? 'active' : ''}>
        <MdPayment/>
      </a>

      
    </nav>
  )
}

export default PaymentNav