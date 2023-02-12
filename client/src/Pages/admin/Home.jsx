import React from 'react'
import HomeRight from '../../components/ADMIN/homeRight/HomeRight'
import Sidebar from '../../components/ADMIN/sidebar/Sidebar'
import './home.css'


const Home = () => {
  

  return (
    <div className='main_home_container'>
        <Sidebar home/>
        <HomeRight/>
    </div>
  )
}

export default Home