import React from 'react'
import PaymentNav from '../../components/USERS/nav/PaymentNav'
import BookingDetails from '../../components/USERS/payment/BookingDetails'
import Form from '../../components/USERS/payment/Form'
import Footer from '../../components/USERS/footer/Footer'
import { useEffect, useState } from 'react';
import {axiosUserInstance} from '../../Instance/Axios'
import { Navigate } from 'react-router-dom'


const Payment = () => {


  useEffect(() => {
    getUserCart()
   }, [])
   
  const [proceedErr, setProceedErr]=useState(true)
    
    const getUserCart = async()=>{
      const token = localStorage.getItem('userToken')
          const response = await axiosUserInstance.get('/CartFind',
          {
              headers: {Authorization: token}
          }
          ).then((resp)=>{
              if(resp.data.status=='done'){
                  setProceedErr(true)
              }
              if(resp.data.status=='err'){
                setProceedErr(false)
              }
          })
    }
  return (
    <>
    {
      proceedErr ?
      <>
        <PaymentNav/>
        <Form/>
        <BookingDetails/>
        <Footer/>
      </>
        :
        <Navigate to='/booking'/>
    }
        
    </>
  )
}

export default Payment