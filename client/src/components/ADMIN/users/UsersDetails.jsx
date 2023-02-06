import React from 'react'
import './users.css'
import Navbar from '../navbar/Navbar'
import UserTable from './UserTable'

const UsersDetails = () => {
  return (
    <div className='user_container'>
      <Navbar/>
      <UserTable/>
    </div>
  )
}

export default UsersDetails