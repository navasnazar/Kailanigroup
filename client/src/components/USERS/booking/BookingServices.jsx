import React from 'react'
import './bookingServices.css'
import PIC1 from "../../../assets/Images/event1.jpeg";
import PIC2 from "../../../assets/Images/event2.jpeg";
import PIC3 from "../../../assets/Images/event3.jpeg";
import PIC4 from "../../../assets/Images/event4.jpeg";


const items = [
  {
    category:'Special Events',
    title: 'Kadhakali - Traditional Kerala Art',
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt facilis, asperiores totam, beatae voluptatum repellendus esse eumpariatur minima illum earum vitae",
    image:PIC1,
    Amount: 8000
  },
  {
    category:'Special Events',
    title: 'Mohiniyattam - Kerala Traditional Dance',
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt facilis, asperiores totam, beatae voluptatum repellendus esse eumpariatur minima illum earum vitae",
    image:PIC2,
    Amount: 8000
  },
  {
    category:'Special Events',
    title: 'Stage Show',
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt facilis, asperiores totam, beatae voluptatum repellendus esse eumpariatur minima illum earum vitae",
    image:PIC3,
    Amount: 7500
  },
  {
    category:'Special Events',
    title: 'Food Festival - Kerala Special Foods',
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt facilis, asperiores totam, beatae voluptatum repellendus esse eumpariatur minima illum earum vitae",
    image:PIC4,
    Amount: 2500
  },
]

const BookingServices = () => {
  
  return (
    <section id='bServices'>
      {
        items.map(({category, title, content, image, Amount}, index)=>{
          return(
            <session>
              <div key={index} className="container bservices__container">
                <div className="bservices__pic">
                  <div className="bservices__pic-image">
                    <img src={image} alt='' />
                  </div>
                </div>
                <div className="bservices__content">
                  <div>
                    <h4 style={{color:'yellow'}}>{category}</h4>
                    <h2>{title}</h2>
                    <p>{content}</p>
                  </div>
                  <div className='bservices__btn'> 
                    <button type='submit' className='btn btn-primary'>Add Service</button>
                    <h4 className='bservices__price'>Price:{Amount}/-</h4>
                  </div>
                </div>
              </div>
            </session> 
          )
        })
      }
      <div className='btnClass'>
        <a href='/proceed' type='submit' className='btn btn-primary bservices__btn-proceed'>PROCEED</a>
      </div>

    </section>

  )
}

export default BookingServices