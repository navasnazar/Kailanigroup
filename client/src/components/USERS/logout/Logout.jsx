import React from 'react'
import './logout.css'
import {RiLogoutCircleRLine} from 'react-icons/ri'
import {getUserLoginDetails, getAvailableDate} from '../../../redux/userReducer'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Logout = () => {

  const user = useSelector((state)=>state.user.loginUserDetails)

  const [logout, setLogout]=useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if(token){
      setLogout(true)
    }
  }, [logout])



    const logoutFunction = ()=>{
        localStorage.removeItem('userToken')
        toast.success('Logout Success!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        dispatch(getUserLoginDetails(false))
        dispatch(getAvailableDate(false))
        setLogout(false)
        
      }

  return (
    <div>
        <ToastContainer/>
        {
            user ?
            <div className='sticky_logout'>
                <RiLogoutCircleRLine onClick={logoutFunction}  className='sticky_icon'/>
                <p className='stickey_name'>{user.user}</p>
            </div> : ''
        }
    </div>
    
  )
}

export default Logout