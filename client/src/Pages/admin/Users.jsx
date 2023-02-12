import React from 'react'
import Sidebar from '../../components/ADMIN/sidebar/Sidebar'
import UsersDetails from '../../components/ADMIN/users/UsersDetails'
import './userss.css'

const Users = () => {
  return (
    <div className='main_users_container'>
        <Sidebar users/>
        <UsersDetails/>
    </div>
  )
}

export default Users