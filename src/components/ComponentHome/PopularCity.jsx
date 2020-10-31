import React, { Fragment, Component } from 'react';
import Depok from '../../img/depok.jpg';
import Jakarta from '../../img/jakarta.jpg';
import Bali from '../../img/bali.jpg';
import Axios from 'axios';
import {config} from '../../config';
import '../../App.css';
import {Link, NavLink} from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PrevArrow from './ArrowPrev';

const PopularCity = () => {
  const [loading, setLoading] = React.useState(false);
  const [popcity, setPopcity] = React.useState([]);
  
  const getPopcity = async () => {
    try {
      setLoading(true);
      const respon = await Axios.get(`${config.api_host}/api/popular/cities`);
      // setList(respon.data);
      setPopcity(respon.data.cities);
      setLoading(false);
    } catch(e) {
      console.error('error feching data', e);
    }
  }

  React.useEffect(() => {
    getPopcity();
  }, []);

  function skeletonCard(jumlah) {
    const skeleton = [];
    var n;
    for( n = 0; n < jumlah; n++ ) {
      skeleton.push(
        <div className="crd" key={n}>
          <div className="img-wrapper loading"></div>
          <div className="title-wrapper loading">
            <span></span>
          </div>
          <div className="rate-wrapper loading">
            <div className="rating"></div>
            <p className="total-reviews"></p>
          </div>
          <div className="location-wrapper loading">
            <p className="location-name"></p>
          </div>
        </div>
      )
    }
    return skeleton;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    prevArrow: <PrevArrow />,
    nextArrow: <PrevArrow />
  };
  
  return(
    <Fragment>
      <div className="city-wrapper">
        <div className="spots-title">
          <span className="s-title">most popular city</span>
        </div>
          {loading ? (
            <Fragment>
              <div className="spots-list">
                {skeletonCard(3)}
              </div>
            </Fragment>
          ) : (
            <Slider {...settings}>
            {popcity.map((kota, index) =>
              <NavLink className="crd city" to="/list-attraction" key={index}>
                <div className="img-wrapper">
                  <LazyLoadImage src={`${config.api_host}/api/images/${kota.image[0].id}`} width="100%" placeholderSrc="/images/placeholder.png"  alt="place img"/>    
                </div>
                <div className="title-wrapper">
                  <span>{kota.name}</span>
                </div>
                <div className="desc-city">
                  <p>{kota.description}</p>
                </div>
              </NavLink>
            )}
            </Slider>
          )}
      </div>
    </Fragment>
  );
}
export default PopularCity;