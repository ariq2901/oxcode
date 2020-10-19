import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Email2 from '../svg/email2.svg';
import Facebook2 from '../svg/facebook2.svg';
import Instagram2 from '../svg/instagram2.svg';
import Youtube2 from '../svg/youtube2.svg';

const Footer = () => {

 function getThisYear() {
   return new Date().getFullYear();
 }

  return(
    <Fragment>
      <section className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-wrapper">
              <div className="social-box">
                <a href="https://www.facebook.com/smktimadinatulquran" target="_blank">
                  <div className="s-media">
                    <img src={Facebook2} className="icon-svg" alt="facebook"/>
                  </div>
                </a>
                <a href="https://www.instagram.com/smktimadinatulquran/" target="_blank">
                  <div className="s-media">
                    <img src={Instagram2} className="icon-svg" alt="instagram"/>
                  </div>
                </a>
                <a href="https://www.youtube.com/channel/UCLQ2_4V-t11pUG0pATDXK6g" target="_blank">
                  <div className="s-media">
                    <img src={Youtube2} className="icon-svg" alt="Youtube"/>
                  </div>
                </a>
                <a href="mailto:info@smkmadinatulquran.sch.id">
                  <div className="s-media">
                    <img src={Email2} className="icon-svg" alt="Email"/>
                  </div>
                </a>
              </div>
              <div className="page-boxaj">
                <NavLink className="list-link" to="/about">
                  <p>about us</p>
                </NavLink>
                <NavLink className="list-link" to="/list-attraction">
                  <p>list attraction</p>
                </NavLink>
                <NavLink className="list-link" to="/" exact>
                  <p>home</p>
                </NavLink>
                <NavLink className="list-link" to="/login">
                  <p>login</p>
                </NavLink>
              </div>
              <div className="address-title">
                <p>our-location</p>
              </div>
              <div className="address-box">
                <i class="fas fa-map-marker-alt"></i>
                <p>Kp.Kebon Kelapa, RT.02/RW.011, Singasari, Kec. Jonggol, Bogor, Jawa Barat 16830</p>
              </div>
              <div className="copyright">
                <p className="cptlz-text">copyright &#169; {getThisYear()}</p>
                <p className="cptlz-text c-brand">Skytours, Inc. </p>
                <p className="last-p"><span className="cptlz-text">All</span> rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
export default Footer;