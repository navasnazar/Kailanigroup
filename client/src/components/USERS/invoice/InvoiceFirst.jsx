import React, { useEffect } from 'react'
import { Col, Divider, Row, Table } from 'antd'
import './invoiceFirst.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import moment from "moment";
import {FcPrint} from 'react-icons/fc'
import {axiosUserInstance} from '../../../Instance/Axios'

const InvoiceFirst = () => {

    const navigate = useNavigate();
    const invoiceID = useSelector((state)=>state.user.bookingID)
    const PreBookingInvoice = useSelector((state)=>state.user.preBookingInvoice)
    
    const [bookingData, setBookingData]=useState({})
    const [form, setForm]=useState({})
    const [services, setServices]=useState([])

    

    useEffect(() => {
      getInvoice()
    }, [])
    
    const getInvoice = async()=>{
        const token = localStorage.getItem('userToken')
        const response = await axiosUserInstance.post('/getInvoice',{invoiceID},
        {
            headers: {Authorization: token}
        }
        ).then((resp)=>{
            if(resp.data.status=='err'){
                navigate('/')
            }
            if(resp.data.status=='done'){
                setBookingData(resp.data.data)
                setForm(resp.data.data.form)
                setServices(resp.data.data.services)
            }
        })
    }

    const printDocument = ()=>{
        window.print()
    }


  return (

    <div className='main_container'>
        <div className='invoice_container'>
        
        <div style={{ padding: 20 }}>
        <Row>
            <Col offset={7}>
            <Divider className='heading_div'>BOOKING DETAILS</Divider>
            </Col>
            <div className='print_div'>
            <FcPrint onClick={printDocument} className='print_file'/>
            </div>
        </Row>  

        <Row gutter={24} style={{ marginTop: 32 }}>
            <Col span={7}>
            <h3>Kailani</h3>
            <div>Kerala Resort</div>
            <div>Varkala</div>
            <div>Trivandrum</div>
            <div>Ph: 9567819494</div>
            </Col>
            <Col span={15} offset={2}>
            <table>
                <tr>
                <th>Booking ID #</th>
                <td>: {bookingData._id}</td>
                </tr>
                <tr>
                <th>Booking Date</th>
                <td>: {moment(bookingData.bookingDate).format("MMMM Do YYYY")}</td>
                </tr>
                <tr>
                <th>Check_in</th>
                <td>: {moment(bookingData.check_in).format("MMMM Do YYYY")}</td>
                </tr>
                <tr>
                <th>Check_out</th>
                <td>: {moment(bookingData.check_out).format("MMMM Do YYYY")}</td>
                </tr>
                <tr>
                <th>Adults</th>
                <td>: {bookingData.adults}</td>
                </tr>
                <tr>
                <th>Child</th>
                <td>: {bookingData.child}</td>
                </tr>
                <tr>
                <th>Rooms</th>
                <td>: {bookingData.rooms}</td>
                </tr>
            </table>
            </Col>
        </Row>

        <Row style={{ marginTop: 48 }}>
            <div>Bill To: <strong>{form.name}</strong></div>
            <div>, {form.address}</div>
            <div>, {form.city}, {form.country}</div>
            <div>, <strong>+91 {form.mobile}</strong></div>
        </Row>


        <Row style={{ marginTop: 48}}>
            <Table dataSource={
                services.map((item)=>{
                    return(
                        item
                    )
                })
            }
            pagination={false}
            >
            <Table.Column title="Title" dataIndex='title' />
            <Table.Column title="Service" dataIndex='service' />
            <Table.Column title="Quantity" dataIndex='qty' />
            <Table.Column title="Unit Price" dataIndex='amount' />
            </Table>
        </Row>

        <Row style={{ marginTop: 48 }}>
            <Col span={12} offset={13}>
            <table>
                <tr>
                <th>Gross Total</th>
                <td style={{fontWeight:'bold'}}>: {bookingData.checkoutAmount}/-</td>
                </tr>
                <tr>
                <th>Payment Status</th>
                <td style={{fontStyle:'italic'}}>: {bookingData.payment_status}</td>
                </tr>
                <tr>
                <th>Booking Status</th>
                <td style={{fontStyle:'italic'}}>: {bookingData.booking_status}</td>
                </tr>
                
            </table>
            </Col>
        </Row>

        <Row style={{ marginTop: 48, textAlign: 'center' }}>
            Notes :
            <div style={{fontStyle:'italic'}}>Within 24 hours we will contact you..</div>
        </Row>

        </div>
        </div>

    </div>
  )
}

export default InvoiceFirst
