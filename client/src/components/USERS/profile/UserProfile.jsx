import React, { useEffect, useState } from 'react';
import './userProfile.css'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {axiosUserInstance} from '../../../Instance/Axios'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import moment from "moment";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {getPreBookingInvoice} from '../../../redux/userReducer'
import BookingHistory from './BookingHistory'


export default function ProfilePage() {

  const [userDet, setUserDet]=useState({})
  const [serviceData, setServiceData]=useState([])
  const [dataErr, setDataErr]=useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const userId = useSelector((state) => state.user.loginUserDetails.userID);


  useEffect(() => {
    profileCall();
    getBookedServices();
  }, [])
  
  const profileCall= async ()=>{
    const token = localStorage.getItem('userToken')
    const response = await axiosUserInstance.get(`/getUserDetails/${userId}`,
    {
      headers: {Authorization: token}
    }
    ).then((resp)=>{
      let userDetails =  resp.data.data 
      setUserDet(userDetails)
    })
  }

  const getBookedServices = async ()=>{
    const token = localStorage.getItem('userToken')
    const response = await axiosUserInstance.get(`/getServiceDetails/${userId}`,
    {
      headers: {Authorization: token}
    }
    ).then((resp)=>{
      if(resp.data.status=='done'){
        let services =  resp.data.data
          setServiceData(services.reverse())
      }
      if(resp.data.status=='err'){
        setDataErr('**No Booking Available')
      }
    })
  }

  const getInvoice = async (id)=>{
    dispatch(getPreBookingInvoice(id)) 
    navigate('/PreInvoice')
  }

  return (
    <section style={{ backgroundColor: 'black' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4 card-body">
              <MDBCardBody className="text-center align-items-end">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle image_field"
                  style={{ width: '150px', }}
                  fluid />
                <p className="text-muted text-white mb-1">{userDet.email}</p>
                <p className="text-muted mb-4"> +91 {userDet.mobile}</p>
                <div className="d-flex justify-content-center mb-2">
                  <Link to='/proceed'><MDBBtn>Goto Carts</MDBBtn></Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDet.name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userDet.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(+91) {userDet.mobile}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <div className='history_div'>
          <h5 className='heading_history'>Previous Booking History</h5>
        </div>
      </MDBContainer>
      {
        dataErr ? <p className='noservice_err'>{dataErr}</p>
        :
        <BookingHistory serviceData={serviceData} />
      }
    </section>
  );
}