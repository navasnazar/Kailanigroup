import React from 'react'
import './itemView.css'
import PIC1 from '../../../assets/Images/roompic1.jpg'
import PIC2 from '../../../assets/Images/roompic2.jpg'
import PIC3 from '../../../assets/Images/roompic3.jpg'
import PIC4 from '../../../assets/Images/roompic4.jpg'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const ItemView = () => {
  return (
    <section id='itemView' style={{marginTop:0}}>
        <h5>Detailed Session</h5>
        <h2>Item View</h2>
        <Swiper navigation={true} modules={[Navigation]}  className='container itemView__container mySwiper'>
            <SwiperSlide >
                <img className='itemView__main-image' src={PIC1} alt="pic1" />
            </SwiperSlide>
            <SwiperSlide >
                <img className='itemView__main-image' src={PIC2} alt="pic2" />
            </SwiperSlide>
        </Swiper>
    </section>
  )
}

export default ItemView