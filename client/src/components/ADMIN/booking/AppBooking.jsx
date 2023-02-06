import React from 'react'
import { useEffect, useState } from 'react';
import './adminBookingDetails.css'
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
import {FaFileInvoice} from 'react-icons/fa'
import {useDispatch} from 'react-redux'
import {getPreBookingInvoiceAdmin} from '../../../redux/adminReducer'
import { useNavigate } from 'react-router-dom'


const AppBookingDetails = () => {

  const [bookingData, setBookingData]=useState([])
  const [dataErr, setDataErr]=useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getAllBooking();
    
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

  const handleInvoice = (id)=>{
    dispatch(getPreBookingInvoiceAdmin(id)) 
    navigate('/admin/PreInvoice')
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

  //filter data
  const filterData = bookingData.filter((item)=>{
        if(item.conform_booking){
            return item
        }
  })
  const rows = filterData.reverse();

  return (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{fontWeight: 'bold'}} align="left">Booking Date</TableCell>
                <TableCell style={{fontWeight: 'bold'}} align="left">Mobile Number</TableCell>
                <TableCell style={{fontWeight: 'bold'}} align="left">Chech_In</TableCell>
                <TableCell style={{fontWeight: 'bold'}} align="left">Check_Out</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                  <Row key={row._id} row={row}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  )
}

export default AppBookingDetails