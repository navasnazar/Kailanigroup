import React, { useEffect, useState } from 'react'
import Header from '../../components/USERS/header/Header'
import About from '../../components/USERS/about/About'
import Services from '../../components/USERS/services/Services'
import Testimonials from '../../components/USERS/testimonials/Testimonials'
import Contact from '../../components/USERS/contact/Contact'
import HomeNav from '../../components/USERS/nav/HomeNavWithRigister'
import Footer from '../../components/USERS/footer/Footer'
import Logout from '../../components/USERS/logout/Logout'
import { FaBullseye } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Home = () => {
  const [reload, setReload]=useState(FaBullseye)

  const user = useSelector((state)=>state.user.loginUserDetails)
  const token = localStorage.getItem('userToken')


  useEffect(() => {
    if(token){
      setReload(true)
    }else{
      bookingErr()
    }
  }, [reload])

  const bookingErr = ()=>{
    toast.error('Please Login First', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }

  
  return (
    <>  
      {reload? <Logout /> : ''}
      <ToastContainer/>
      <Header/>
      <HomeNav/>
      <About/>
      <Services/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default Home