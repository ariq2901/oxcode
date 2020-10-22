import React, { Component, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Axios from 'axios';
import {config} from '../../config';
import '../../App.css';
import Listgrid from '../ComponentList/ListGrid';

const PopularSpots = () => {
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  
  const getList = async () => {
    try {
      setLoading(true);
      const respon = await Axios.get(`${config.api_host}/api/popular/attractions`);
      // setList(respon.data);
      setList(respon.data.data);
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
        <div className="crd">
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
      tag.push(<i class='fas fa-star'></i>);
    }
    // console.log(i);
    if( i < 5 ) {
      tag.push(<i class="far fa-star"></i>);
    }
    if( i < 4 ) {
      tag.push(<i class="far fa-star"></i>);
    }
    return tag;
  }

  return(
    <Fragment>
      <div className="spots-wrapper">
        <div className="spots-title">
          <span className="s-title">most popular tourist spots</span>
          <Link className="s-view" to={'list-attraction/popular'}>view all<span><i class="fas fa-arrow-right"></i></span></Link>
        </div>
        <div className="spots-list">
        {loading ? (
              <Fragment>
                {skeletonCard(3)}
              </Fragment>
            ) : (
              <Fragment>
              {list.slice(0, 3).map((wisata) =>
                <NavLink className="crd" to="/detail">
                  <div className="img-wrapper">
                  <img src={`${config.api_host}/api/images/${wisata.id}`} alt="img" />
                  </div>
                  <div className="title-wrapper">
                    <span>{wisata.name}</span>
                  </div>
                  <div className="rate-wrapper">
                    <div className="rating">
                      {starLoop(wisata.rating)}
                    </div>
                    <p className="total-reviews">175 reviews</p>
                  </div>
                  <div className="location-wrapper">
                    <i class="fas fa-map-marker-alt"></i>
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