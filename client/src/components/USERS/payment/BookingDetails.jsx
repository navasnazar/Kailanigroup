import React from "react";
import './bookingDetails.css'
import { useState, useEffect } from 'react'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";  
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import moment from "moment";
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {getBookingID} from '../../../redux/userReducer'
import {axiosUserInstance} from '../../../Instance/Axios'
import { Navigate } from 'react-router-dom'
import emailjs from 'emailjs-com'



export default function ProductCards() {

    const dispatch = useDispatch();

    let finalAmount = 0;

    const user = useSelector((state)=>state.user.loginUserDetails)

    const form = useRef();

    const navigate = useNavigate();

    const [data, setData]=useState([]);
    const [dataEmpty, setDataEmpty]=useState('')
    const [render, setRender]=useState()
    const [cartData, setCartData]=useState({})
    const [checkIn, setCheckIn]=useState()
    const [checkOut, setCheckOut]=useState()
    const [formErr, setFormErr]=useState('')
    const [serviceData, setServiceData]=useState(true)

    useEffect(()=>{
        getServices();
    },[render])


    const getServices = ()=>{
        return new Promise(async(resolve, reject)=>{
            const token = localStorage.getItem('userToken')
            const response = await axiosUserInstance.post('/carts', user, 
            {
                headers: {Authorization: token}
            }
            ).then((data)=>{
                if(data.data.status=='done'){
                    let userCartsFullDetails = data.data.data
                    let serviceData = data.data.services
                    if(!serviceData){
                        setServiceData(false)
                        let x = Math.random() * 100;
                        setRender(x)
                    }
                    setData(serviceData)
                    setCartData(userCartsFullDetails)
                    resolve()
                }
                if(data.status=='err'){
                    setDataEmpty(data.data)
                    resolve()
                }
            }).catch((e)=>{
                console.log(e);
            })
        })
    }

    const qtyDecrementFun = async(data)=>{
        const token = localStorage.getItem('userToken')
        const response = await axiosUserInstance.post('/cartDecQty', {data, user}, 
        {
            headers: {Authorization: token}
        }
        ).then((resp)=>{
            let x = Math.random() * 100;
            setRender(x)
        })
    }
    const qtyIncrementFun = async(data)=>{
        const token = localStorage.getItem('userToken')
        const response = await axiosUserInstance.post('/cartIncQty', {data, user}, 
        {
            headers: {Authorization: token}
        }
        ).then((resp)=>{
            let x = Math.random() * 100;
            setRender(x)
        })
    }


    const handleSubmitForm =async (e)=>{
        e.preventDefault();
        const token = localStorage.getItem('userToken')
        const response = await axiosUserInstance.post('/confirmBooking', {cartData, user, finalAmount},
        {
            headers: {Authorization: token}
        }
        ).then((resp)=>{
            if(resp.data.status=='err'){
                setFormErr(resp.data.data)
            }
            if(resp.data.status=='done'){
                emailjs.sendForm('service_rwy3xu9', 'template_itd4q1n', form.current, 'XBJcDC5HcRaKtdXxM')
                dispatch(getBookingID(resp.data.data))
                setFormErr('')
                navigate('/invoice')
            }
        })
    }
    
    
        return (
            <>
            {
                serviceData 
                ?

                <section className="h-100" style={{ backgroundColor: "transparent" }}>
                    <h5>Selected Details</h5>
                    <h2>Carts</h2>
                    <form ref={form} onSubmit={handleSubmitForm}>
                
                    <MDBContainer className="py-5 h-100">
                                    <MDBRow  className="justify-content-center align-items-center h-100">
                                    <MDBCol  md="12">
                                    <p className="empty_cart">{dataEmpty}</p>
                                    <div className="booking_details_show">
                                        <div className="booking_details_div">
                                            <p className="booking_header">Check_in :</p>
                                            <p className="booking_content">{" "}{moment(cartData.check_in).format("MMMM Do YYYY")}{" "}</p>
                                        </div>

                                        <div className="booking_details_div">
                                            <p className="booking_header">Check_out :</p>
                                            <p className="booking_content">{" "}{moment(cartData.check_out).format("MMMM Do YYYY")}{" "}</p>
                                        </div>

                                        <div className="booking_details_div">
                                            <p className="booking_header">Adults :</p>
                                            <p className="booking_content">{cartData.adults}</p>
                                        </div>

                                        <div className="booking_details_div">
                                            <p className="booking_header">Child :</p>
                                            <p className="booking_content">{cartData.child}</p>
                                        </div>

                                        <div className="booking_details_div">
                                            <p className="booking_header">Rooms :</p>
                                            <p className="booking_content">{cartData.rooms}</p>
                                        </div>
                                    </div>
                                    
                                    {
                                    
                                        data.map((item)=>{
                                            let total = item.amount * item.qty
                                            finalAmount+=total
                                            return(
                                                
                                                <MDBCard style={{ backgroundColor: "transparent" }}  className="rounded-3 mb-6">
                                                <MDBCardBody className="p-4">
                                                    <MDBRow className="justify-content-between align-items-center">
                                                    <MDBCol md="2" lg="2" xl="2">
                                                        <MDBCardImage className="rounded-3" fluid
                                                        src={item.img1_url}
                                                        alt="Cotton T-shirt" />
                                                    </MDBCol>
                                                    <MDBCol md="3" lg="3" xl="5">
                                                        <p className="lead fw-normal mb-2">{item.service}</p>
                                                        <p>
                                                        <span className="text-muted">{item.title}</span>
                                                        {/* <span className="text-muted">Color: </span>Grey */}
                                                        </p>
                                                    </MDBCol>

                                                    <MDBCol md="3" lg="3" xl="2"
                                                        className="d-flex align-items-center justify-content-around">
                                                                
                                                        <ArrowBackRoundedIcon onClick={()=>qtyDecrementFun(item.serviceID)} className="qtyIncrease_Button" />
                                                        
                                                            <p className="qtyShow">{item.qty}</p>
                                                        
                                                        <ArrowForwardRoundedIcon onClick={()=>qtyIncrementFun(item.serviceID)} className="qtyIncrease_Button"/>
                                                    
                                                    </MDBCol>
                
                                                    <MDBCol md="3" lg="2" xl="2" className="offset-lg-1 " >
                                                        <MDBTypography style={{fontStyle: 'italic'}} tag="h4" className="mb-0">
                                                        ₹ {total}
                                                        </MDBTypography>
                                                    </MDBCol>
                                                    
                                                    </MDBRow>
                                                </MDBCardBody>
                                                </MDBCard>        
                                            )
                                        })
                                    }
                                        <h2 className="FinalAmount">
                                            Total Amount : ₹ {finalAmount}/-
                                        </h2>
                                        <p>{formErr}</p>
                                        {
                                            finalAmount>0 ?
                                            <button type="submit" className="apply_button btn btn-primary mt-5">
                                                Register Your Booking
                                            </button>
                                            :
                                            ''
                                        }
                                        
                                    </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                                </form>
                </section>
                :
                <Navigate to='/booking'/>

            }
            </>
            
        
    );
}