import React from 'react'
import './booking.css'
import RM1 from '../../../assets/Images/roompic1.jpg'
import RM2 from '../../../assets/Images/roompic2.jpg'
import RM3 from '../../../assets/Images/roompic5.jpg'
//image width 1950 : 800

//swiper details
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

const homeImg = [
    {
        id:1,
        title:'luxurious rooms',
        link:'/availability',
        linkTitle:'make a reservation',
        image:RM1
    },
    {
        id:2,
        title:'foods and drinks',
        link:'/reservation',
        linkTitle:'check availability',
        image:RM2
    },
    {
        id:3,
        title:'luxurious halls',
        link:'/contact',
        linkTitle:'Contact Us',
        image:RM3
    },
]

const BookingHome = () => {
  return (
    <section id="home">
        <h5>Connected with our services</h5>
        <h2>Services</h2>
        <div class="swiper home-slider">

        <div class="swiper-wrapper">
            <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{ clickable: true }}
            >
                {
                    homeImg.map(({title, link, linkTitle, image},index)=>{
                        return(
                            <SwiperSlide key={index} className="box swiper-slide">
                            <div className='imageBox'>
                                <img src={image} alt=""/> 
                            </div>
                            <div className="heading_div">
                                <h3 className='heading_image'>{title}</h3>
                                <a href={link} className="btn heading_image">{linkTitle}</a>
                            </div>
                        </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            </div>
            </div>
    </section>
  )
}

export default BookingHome