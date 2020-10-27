import React, { Fragment } from 'react';
import Instagram2 from '../svg/instagram2.svg';
import Facebook2 from '../svg/facebook2.svg';
import Skytours from '../img/logo/logo.png';
import Youtube2 from '../svg/youtube2.svg';
import Email2 from '../svg/email2.svg';

const Footer = () => {

 function getThisYear() {
   return new Date().getFullYear();
 }

  return(
    <Fragment>
      <footer className="footer">
        <div className="row">
          <div className="footer-wrapper">
            <div className="footer-main">
              <div className="container">
                <div className="content-footer">
                  <div className="logo-wrapper">
                    <img src={Skytours} alt="logo" />
                    <span>Skytours</span>
                  </div>
                  <div className="location-footer">
                    <i className="material-icons">location_on</i>
                    <a href="https://goo.gl/maps/6VS7aCJJwP3WGn53A" rel="noopener noreferrer" target="_blank"><span><span className="locone">Singasari, Kec. Jonggol</span><span className="loctwo">Bogor, Jawa Barat 16830</span></span></a>
                  </div>
                  <div className="call-footer">
                    <i className="material-icons">call</i>
                    <span><span className="locone">0812 6900 457</span><span className="loctwo">info@skytours.com</span></span>
                  </div>
                  <div className="social-footer">
                    <a href="https://www.facebook.com/smktimadinatulquran" rel="noopener noreferrer" target="_blank">
                      <div className="social-button">
                        <img src={Facebook2} alt="fb" />
                      </div>
                    </a>
                    <a href="https://www.instagram.com/smktimadinatulquran/" rel="noopener noreferrer" target="_blank">
                      <div className="social-button">
                        <img src={Instagram2} alt="ig" />
                      </div>
                    </a>
                    <a href="mailto:skytours.com">
                      <div className="social-button">
                        <img src={Email2} alt="email" />
                      </div>
                    </a>
                    <a href="https://www.youtube.com/channel/UCLQ2_4V-t11pUG0pATDXK6g" rel="noopener noreferrer" target="_blank">
                      <div className="social-button">
                        <img src={Youtube2} alt="yt" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-copyright">
              <div className="container">
                <div className="copyright">
                  <p className="cptlz-text">copyright &#169; {getThisYear()}</p>
                  <p className="cptlz-text c-brand">Skytours, Inc. </p>
                  <p className="last-p"><span className="cptlz-text">All</span> rights reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}
export default Footer;