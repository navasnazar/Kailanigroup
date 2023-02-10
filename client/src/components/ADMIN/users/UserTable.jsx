import React from 'react'
import './userTable.css'
import MaterialTable from 'material-table'
import { useState } from 'react'
import { useEffect } from 'react'
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import {axiosAdminInstance} from '../../../Instance/Axios'
import { Switch, Space } from 'antd';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons'
import {ProcessingButton} from './ProcessingButton'

const UserTable = () => {

    const [userData, setUserData]=useState([])
    const [render, setRender]=useState()


    useEffect(()=>{
        getAllUsers();
    },[render])


   

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

    const handleBlockStatus = async (data)=>{
        console.log(data)
        let blockedUserId = data._id
        const token = localStorage.getItem('admin')
        const response = await axiosAdminInstance.post('/blockStatus', {blockedUserId},
        {
        headers: {Authorization: token}
        }
        ).then((response)=>{
            if(response.data.status=='done'){
                setTimeout(() => {
                  let x = Math.random() * 100;
                  setRender(x)
                }, 500);
            }
        })
    }
    const columns=[
        {title:'Full Name', field:'name'},
        {title:'Email ID', field:'email'},
        {title:'Mobile', field:'mobile'},
        {title:'Block Status', field:'blockStatus'},
    ] 

  return (
    <div>
        <MaterialTable title="User Details"
            data={userData}
            columns={columns}
            options={{
                search:true,
                filtering:false,
                exportButton:true
            }}
            actions={[
                {icon:(data)=> <ProcessingButton/>,
                tooltip:"Block/Unblock" ,
                onClick:(e, data)=>handleBlockStatus(data)
               }
            ]}
        />
        

    </div>
  )
}

export default UserTable