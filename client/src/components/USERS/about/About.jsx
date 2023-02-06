import React from "react";
import "./About.css";
import ME from "../../../assets/Images/about.jpg";
import { FiAward } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { RiServiceFill } from "react-icons/ri";

const About = () => {
  return (
    <section id="about">
      <h5>Get to know</h5>
      <h2>About</h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="about" />
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FiAward className="about__icon" />
              <h5>Experience</h5>
              <small>1+ Years Services</small>
            </article>

            <article className="about__card">
              <FiUsers className="about__icon" />
              <h5>Clients</h5>
              <small>200+ Worldwide</small>
            </article>

            <article className="about__card">
              <RiServiceFill className="about__icon" />
              <h5>Packages</h5>
              <small>20+ customize Packages</small>
            </article>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            facilis, asperiores totam, beatae voluptatum repellendus esse eum
            pariatur minima illum earum vitae architecto quod delectus animi
            reprehenderit quia numquam sed?
          </p>
          <a href="#contact" className="btn btn-primary">Connect with us</a>
        </div>
      </div>
    </section>
  );
};

export default About;
