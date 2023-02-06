import React from 'react'
import './footer.css'
import {FaFacebookF} from 'react-icons/fa'
import {GrInstagram} from 'react-icons/gr'
import {GrTwitter} from 'react-icons/gr'

const Footer = () => {
  return (
    <footer>
      <a href="#" className='footer__logo'>KAILANI</a>

      <ul className='permalinks'>
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#blogs">Blogs</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact Us</a></li>
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