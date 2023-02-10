import React from 'react'
import './services.css'
import IMG1 from '../../../assets/Images/homeSer1.jpg'
import IMG2 from '../../../assets/Images/homeSer2.jpg'
import IMG3 from '../../../assets/Images/homeSer3.jpg'
import IMG4 from '../../../assets/Images/homeSer4.jpg'

const services = [
  {
    id:1,
    image: IMG1,
    title: 'Rooms',
    link: '/booking'
  },
  {
    id:2,
    image: IMG2,
    title: 'Travel Packages',
    link: '/booking'
  },
  {
    id:1,
    image: IMG3,
    title: 'Dining',
    link: '/booking'
  },
  {
    id:1,
    image: IMG4,
    title: 'Special Events',
    link: '/booking'
  }
]

const Services = () => {
  return (
    <section id='services' className='services'>
      <h5>Explore our services</h5>
      <h2>Services</h2>
      
      <div className='container services__container'>
        {
          services.map(({id, image, title, link})=>{
            return(
              <article key={id} className='services__item'>
                <h2>{title}</h2>
                <div className='services__item-image'>
                  <img src={image} alt={title} />
                </div>
                <div className='services__item-cta'>
                  <a href={link} className='btn'>Book Now</a>
                </div>
              </article>
            )
          })
        }
      </div>
    </section>
  )
}

export default Services