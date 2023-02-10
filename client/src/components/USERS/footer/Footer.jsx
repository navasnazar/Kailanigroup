import React from 'react'
import './footer.css'
import {FaFacebookF} from 'react-icons/fa'
import {GrInstagram} from 'react-icons/gr'
import {GrTwitter} from 'react-icons/gr'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer_container'>
      <a href="#" className='footer__logo'>KAILANI</a>

      <ul className='permalinks'>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/gallery">Gallery</NavLink></li>
        <li><NavLink to="/booking">Services</NavLink></li>
      </ul>

      <div className="footer__socials">
        <a href="https://facebook.com" target='_blank'><FaFacebookF/></a>
        <a href="https://instagram.com" target='_blank'><GrInstagram/></a>
        <a href="https://twitter.com" target='_blank'><GrTwitter/></a>
      </div>

      <div className="footer__copyright">
        <small>&copy: KAILANI tourism. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer