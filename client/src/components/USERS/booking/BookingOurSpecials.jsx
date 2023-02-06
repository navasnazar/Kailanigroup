import React from 'react'
import './speciality.css'
import IC1 from '../../../assets/Images/icon-1.png'
import IC2 from '../../../assets/Images/icon-2.png'
import IC3 from '../../../assets/Images/icon-3.png'
import IC4 from '../../../assets/Images/icon-4.png'
import IC5 from '../../../assets/Images/icon-5.png'
import IC6 from '../../../assets/Images/icon-6.png'


const BookingOurSpecials = () => {
  return (
    <section className="services">

        <div className="box-container">

            <div className="box">
                <img src={IC1} alt=""/>
                <h3>food & drinks</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, sunt?</p>
            </div>

            <div className="box">
                <img src={IC2} alt=""/>
                <h3>outdoor dining</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, sunt?</p>
            </div>

            <div className="box">
                <img src={IC3} alt=""/>
                <h3>beach view</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, sunt?</p>
            </div>

            <div className="box">
                <img src={IC4} alt=""/>
                <h3>decorations</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, sunt?</p>
            </div>

            <div className="box">
                <img src={IC5} alt=""/>
                <h3>swimming pool</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, sunt?</p>
            </div>

            <div className="box">
                <img src={IC6} alt=""/>
                <h3>resort beach</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, sunt?</p>
            </div>

        </div>
    </section>
  )
}

export default BookingOurSpecials