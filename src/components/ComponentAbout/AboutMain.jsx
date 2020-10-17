import React, { Fragment } from 'react';
// import {DisplayMapFC} from '../../DisplayMapFC';
import Dummy from '../../img/man-dummy.png';
import Email from '../../svg/email.svg';
import Facebook from '../../svg/facebook.svg';
import Instagram from '../../svg/instagram.svg';
import Youtube from '../../svg/youtube.svg';

const AboutMain = () => {
  return(
    <Fragment>
      <div className="started-wrapper">
        <div className="started-title">
          <p>how it all started?</p>
        </div>
        <div className="started-text">
          <p>
            blabla is a trusted travel agent who has been in the field for almost 12 years,
            this company was founded by daffa rabbanee who has experience in the field of 
            travel services in his career. Now our main goal is to provide the best travel 
            services for each of our customers.
          </p>
        </div>
      </div>
      <div className="our-team-title">
        <p>our team</p>
      </div>
      <div className="our-team-grid">
        <div className="person-card">
          <div className="person-img-wrapper">
            <img src={Dummy} alt="person card"/>
          </div>
          <div className="person-detail">
            <div className="person-name">
              <p>daffa rabbanee</p>
            </div>
            <div className="person-email">
              <p>daffarabanee@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="person-card">
          <div className="person-img-wrapper">
            <img src={Dummy} alt="person card"/>
          </div>
          <div className="person-detail">
            <div className="person-name">
              <p>ariq jusuf</p>
            </div>
            <div className="person-email">
              <p>ariq2901@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="person-card">
          <div className="person-img-wrapper">
            <img src={Dummy} alt="person card"/>
          </div>
          <div className="person-detail">
            <div className="person-name">
              <p>ibrahim ahmad</p>
            </div>
            <div className="person-email">
              <p>ibrahimahmad8896@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="contact">
        <div className="map-wrapperaj">
          {/* <DisplayMapFC lat="-6.175522" longi="106.827175" /> */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2241183703695!2d107.00565171434327!3d-6.493282565289409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69bdb8f6c50289%3A0xb7a33d4d5721ad5f!2sSMK%20MADINATULQURAN!5e0!3m2!1sen!2sid!4v1602928798982!5m2!1sen!2sid" frameborder="0" className="map-contact" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
        <div className="contact-info">
          <div className="info-title">
            <p>contact us</p>
          </div>
          <div className="social-media">
            <div className="info-social">
              <img src={Email} className="icon-svg" alt="email"/>
              <p>info@smkmadinatulquran.sch.id</p>
            </div>
          </div>
          <div className="social-media">
            <div className="info-social">
              <img src={Facebook} className="icon-svg" alt="facebook"/>
              <p>smktimadinatulquran</p>
            </div>
          </div>
          <div className="social-media">
            <div className="info-social">
              <img src={Youtube} className="icon-svg" alt="youtube"/>
              <p>smk madinatulquran</p>
            </div>
          </div>
          <div className="social-media">
            <div className="info-social">
              <img src={Instagram} className="icon-svg" alt="instagram"/>
              <p>smktimadinatulquran</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default AboutMain;