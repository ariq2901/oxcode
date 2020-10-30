import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Axios from 'axios';
import {config} from '../../config';
import '../../App.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PopularSpots = () => {
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  
  const getList = async () => {
    try {
      setLoading(true);
      const respon = await Axios.get(`${config.api_host}/api/popular/attractions`);
      // setList(respon.data);
      setList(respon.data.attractions);
      console.log(respon.data.attractions);
      setLoading(false);
    } catch(e) {
      console.error('error feching data', e);
    }
  }

  React.useEffect(() => {
    getList();
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

  function starLoop(stars) {
    var tag = [];
    var i;
    for( i = 0; i < stars; i++ ) {
      tag.push(<i className='fas fa-star' key={i}></i>);
    }
    // console.log(i);
    if( i < 5 ) {
      tag.push(<i key={i} className="far fa-star"></i>);
    }
    if( i < 4 ) {
      tag.push(<i key={i} className="far fa-star"></i>);
    }
    return tag;
  }

  return(
    <Fragment>
      <div className="spots-wrapper">
        <div className="spots-title">
          <span className="s-title">most popular tourist spots</span>
          <Link className="s-view" to={'list-attraction/popular'}>view all<span><i className="fas fa-arrow-right"></i></span></Link>
        </div>
        <div className="spots-list">
        {loading ? (
              <Fragment>
                {skeletonCard(3)}
              </Fragment>
            ) : (
              <Fragment>
              {list.slice(0, 3).map((wisata, index) =>
                <NavLink className="crd" to="/detail" key={index}>
                  <div className="img-wrapper">
                    <LazyLoadImage src={`${config.api_host}/api/images/${wisata.images[0].id}`} width="100%" placeholderSrc="/images/placeholder.png"  alt="place img"/>                  
                  </div>
                  <div className="title-wrapper">
                    <span>{wisata.name}</span>
                  </div>
                  <div className="rate-wrapper">
                    <div className="rating">
                      {starLoop(wisata.rating)}
                    </div>
                    <p className="total-reviews">{wisata.total_reviews} reviews</p>
                  </div>
                  <div className="location-wrapper">
                    <i className="fas fa-map-marker-alt"></i>
                    <p className="location-name">{wisata.city}</p>
                  </div>
                </NavLink>
              )}
              </Fragment>
            )}
        </div>
      </div>
    </Fragment>
  );
}
export default PopularSpots;