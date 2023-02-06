import React from 'react'
import './testimonials.css'
import AVTR1 from '../../../assets/Images/homeBlog1.jpg'
import AVTR2 from '../../../assets/Images/homeBlog2.jpg'
import AVTR3 from '../../../assets/Images/homeBlog3.jpg'
// import Swiper core and required modules
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
const blog = [
  {
    id:1,
    avatar:AVTR1,
    name: 'Navas Nazar',
    review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum amet reprehenderit obcaecati. Ipsa repellat explicabo exercitationem beatae suscipit amet iusto assumenda nulla molestias'
  },
  {
    id:2,
    avatar:AVTR2,
    name: 'Ayra Mehrin Navas',
    review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum amet reprehenderit obcaecati. Ipsa repellat explicabo exercitationem beatae suscipit amet iusto assumenda nulla molestias, minus natus perferendis laboriosam commodi cum corrupti?'
  },
  {
    id:3,
    avatar:AVTR3,
    name: 'Shehana Badarudeen',
    review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum amet reprehenderit obcaecati. Ipsa repellat explicabo exercitationem beatae suscipit'
  },
]

const Testimonials = () => {
  return (
    <section id='blogs' className='blogs__main'>
      <h5>Review from Clients</h5>
      <h2>Blogs</h2>

      <Swiper className="container blogs__container"
        // install Swiper modules
        modules={[Pagination]} 
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {
          blog.map(({avatar, name, review}, index)=>{
            return(
              <SwiperSlide key={index} className='blog'>
                <div className='client__avatar'>
                  <img src={avatar}/>
                </div>
                <h5 className='client__name'>{name}</h5>
                <small className='client__review'>{review}</small>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </section>
  )
}

export default Testimonials
