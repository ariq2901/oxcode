import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login1 from './svg/loginsatu.svg';
import Login2 from './svg/logindua.svg';
import Login3 from './svg/logintiga.svg';

const Side = (props) => {

  const logRad = props.logRad;
  const image = props.image;
  const changeRad = props.changeRad;
  const radButton = props.radButton;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 6000,
  }

  return (
    <div className="col sider">
      <div className="center lr-3" ref={image}>
      <Slider {...settings}>
        <div className="slider-item">
          <div className="slide-img-wrapper">
            <img src={Login1} alt="illustration" />
          </div>
          <span style={{ color: 'rgba(255, 255, 255, 50%)' }}>skytours</span>
          <h2 style={{ color: 'white' }}>Make your journey unforgettable with Skytours</h2>
        </div>
        <div className="slider-item">
          <div className="slide-img-wrapper">
            <img src={Login2} alt="illustration" />
          </div>
          <span style={{ color: 'rgba(255, 255, 255, 50%)' }}>skytours</span>
          <h2 style={{ color: 'white' }}>the world is very wide, explore it all with your own way</h2>
        </div>
        <div className="slider-item akir">
          <div className="slide-img-wrapper">
            <img src={Login3} alt="illustration" />
          </div>
          <span style={{ color: 'rgba(255, 255, 255, 50%)' }}>skytours</span>
          <h2 style={{ color: 'white' }}>make the most beautiful memories during your trip on skytours</h2>
        </div>
      </Slider>
      </div>
    </div>
  );
}

export default Side;