import React from 'react'
import {BsInstagram} from 'react-icons/bs'
import {TfiFacebook} from 'react-icons/tfi'
import './header.css'

const HeaderSocials = () => {
  return (
    <div className='header__socials'>
        <a href="https://instagram.com" target='_blank'><BsInstagram/></a> 
        <a href="https://facebook.com" target='_blank'><TfiFacebook/></a> 
    </div>
  )
}

export default HeaderSocials