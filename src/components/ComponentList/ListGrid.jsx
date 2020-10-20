import React, { Fragment } from 'react';
import Bromo from '../../img/bromo.jpg';
import Waterbom from '../../img/waterbom.jpg';
import Dufan from '../../img/dufan.jpg';
import {NavLink} from 'react-router-dom';
import Axios from 'axios';
import {config} from '../../config';

// import '../../feature';
const ListGrid = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [gridfilter, setGridfilter] = React.useState(false);
  
  const getList = async () => {
    try {
      setLoading(true);
      console.log('props list-grid ', props.type);
      if(props.type) {
        var respon = await Axios.get(`${config.api_host}/api/${props.type}/attractions`);
        console.log('bypopular', respon);
      } else {
        var respon = await Axios.get(`${config.api_host}/api/attractions`);
        console.log('bygeneral', respon);
      }
      // setList(respon.data);
      setList(respon.data.data);
      setLoading(false)
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

  function dummyCard(jumlah) {
    const skeleton = [];
    var t;
    for( t = 0; t < jumlah; t++ ) {
      skeleton.push(
        <NavLink className="crd" to="/detail">
          <div className="img-wrapper">
            <img src={Dufan} alt="dufan img"/>
          </div>
          <div className="title-wrapper">
            <span>dunia fantasi</span>
          </div>
          <div className="rate-wrapper">
            <div className="rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p className="total-reviews">439 reviews</p>
          </div>
          <div className="location-wrapper">
            <i class="fas fa-map-marker-alt"></i>
            <p className="location-name">jakarta</p>
          </div>
        </NavLink>
      )
    }
    return skeleton;
  }

  // function getUserLocation() {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     console.log("lat : ", position.coords.latitude);
  //     console.log("long : ", position.coords.longitude);
  //   })
  // }
  
  const handleClick = () => {
    setGridfilter(!gridfilter);
    console.log(gridfilter);
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
    } else {
      console.log('pass');
    }
    return tag;
  }

  return(
    <Fragment>
      <div className="spots-wrapper listpage">
        <div className="list-title">
          <div className="filter-wrapper">
            <p>filter</p>
            <input type="checkbox" onClick={handleClick} id="filter-toggle"/>
            <label htmlFor="filter-toggle">
              <span></span>
            </label>
          </div>
          <p>list attractions</p>
        </div>
        <div className={gridfilter ? "grid-filter" : "grid-wrapper"}>
          <div className={gridfilter ? "filter-panel show" : "filter-panel none"}>
            <div className="sortby-tunel">
              <p>sort by</p>
              <div className="sort-checkbox">
                <div className="reviews-btn">
                  <input type="checkbox" name="reviews" className="visually-hidden" id="reviews"/>
                  <label htmlFor="reviews" className="sortby-label r">reviews</label>
                </div>
                <div className="reviews-btn">
                  <input type="checkbox" name="distance" className="visually-hidden" id="distance"/>
                  <label htmlFor="distance" className="sortby-label d">distance</label>
                </div>
                <div className="reviews-btn">
                  <input type="checkbox" name="alphabet" className="visually-hidden" id="alphabet"/>
                  <label htmlFor="alphabet" className="sortby-label a">alphabet</label>
                </div>
              </div>
            </div>
            <hr className="line-divider"/>
            <div className="types-tunel">
              <div className="types-tunel-title">
                <p>types of attractions</p>
                <button>reset</button>
              </div>
              <div className="types-checkbox">
                <ul>
                  <li>
                    <div className="type-checkbox">
                      <input type="checkbox" id="mountain-box"/>
                      <label htmlFor="mountain-box">
                        <span className="checkmark"></span>
                      </label>
                      <p className="label-title">mountain</p>
                    </div>
                  </li>
                  <li>
                    <div className="type-checkbox">
                      <input type="checkbox" id="beach-box"/>
                      <label htmlFor="beach-box">
                        <span className="checkmark"></span>
                      </label>
                      <p className="label-title">beach</p>
                    </div>
                  </li>
                  <li>
                    <div className="type-checkbox">
                      <input type="checkbox" id="museum-box"/>
                      <label htmlFor="museum-box">
                        <span className="checkmark"></span>
                      </label>
                      <p className="label-title">museum</p>
                    </div>
                  </li>
                  <li>
                    <div className="type-checkbox">
                      <input type="checkbox" id="zoo-box"/>
                      <label htmlFor="zoo-box">
                        <span className="checkmark"></span>
                      </label>
                      <p className="label-title">zoo</p>
                    </div>
                  </li>
                  <li className="show-wrapper">
                    <input type="checkbox" id="show-check" />
                    <label htmlFor="show-check" className="show-label"></label>
                    <ul>
                      <li>
                        <div className="type-checkbox">
                          <input type="checkbox" id="lake-box"/>
                          <label htmlFor="lake-box">
                            <span className="checkmark"></span>
                          </label>
                          <p className="label-title">lake</p>
                        </div>
                      </li>
                      <li>
                        <div className="type-checkbox">
                          <input type="checkbox" id="waterpark-box"/>
                          <label htmlFor="waterpark-box">
                            <span className="checkmark"></span>
                          </label>
                          <p className="label-title">waterpark</p>
                        </div>
                      </li>
                      <li>
                        <div className="type-checkbox">
                          <input type="checkbox" id="waterfall-box"/>
                          <label htmlFor="waterfall-box">
                            <span className="checkmark"></span>
                          </label>
                          <p className="label-title">waterfall</p>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <hr className="line-divider dua"/>
            <div className="hours-operation">
              <div className="hours-operation-title">
                <p>hours of operation</p>
              </div>
              <div className="hours-operation-field">
                <input type="text" name="from-op" id="from-op"/>
                <div className="field-to"><span>to</span></div>
                <input type="text" name="to-op" id="to-op"/>
              </div>
            </div>
          </div>
          <div className={gridfilter ? "main-list-filter" : "main-list"}>
            {loading ? (
              <Fragment>
                {skeletonCard(6)}
              </Fragment>
            ) : (
              <Fragment>
                {list.map((wisata) => 
                  <NavLink className="crd" to="/detail">
                    <div className="img-wrapper">
                      <img src={`${config.api_host}/api/images/${wisata.id}`} alt="place img" />
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
                      {loading ? '' : <i class="fas fa-map-marker-alt"></i>}
                      <p className="location-name">{wisata.city}</p>
                    </div>
                  </NavLink>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default ListGrid;