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
    link: '/rooms'
  },
  {
    id:2,
    image: IMG2,
    title: 'Travel Packages',
    link: '/travelPack'
  },
  {
    id:1,
    image: IMG3,
    title: 'Dining',
    link: '/diningPack'
  },
  {
    id:1,
    image: IMG4,
    title: 'Extra Events',
    link: '/extraEvents'
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
                <h3>{title}</h3>
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