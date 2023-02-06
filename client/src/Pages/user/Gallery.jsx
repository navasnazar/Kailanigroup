import React from 'react'
import GalleryItems from '../../components/USERS/gallery/GalleryItems'
import GalleryNav from '../../components/USERS/nav/GalleryNav'
import Footer from '../../components/USERS/footer/Footer'

const Gallery = () => {
  return (
    <div>
        <GalleryItems/>
        <GalleryNav/>
        <Footer/>
    </div>
  )
}

export default Gallery