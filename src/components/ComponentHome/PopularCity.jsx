import React, { Fragment, Component } from 'react';
import Depok from '../../img/depok.jpg';
import Jakarta from '../../img/jakarta.jpg';
import Bali from '../../img/bali.jpg';
import Axios from 'axios';
import {config} from '../../config';
import '../../App.css';
import {Link, NavLink} from 'react-router-dom';

const PopularCity = () => {
  const [loading, setLoading] = React.useState(false);
  const [popcity, setPopcity] = React.useState([]);
  
  const getPopcity = async () => {
    try {
      setLoading(true);
      const respon = await Axios.get(`${config.api_host}/api/popular/cities`);
      // setList(respon.data);
      setPopcity(respon.data.data);
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
  
  return(
    <Fragment>
      <div className="city-wrapper">
        <div className="spots-title">
          <span className="s-title">most popular city</span>
          <Link className="s-view" to={'list-attraction/popular'}>view all<span><i class="fas fa-arrow-right"></i></span></Link>
        </div>
        <div className="spots-list">
          {loading ? (
            <Fragment>
              {skeletonCard(3)}
            </Fragment>
          ) : (
            popcity.map((kota) =>
              <NavLink className="crd" to="/list-attraction">
                <div className="img-wrapper">
                  <img src={`${config.api_host}/api/images/${kota.image[0].id}`} alt="img"/>
                </div>
                <div className="title-wrapper">
                  <span>{kota.name}</span>
                </div>
                <div className="desc-city">
                  <p>{kota.description}</p>
                </div>
              </NavLink>
            )
          )}
        </div>
      </div>
    </Fragment>
  );
}
export default PopularCity;