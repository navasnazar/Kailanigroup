import React from 'react'
import AdminServices from '../../components/ADMIN/services/AdminServices'
import Sidebar from '../../components/ADMIN/sidebar/Sidebar'
import './services.css'

const Services = () => {
  return (
    <>
      <div className='main_services_container'>
        <Sidebar services/>
        <AdminServices/>
      </div>
    </>
  )
}

export default Services
