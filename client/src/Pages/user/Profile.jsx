import React from 'react'
import Footer from '../../components/USERS/footer/Footer'
import ProfileNav from '../../components/USERS/nav/ProfileNav'
import UserProfile from '../../components/USERS/profile/UserProfile'

const Profile = () => {
  return (
    <>
        <UserProfile/>
        <ProfileNav/>
        <Footer/>
    </>
  )
}

export default Profile