import React from 'react'
import './Contact.css'
import {TfiEmail} from 'react-icons/tfi'
import {RiMessengerLine} from 'react-icons/ri'
import {SiWhatsapp} from 'react-icons/si'
import { useRef } from 'react';
import emailjs from 'emailjs-com'


const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_rwy3xu9', 'template_oslb49v', form.current, 'XBJcDC5HcRaKtdXxM')
    
    e.target.reset()
  };

  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Us</h2>

      <div className='container contact__container'>
        <div className='contact__options'>
          <article className='contact__option'>
            <TfiEmail className='contact__option-icon'/>
            <h4>Email</h4>
            <h5>navasnazar@gmail.com</h5>
            <a href="mailto:navasnazar@gmail.com" target='_blank'>Send a message</a>
          </article>

          <article className='contact__option'>
            <RiMessengerLine className='contact__option-icon'/>
            <h4>Messenger</h4>
            <h5>navasnazar</h5>
            <a href="https://m.me/me.NavasNazar" target='_blank'>Send a message</a>
          </article>

          <article className='contact__option'>
            <SiWhatsapp className='contact__option-icon'/>
            <h4>WhatsApp</h4>
            <h5>+91 9567819494</h5>
            <a href="https://api.whatsapp.com/send?phone=9567819494" target='_blank'>Send a message</a>
          </article>
        </div>
        {/* End of contact options */}
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name='name' placeholder='Your Full Name' required/>
          <input type="email" name='email' placeholder='Your Email ID' required/>
          <textarea name="message"  rows="7" placeholder='Your Message' required></textarea>
          <button type='submit' className='btn btn-primary'>Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact