import React from 'react'
import './galleryItems.css'
import PIC1 from "../../../assets/Images/event1.jpeg";
import PIC2 from "../../../assets/Images/event2.jpeg";
import PIC3 from "../../../assets/Images/gallpic3.jpeg";
import PIC4 from "../../../assets/Images/gallpic4.jpeg";


const Gallery = () => {
  
  return (
    <section id='gallery'>
      <h5>View our Experience</h5>
      <h2>Gallery</h2>
      
      <div className="container gallery__container">
        <div className="gallery__pic1">
          <div className="gallery__pic-image">
            <img src={PIC1} alt="gallery" />
          </div>
        </div>
        <div className="gallery__content">
        <h4 style={{color:'yellow'}}>Special Events</h4>
        <h2>Kadhakali - Traditional Kerala Art</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            facilis, asperiores totam, beatae voluptatum repellendus esse eum
            pariatur minima illum earum vitae 
          </p>
        </div>
      </div>

      <div className="container gallery__container">
        <div className="gallery__content">
        <h4 style={{color:'yellow'}}>Special Events</h4>
        <h2>Mohiniyattam - Kerala Traditional Dance</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            facilis, asperiores totam, beatae voluptatum repellendus esse eum
            pariatur minima illum earum vitae 
          </p>
        </div>
        <div className="gallery__pic2">
          <div className="gallery__pic-image">
            <img src={PIC2} alt="gallery" />
          </div>
        </div>
      </div>


      <div className="container gallery__container">
        <div className="gallery__pic3">
          <div className="gallery__pic-image">
            <img src={PIC3} alt="gallery" />
          </div>
        </div>
        <div className="gallery__content">
        <h4 style={{color:'yellow'}}>Special Events</h4>
        <h2>Thenmala Ecoturism</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            facilis, asperiores totam, beatae voluptatum repellendus esse eum
            pariatur minima illum earum vitae 
          </p>
        </div>
      </div>

      <div className="container gallery__container">
        
        <div className="gallery__content">
        <h4 style={{color:'yellow'}}>Travel Package</h4>
        <h2>Jadayu Rock</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            facilis, asperiores totam, beatae voluptatum repellendus esse eum
            pariatur minima illum earum vitae 
          </p>
        </div>
        <div className="gallery__pic4">
          <div className="gallery__pic-image">
            <img src={PIC4} alt="gallery" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery