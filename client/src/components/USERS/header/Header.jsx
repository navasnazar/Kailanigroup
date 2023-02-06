import React from 'react'
import './header.css'
import CTA  from './CTA'
import logo from '../../../assets/Videos/logo.mp4'
import HeaderSocials from './HeaderSocials'

const Header = () => {
  return (
    <header>
      <div className="container header__container">
         {/* <h1>KAILANI</h1> */}
         <div className="logo">
            <video autoPlay muted loop src={logo} alt='logo'></video>
         </div>
         <h2 className='logo__quote'>The world is quite here!</h2>
         <CTA/>
         <HeaderSocials/>
         
         <a href="#contact" className='scroll__down'>Scroll Down</a>
      </div>
    </header>
  )
}

export default Header