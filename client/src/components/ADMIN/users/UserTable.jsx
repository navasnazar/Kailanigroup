import React from 'react'
import MaterialTable from 'material-table'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


const userDetails = [
    {firstName:'Navas', lastName:"Nazar", email:'navas@gmail.com',mobile:9567819494, status:1},
    {firstName:'Akash', lastName:"K", email:'akash@gmail.com',mobile:9524343494, status:1},
    {firstName:'Akhil', lastName:"Suresh", email:'akhil@gmail.com',mobile:9567812345, status:1},
    {firstName:'Afzal', lastName:"Muhammed", email:'afzal@gmail.com',mobile:9546256294, status:1},
    {firstName:'Aswanth', lastName:"K", email:'aswanth@gmail.com',mobile:9626819494, status:1},
]
const userStatus=[
    {id:0,title:"Deactive"},
    {id:1,title:"Active"},
]



const UserTable = () => {

    const [userData, setUserData]=useState(userDetails)
    const [status, setStatus]=useState({})
    const [blockStatus, setBlockStatus]=useState({})
    
    const columns=[
        {title:'First Name', field:'firstName'},
        {title:'Last Name', field:'lastName'},
        {title:'Email ID', field:'email'},
        {title:'Mobile', field:'mobile'},
        {title:'Status', field:'status',lookup:status},
    ] 
    useEffect(()=>{
        const status={}
        userStatus.map(row=>status[row.id]=row.title)
        setStatus(status);
    },[])

    


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
                {icon:()=><button className='btn btn-primary'>Block/Unblock</button>,
                tooltip:"Block/Unblock" ,
                onClick:(e, data)=>setBlockStatus(data)
               }
            ]}
            
        />
        

    </div>
  )
}

export default UserTable