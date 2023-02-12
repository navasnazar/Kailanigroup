import React, { useEffect, useState } from 'react'
import './homeButton.css'
import {axiosAdminInstance} from '../../../Instance/Axios'


const HomeBottom = () => {

  const [bookingData, setBookingData]=useState([])
  const [dataErr, setDataErr]=useState('')
  const [userData, setUserData]=useState([])



  useEffect(() => {
    getAllBooking();
    getAllUsers();
  }, [])

  const getAllBooking = async()=>{
    const token = localStorage.getItem('admin')
    const response = await axiosAdminInstance.get('/getAllBooking',
    {
      headers: {Authorization: token}
    }
    ).then((data)=>{
      if(data.data.status=='done'){
        setBookingData(data.data.data)
      }
      if(data.data.status=='err'){
        setDataErr(data.data.msg)
      }
    })
  }

  const getAllUsers = async()=>{
    const token = localStorage.getItem('admin')
    const response = await axiosAdminInstance.get('/getUsers',
    {
    headers: {Authorization: token}
    }
    ).then((response)=>{
        if(response.data.status=='done'){
            setUserData(response.data.data)
        }
        if(response.data.status=='err'){
            let msg = response.data.msg
        }
    })
  }


  const newBooking = bookingData.filter((item)=>{
    if(!item.conform_booking){
        return item
    }
  })
  const AppBooking = bookingData.filter((item)=>{
    if(item.conform_booking && !item.conform_check_in){
        return item
    }
  })
  const CheckInBooking = bookingData.filter((item)=>{
    if(item.conform_check_in && !item.conform_check_out){
        return item
    }
  })
  const CheckOutBooking = bookingData.filter((item)=>{
    if(item.conform_check_out){
        return item
    }
  })

  
  
  console.log('previous: ', )


  return (
    <>
        <div className='container_report'>
            <div className='report_container'>
              <div className='report_container1'>
                <p className='report_content'>New Booking  :</p>
                <h4 className='report_content1'>{newBooking.length}</h4>
              </div>
              <div className='report_container1'>
                <p className='report_content'>Approved Booking  : </p>
                <h4 className='report_content1'>{AppBooking.length}</h4>
              </div>
              <div className='report_container1'>
                <p className='report_content'>Check_in List  : </p>
                <h4 className='report_content1'>{CheckInBooking.length}</h4>
              </div>
              <div className='report_container1'>
                <p className='report_content'>Check_out List  : </p>
                <h4 className='report_content1'>{CheckOutBooking.length}</h4>
              </div>
              <div className='report_container1'>
                <p className='report_content'>Our total Services  : </p>
                <h4 className='report_content1'>{bookingData.length}</h4>
              </div>
              <div className='report_container1'>
                <p className='report_content'>Our Registered Clients  : </p>
                <h4 className='report_content1'>{userData.length}</h4>
              </div>
            </div>
        </div>
    </>
  )
}

export default HomeBottom
