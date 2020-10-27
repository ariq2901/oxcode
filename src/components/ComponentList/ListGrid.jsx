import { useDispatch, useSelector } from 'react-redux';
import MapContainer from '../MapContainer';
import {NavLink} from 'react-router-dom';
import Dufan from '../../img/dufan.jpg';
import React, { Fragment } from 'react';
import {config} from '../../config';
import Axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ListGrid = (props) => {
  const MegamenuReducer = useSelector(state => state.MegamenuReducer);
  const PositionReducer = useSelector(state => state.PositionReducer);
  const BoardHome = useSelector(state => state.ResultReducer);
  const [gridfilter, setGridfilter] = React.useState(false);
  const [cdistance, setCdistance] = React.useState(false);
  const [calphabet, setCalphabet] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [creviews, setCreviews] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  const dispatch = useDispatch();

  const getList = async () => {
    try {
      setLoading(true);
      console.log('props list-grid ', props.type);
      let respon;
      if(props.type) {
        respon = await Axios.get(`${config.api_host}/api/${props.type}/attractions`);
        console.log('bypopular', respon);
      }
      if(MegamenuReducer.category) {
        const url = `${config.api_host}/api/search/attractions`;
        const payloadc = {
          categories : [MegamenuReducer.category]
        }
        respon = await Axios.post(url, payloadc);
        console.log('byCategory', respon);
      }
      if(BoardHome.data.length > 0) {
        setList(BoardHome.data);
        console.log('kena boardhome', BoardHome);
        setLoading(false);
        return false;
      } else {
        respon = await Axios.get(`${config.api_host}/api/attractions`);
        console.log('bygeneral', respon);
      }
      setList(respon.data.attractions);
      setLoading(false)
    } catch(e) {
      console.error('error feching data', e);
    }
  }

  
  React.useEffect(() => {
    getList();
  }, [props, MegamenuReducer]);
  
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
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p className="total-reviews">439 reviews</p>
          </div>
          <div className="location-wrapper">
            <i className="fas fa-map-marker-alt"></i>
            <p className="location-name">jakarta</p>
          </div>
        </NavLink>
      )
    }
    return skeleton;
  }

  const filterList = () => {
    console.log('filter list jalan');
    if(creviews || calphabet || categories.length > 0) {
      setLoading(true);
      const url = `${config.api_host}/api/search/attractions`;
  
      if( calphabet ) {
        var payloadf = {
          sort_by : "alphabet"
        }
        console.log('by alphabet');
      }
      if( creviews ) {
        payloadf = {
          sort_by : "reviews"
        }
        console.log('by reviews');
      }
      if( categories.length > 0 && creviews ) {
        var payloadf = {
          sort_by : "reviews",
          categories : categories
        }
        console.log('category & reviews');
      }
      if( categories.length > 0 && calphabet ) {
        var payloadf = {
          sort_by : "alphabet",
          categories : categories
        }
        console.log('category & alphabet');
      }
      if( categories.length > 0 && !creviews && !calphabet) {
        var payloadf = {
          categories : categories
        }
        console.log('cuman category');
      }
      
      console.log('payloadf ', payloadf);
      Axios.post(url, payloadf)
      .then(respons => {
        setList(respons.data.attractions);
        setLoading(false)
      })
      .catch(e => {
        console.log('failure ', e);
        setLoading(false)
      })
    }
  }

  React.useEffect(() => {
    if(creviews || calphabet || categories.length > 0) {
      filterList();
    } else {
      getList();
    }
  }, [creviews, calphabet, categories]);
  
  const handleClick = () => {
    setGridfilter(!gridfilter);
  }

  function starLoop(stars) {
    var tag = [];
    var i;
    for( i = 0; i < stars; i++ ) {
      tag.push(<i key={i} className='fas fa-star'></i>);
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

  const byDistance = () => {
    if( cdistance ) {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async function(position) {
            setLoading(true);

            var latit = position.coords.latitude.toString();
            var longit = position.coords.longitude.toString();

            const url = `${config.api_host}/api/search/attractions`;
            if( cdistance && categories.length < 1 ) {  
              var payload = {
                sort_by : "distance",
                latitude : latit,
                longitude : longit
              }
            }
            if( cdistance && categories.length > 0 ) {
              var payload = {
                sort_by : "distance",
                latitude : latit,
                longitude : longit,
                categories : categories
              }
            }
            Axios.post(url, payload)
            .then(resp => {
              setLoading(false)
              console.log('list distance ', resp);
              setList(resp.data.attractions);
            })
            .catch(er => {
              setLoading(false)
              console.log('failure ', er);
            })
          }
        )
      }
    }
  }

  React.useMemo(() => {
    byDistance();
  }, [cdistance]);

  const categoryHandle = (item) => {
    console.log('item: ',item);
    if( categories.includes(item) ) {
      setCategories(categories.filter(cat => cat != item));
    } else {
      setCategories([...categories, item]);
    }
  }

  const checkHandler = e => {
    const value = e.target.value;

    categoryHandle(value);
  }

  const GPSHandle = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lati = position.coords.latitude;
        var longi = position.coords.longitude;
        dispatch({type: 'SET_LOC', lati: lati, longi: longi});
        console.log('lat long set');
      })
    }
    else {
      alert('your browser is not supported gps feature');
    }
  }


  return(
    <Fragment>
      <div className="spots-wrapper listpage">
        <div className="list-title">
          <div className="filter-wrapper">
            <p>filter</p>
            <input type="checkbox" onClick={e => {handleClick(e);GPSHandle(e)}} id="filter-toggle"/>
            <label htmlFor="filter-toggle">
              <span className="fil-span"></span>
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
                  <input type="radio" name="sortBy" onClick={_ => setCreviews(!creviews)} className="visually-hidden" id="reviews"/>
                  <label htmlFor="reviews" className="sortby-label r">reviews</label>
                </div>
                <div className="reviews-btn">
                  <input type="radio" name="sortBy" onClick={_ => setCdistance(!cdistance)} className="visually-hidden" id="distance"/>
                  <label htmlFor="distance" className="sortby-label d">distance</label>
                </div>
                <div className="reviews-btn">
                  <input type="radio" name="sortBy" onClick={_ => setCalphabet(!calphabet)} className="visually-hidden" id="alphabet"/>
                  <label htmlFor="alphabet" className="sortby-label a">alphabet</label>
                </div>
              </div>
            </div>
            <hr className="line-divider"/>
            {console.log('CATEGORIES ', categories)}
            <div className="types-tunel">
              <div className="types-tunel-title">
                <p>types of attractions</p>
                <button>reset</button>
              </div>
              <div className="types-checkbox">
                <ul>
                  <li>
                    <div className="type-checkbox">
                      <input type="checkbox" value="mountain" onClick={e => checkHandler(e)} id="mountain-box"/>
                      <label htmlFor="mountain-box">
                        <span className="checkmark"></span>
                      </label>
                      <p className="label-title">mountain</p>
                    </div>
                  </li>
                  <li>
                    <div className="type-checkbox">
                      <input type="checkbox" value="beach" onClick={e => checkHandler(e)} id="beach-box"/>
                      <label htmlFor="beach-box">
                        <span className="checkmark"></span>
                      </label>
                      <p className="label-title">beach</p>
                    </div>
                  </li>
                  <li>
                    <div className="type-checkbox">
                      <input type="checkbox" value="museum" onClick={e => checkHandler(e)} id="museum-box"/>
                      <label htmlFor="museum-box">
                        <span className="checkmark"></span>
                      </label>
                      <p className="label-title">museum</p>
                    </div>
                  </li>
                  <li>
                    <div className="type-checkbox">
                      <input type="checkbox" value="zoo" onClick={e => checkHandler(e)} id="zoo-box"/>
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
                          <input type="checkbox" value="recreation" onClick={e => checkHandler(e)} id="recreation-box"/>
                          <label htmlFor="recreation-box">
                            <span className="checkmark"></span>
                          </label>
                          <p className="label-title">recreation</p>
                        </div>
                      </li>
                      <li>
                        <div className="type-checkbox">
                          <input type="checkbox" value="lake" onClick={e => checkHandler(e)} id="lake-box"/>
                          <label htmlFor="lake-box">
                            <span className="checkmark"></span>
                          </label>
                          <p className="label-title">lake</p>
                        </div>
                      </li>
                      <li>
                        <div className="type-checkbox">
                          <input type="checkbox" value="waterpark" onClick={e => checkHandler(e)} id="waterpark-box"/>
                          <label htmlFor="waterpark-box">
                            <span className="checkmark"></span>
                          </label>
                          <p className="label-title">waterpark</p>
                        </div>
                      </li>
                      <li>
                        <div className="type-checkbox">
                          <input type="checkbox" value="waterfall" onClick={e => checkHandler(e)} id="waterfall-box"/>
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
            <hr className="line-divider dua"/>
            <div className="map">
              <MapContainer center={[PositionReducer.lat, PositionReducer.long]} zoom={10}/>
            </div>
          </div>
          <div className={gridfilter ? "main-list-filter" : "main-list"}>
            {loading ? (
              <Fragment>
                {skeletonCard(6)}
              </Fragment>
            ) : 
            (
              <Fragment>
                {props.resulta.length > 0 ? 
                  props.resulta.map((wisata) => 
                  <NavLink className="crd" to="/detail">
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
                      {loading ? '' : <i className="fas fa-map-marker-alt"></i>}
                      <p className="location-name">{wisata.city}</p>
                    </div>
                  </NavLink>
                ) : list.map((wisata, index) => 
                    <NavLink className="crd" to="/detail" key={index}>
                      <div className="img-wrapper">
                        <LazyLoadImage src={`${config.api_host}/api/images/${wisata.images[0].id}`} width="100%" placeholderSrc="/images/placeholder.png" effect="blur" alt="place img"/>
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
                        {loading ? '' : <i className="fas fa-map-marker-alt"></i>}
                        <p className="location-name">{wisata.city}</p>
                      </div>
                    </NavLink>
                  )
                }
              </Fragment>
            )
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default ListGrid;