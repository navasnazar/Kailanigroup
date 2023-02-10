import React from 'react'
import { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar'
import './adminBookingDetails.css'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {axiosAdminInstance} from '../../../Instance/Axios'
import moment from "moment";
import { Switch, Space } from 'antd';
import {FaFileInvoice} from 'react-icons/fa'
import {useDispatch} from 'react-redux'
import {getPreBookingInvoiceAdmin} from '../../../redux/adminReducer'
import { useNavigate } from 'react-router-dom'
import {AiFillDelete} from 'react-icons/ai'
import { Popconfirm } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import NewBookingDetails from './NewBooking'
import AppBookingDetails from './AppBooking'
import CheckInBooking from './CheckInBooking'
import CheckOutBooking from './CheckOutBooking'
import { Menu, Dropdown, Button } from 'antd';
import {ImCross} from 'react-icons/im'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const AdminBookingDetails = () => {

  const [bookingData, setBookingData]=useState([])
  const [servicesData, setServicesData]=useState([])
  const [dataErr, setDataErr]=useState('')
  const [render, setRender]=useState()
  const [allBookingPage, setAllBookingPage]=useState(true)
  const [newBookingPage, setNewBookingPage]=useState(false)
  const [appBookingPage, setAppBookingPage]=useState(false)
  const [checkInPage, setCheckInPage]=useState(false)
  const [checkOutPage, setCheckOutPage]=useState(false)
  const [crossBtn, setCrossBtn]=useState(false)


  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getAllBooking();
    
  }, [render])

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

  const handleInvoice = (id)=>{
    dispatch(getPreBookingInvoiceAdmin(id)) 
    navigate('/admin/PreInvoice')
  }

  const handleButtonChange = async(id)=>{
    const token = localStorage.getItem('admin')
    const response = await axiosAdminInstance.post('/statusChange', {id},
    {
      headers: {Authorization: token}
    }
    ).then((data)=>{
      if(data.data.status=='done'){
        setTimeout(() => {
          let x = Math.random() * 100;
          setRender(x)
        }, 500);
      }
    })
  }

  const handleCheckIn = async (id)=>{
    const token = localStorage.getItem('admin')
    const response = await axiosAdminInstance.post('/CheckInChange', {id},
    {
      headers: {Authorization: token}
    }
    ).then((data)=>{
      if(data.data.status=='done'){
        setTimeout(() => {
          let x = Math.random() * 100;
          setRender(x)
        }, 500);
      }
    })
  }

  const handleCheckOut = async(id)=>{
    const token = localStorage.getItem('admin')
    const response = await axiosAdminInstance.post('/CheckOutChange', {id},
    {
      headers: {Authorization: token}
    }
    ).then((data)=>{
      if(data.data.status=='done'){
        setTimeout(() => {
          let x = Math.random() * 100;
          setRender(x)
        }, 500);
      }
    })
  }

  const hanldeBookingDelete = async(id)=>{
    const token = localStorage.getItem('admin')
      const response = await axiosAdminInstance.post('/bookingDelete', {id},
      {
        headers: {Authorization: token}
      }
      ).then((data)=>{
        if(data.data.status=='done'){
          let x = Math.random() * 100;
          setRender(x)
        }
        if(data.data.status=='err'){
          let x = Math.random() * 100;
          setRender(x)
          toast.error('This is Approved Booking', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
  }


  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {moment(row.bookingData).format("MMMM Do YYYY")}
          </TableCell>
          <TableCell align="left">{row.form.mobile}</TableCell>
          <TableCell align="left">{moment(row.check_in).format("MMMM Do YYYY")}</TableCell>
          <TableCell align="left">{moment(row.check_out).format("MMMM Do YYYY")}</TableCell>
          <TableCell align="left">
                <Space className='switch_button' direction="vertical">
                  {
                    row.conform_check_in ? 
                      <Switch disabled
                      checkedChildren="Confirmed" unCheckedChildren="Pending"
                      defaultChecked />
                    :
                    row.booking_status=='Pending' ? 
                        <Switch onChange={()=>handleButtonChange(row._id)} 
                            checkedChildren="Confirmed" unCheckedChildren="Pending"
                            defaultunChecked /> :
                        <Switch onChange={()=>handleButtonChange(row._id)} 
                            checkedChildren="Confirmed" unCheckedChildren="Pending"
                            defaultChecked />
                  }
                </Space>
                <Space className='switch_button' direction="vertical">
                  {
                    row.conform_booking ?

                      row.conform_check_out ?
                        <Switch disabled 
                          checkedChildren="Checked In" 
                          unCheckedChildren="Pending" defaultChecked />

                        : 
                        row.conform_check_in ?
                          <Switch onChange={()=>handleCheckIn(row._id)}
                            checkedChildren="Checked In" 
                            unCheckedChildren="Pending" defaultChecked />
                          :
                          <Switch onChange={()=>handleCheckIn(row._id)} 
                            checkedChildren="Checked In" 
                            unCheckedChildren="Pending" defaultunChecked />
                    
                    :
                    <Switch disabled 
                      checkedChildren="Checked In" 
                      unCheckedChildren="Pending" defaultunChecked />
                  }
                </Space>
                <Space className='switch_button' direction="vertical">
                {
                    row.conform_check_in ?
                    
                     row.conform_check_out ?
                      <Switch onChange={()=>handleCheckOut(row._id)}
                        checkedChildren="Checked Out" 
                        unCheckedChildren="Pending" defaultChecked />
                      :
                      <Switch onChange={()=>handleCheckOut(row._id)} 
                        checkedChildren="Checked Out" 
                        unCheckedChildren="Pending" defaultunChecked />
                    
                    :
                    <Switch disabled 
                      checkedChildren="Checked In" 
                      unCheckedChildren="Pending" defaultunChecked />
                  }
                </Space>
          </TableCell>
          <TableCell align="left" >
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                okText="Yes"
                cancelText="No"
                onConfirm={()=>hanldeBookingDelete(row._id)}
              >
              <AiFillDelete className='delete_icon'/>
              </Popconfirm>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Booking ID : {row._id} / {row.userMail} / Final Amount : ₹ {row.checkoutAmount}/-
                  <FaFileInvoice onClick={()=>handleInvoice(row._id)} className='invoice_icon'/>
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{fontWeight: 'bold'}}>Title</TableCell>
                      <TableCell style={{fontWeight: 'bold'}}>Service</TableCell>
                      <TableCell style={{fontWeight: 'bold'}} align="right">Amount</TableCell>
                      <TableCell style={{fontWeight: 'bold'}} align="right">Quantity</TableCell>
                      <TableCell style={{fontWeight: 'bold'}} align="right">Total price (₹)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.services.map((historyRow) => (
                      <TableRow key={historyRow._id}>
                        <TableCell component="th" scope="row">
                          {historyRow.title}
                        </TableCell>
                        <TableCell>{historyRow.service}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">{historyRow.qty}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * historyRow.qty)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
     
    );
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" onClick={()=>handleDropdown()} rel="noopener noreferrer" >New Booking</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" onClick={()=>handleAppBook()} rel="noopener noreferrer">Approved Booking</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" onClick={()=>handleCheckInBook()} rel="noopener noreferrer">Checked In</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" onClick={()=>handleCheckOutBook()} rel="noopener noreferrer">Checked Out</a>
      </Menu.Item>
    </Menu>
  );

  const FullDetails = ()=>{
    return(
      <>
      <p>{dataErr}</p>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ToastContainer/>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{fontWeight: 'bold'}} align="left">Booking Date</TableCell>
              <TableCell style={{fontWeight: 'bold'}} align="left">Mobile Number</TableCell>
              <TableCell style={{fontWeight: 'bold'}} align="left">Chech_In</TableCell>
              <TableCell style={{fontWeight: 'bold'}} align="left">Check_Out</TableCell>
              <TableCell style={{fontWeight: 'bold'}} align="center">Action</TableCell>
              <TableCell style={{fontWeight: 'bold'}} align="center">Cancel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <Row key={row._id} row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>

      
      </>
    )
  }
  
  const rows = bookingData.reverse();

  const handleDropdown = ()=>{
    setAllBookingPage(false)
    setNewBookingPage(true)
    setAppBookingPage(false)
    setCheckInPage(false)
    setCheckOutPage(false)
    setCrossBtn(true)
  }
  const handleAppBook = ()=>{
    setAllBookingPage(false)
    setNewBookingPage(false)
    setAppBookingPage(true)
    setCheckInPage(false)
    setCheckOutPage(false)
    setCrossBtn(true)
  }
  const handleCheckInBook = ()=>{
    setAllBookingPage(false)
    setNewBookingPage(false)
    setAppBookingPage(false)
    setCheckInPage(true)
    setCheckOutPage(false)
    setCrossBtn(true)
  }
  const handleCheckOutBook = ()=>{
    setAllBookingPage(false)
    setNewBookingPage(false)
    setAppBookingPage(false)
    setCheckInPage(false)
    setCheckOutPage(true)
    setCrossBtn(true)
  }

  const handleCrossBtn = ()=>{
    setAllBookingPage(true)
    setNewBookingPage(false)
    setAppBookingPage(false)
    setCheckInPage(false)
    setCheckOutPage(false)
    setCrossBtn(false)
  }


  return (
    <div className='main_bookindDetails_container'>
        <Navbar/>
          <div className='dropdown_btn'>
            <Dropdown  overlay={menu} placement="topRight">
              <Button>Select Stages</Button>
            </Dropdown> 
            {crossBtn ? <ImCross className='dropdown_item' onClick={()=>handleCrossBtn()} type="reload" /> : ''}
            <div className='dropdown_heading'>
              {allBookingPage ? <h2>Booking Details</h2>    : ''}
              {newBookingPage ? <h2>New Booking</h2>        : ''}
              {appBookingPage ? <h2>Confirm Booking</h2>    : ''}
              {checkInPage    ? <h2>Checked In Details</h2> : ''}
              {checkOutPage   ? <h2>Cheked Out Details</h2> : ''}
            </div>
            
          </div>

          <div>
            {allBookingPage ? FullDetails() : ''}
            {newBookingPage ? <NewBookingDetails/> : ''}
            {appBookingPage ? <AppBookingDetails/> : ''}
            {checkInPage ? <CheckInBooking/> : ''}
            {checkOutPage ? <CheckOutBooking/> : ''}
          </div> 
    </div>
  )
}

export default AdminBookingDetails