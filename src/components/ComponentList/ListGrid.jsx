import { useDispatch, useSelector } from 'react-redux';
import MapContainer from '../MapContainer';
import { NavLink } from 'react-router-dom';
import Dufan from '../../img/dufan.jpg';
import React, { Fragment } from 'react';
import { config } from '../../config';
import Axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import NotfoundIMG from '../../img/home/noData.jpg';
import swal from 'sweetalert';

const ListGrid = (props) => {
  const MegamenuReducer = useSelector(state => state.MegamenuReducer);
  const PositionReducer = useSelector(state => state.PositionReducer);
  const BoardHome = useSelector(state => state.ResultReducer);
  const [gridfilter, setGridfilter] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hideFilter, setHideFilter] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [emptyList, setEmptyList] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [lPage, setLPage] = React.useState('');
  const [cPage, setCPage] = React.useState('');
  const [onPaginate, setOnPaginate] = React.useState(false);
  const dispatch = useDispatch();

  const attractions = async () => {
    try {
      setLoading(true);
      let respon;
      if (props.type) {
        getAttractionByType();
      }

      if (MegamenuReducer.category) {
        getAttractionByCategory();
      }

      if (MegamenuReducer.searches) {
        getAttractionBySearches();
      }

      if (BoardHome.data.length < 1 && BoardHome.aksi === true) {
        console.log('boardhome empty: ', BoardHome);
        setList(BoardHome.data);
      }
      if (BoardHome.data.length > 0) {
        setList(BoardHome.data);
      }
       if(BoardHome.data.length < 1 && BoardHome.aksi === false && !MegamenuReducer.category && !props.type && !onPaginate) {
        respon = await Axios.get(`${config.api_host}/api/attractions`);
        console.log('bygeneral', respon);
        setList(respon.data.attractions);
        setLPage(respon.data.meta.last_page);
        setCPage(respon.data.meta.current_page);
      }

      setLoading(false);
    } catch(e) {
      swal('ooops...', 'something went wrong, try again later', 'error');
    }
  }


  const getAttractionByCategory = async () => {
    let result;
    try {
      result = await Axios.post(`${config.api_host}/api/search/attractions`, {
        categories: [MegamenuReducer.category]
      });
    } catch (error) {
      console.log('Error: ', error);
      return;
    }
    console.log('byCategory', result);
    setList(result.data.attractions);
  }

  const getAttractionBySearches = async () => {
    let result;
    try {
      result = await Axios.post(`${config.api_host}/api/search/attractions`, {
        name: MegamenuReducer.searches
      });
    } catch (error) {
      console.log('Error: ', error);
      return;
    }
    console.log('bySearchPop', result);
    setList(result.data.attractions);
  }

  const getAttractionByType = async () => {
    let result;
    try {
      result = await Axios.get(`${config.api_host}/api/${props.type}/attractions`);
    } catch (error) {
      console.log('Error: ', error);
      return;
    }
    setList(result.data.attractions);
    setLoading(false)
  }

  React.useEffect(() => {
    attractions();
  }, [props, MegamenuReducer]);

  function skeletonCard(jumlah) {
    const skeleton = [];
    var n;
    for (n = 0; n < jumlah; n++) {
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

  const handleClick = () => {
    setGridfilter(!gridfilter);
  }

  function starLoop(stars) {
    var tag = [];
    var i;
    for (i = 0; i < stars; i++) {
      tag.push(<i key={i} className='fas fa-star'></i>);
    }
    // console.log(i);
    if (i < 5) {
      tag.push(<i key={i} className="far fa-star"></i>);
    }
    if (i < 4) {
      tag.push(<i key={i} className="far fa-star"></i>);
    }
    return tag;
  }

  const byDistance = () => {
    if (filter == 'distance' || categories.length > 0) {
      console.log('masuk ke distance');
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async function (position) {
            setLoading(true);

            const latit = position.coords.latitude.toString();
            const longit = position.coords.longitude.toString();

            const url = `${config.api_host}/api/search/attractions`;
            if (filter == 'distance' && categories.length < 1) {
              var payload = {
                sort_by: "distance",
                latitude: latit,
                longitude: longit
              }
            }
            if (filter === 'distance' && categories.length > 0) {
              var payload = {
                sort_by: "distance",
                latitude: latit,
                longitude: longit,
                categories: categories
              }
            }
            if (filter === '' && categories.length > 0) {
              var payload = {
                categories: categories
              }
            }

            console.log('BODY D', payload);
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

  const byReviews = () => {
    if (filter === 'reviews' || categories.length > 0) {
      console.log('masuk ke reviews');
      setLoading(true);
      const url = `${config.api_host}/api/search/attractions`;

      if (filter === 'reviews' && categories.length < 1) {
        var payload = {
          sort_by: "reviews",
        }
      }
      if (filter === 'reviews' && categories.length > 0) {
        var payload = {
          sort_by: "reviews",
          categories: categories
        }
      }
      if (filter === '' && categories.length > 0) {
        var payload = {
          categories: categories
        }
      }

      Axios.post(url, payload)
        .then(resp => {
          setLoading(false)
          console.log('list reviews ', resp);
          setList(resp.data.attractions);
        })
        .catch(er => {
          setLoading(false)
          console.log('failure ', er);
        })
    }
  }

  const byAlphabet = () => {
    if (filter == 'alphabet' || categories.length > 0) {
      console.log('masuk ke alphabet');
      setLoading(true);
      const url = `${config.api_host}/api/search/attractions`;

      if (filter == 'alphabet' && categories.length < 1) {
        var payload = {
          sort_by: "alphabet",
        }
      }
      if (filter == 'alphabet' && categories.length > 0) {
        var payload = {
          sort_by: "alphabet",
          categories: categories
        }
      }
      if (filter == '' && categories.length > 0) {
        var payload = {
          categories: categories
        }
      }

      Axios.post(url, payload)
        .then(resp => {
          setLoading(false)
          console.log('list alphabet ', resp);
          setList(resp.data.attractions);
        })
        .catch(er => {
          setLoading(false)
          console.log('failure ', er);
        })
    }
  }

  React.useEffect(() => {
    if (filter == 'distance' || categories.length > 0 && filter != 'reviews' && filter != 'alphabet') {
      byDistance();
    }
    if (filter == 'reviews' || categories.length > 0 && filter != 'alphabet' && filter != 'distance') {
      byReviews();
    }
    if (filter == 'alphabet' || categories.length > 0 && filter != 'reviews' && filter != 'distance') {
      byAlphabet();
    }
  }, [filter, categories]);

  const categoryHandle = (item) => {
    if (categories.includes(item)) {
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lati = position.coords.latitude;
        var longi = position.coords.longitude;
        dispatch({ type: 'SET_LOC', lati: lati, longi: longi });
        console.log('lat long set');
      })
    }
    else {
      alert('your browser is not supported gps feature');
    }
  }

  const IsiKonten = () => {
    if (list.length > 0) {
      return (
        <Fragment>
          {props.resulta.length > 0 ? 
            props.resulta.map((wisata, index) => 
            <NavLink className="crd" to={`/detail/${wisata.id}`} key={index}>
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
              <NavLink className="crd" to={`/detail/${wisata.id}`} key={index}>
                <div className="img-wrapper">
                  <LazyLoadImage src={`${config.api_host}/api/images/${wisata.images[0].id}`} width="100%" placeholderSrc="/images/placeholder.png" alt="place img" />
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
      );
    } else {
      setHideFilter(true);
      return (
        <Fragment>
          <div></div>
          <div className="search-notfound">
            <div className="notfound-img">
              <img src={NotfoundIMG} alt="notfound img" />
            </div>
            <div className="notfound-text">
              <p className="info-ttl">Sad no result!</p>
              <p className="info-txt">We cannot find the tourist attraction you're searching for. maybe a little spelling mistake</p>
            </div>
          </div>
          <div></div>
        </Fragment>
      );
    }
  }

  const onPrev = () => {
    setLoading(true);
    const laman = cPage - 1;
    const url = `${config.api_host}/api/attractions?page=${laman}`;
    Axios.get(url)
    .then(resp => {
      console.log('resp onpage', resp);
      setList(resp.data.attractions);
      setOnPaginate(true);
      setCPage(resp.data.meta.current_page);
      if(resp.data.attractions.length < 5) {
        dispatch({type: 'SET_HEIGHT', height: true})
      }
      if(resp.data.attractions.length > 5) {
        dispatch({type: 'SET_HEIGHT', height: false})
      }
      setLoading(false);
    })
  }
  
  const onPage = e => {
    setLoading(true);
    const laman = e.target.value;
    const url = `${config.api_host}/api/attractions?page=${laman}`;
    Axios.get(url)
    .then(resp => {
      console.log('resp onpage', resp);
      setList(resp.data.attractions);
      setOnPaginate(true);
      setCPage(resp.data.meta.current_page);
      if(resp.data.attractions.length < 5) {
        dispatch({type: 'SET_HEIGHT', height: true})
      }
      if(resp.data.attractions.length > 5) {
        dispatch({type: 'SET_HEIGHT', height: false})
      }
      setLoading(false);
    })
  }
  
  const onNext = () => {
    setLoading(true);
    const laman = cPage + 1;
    const url = `${config.api_host}/api/attractions?page=${laman}`;
    Axios.get(url)
    .then(resp => {
      console.log('resp onpage', resp);
      setList(resp.data.attractions);
      setOnPaginate(true);
      setCPage(resp.data.meta.current_page);
      if(resp.data.attractions.length < 5) {
        dispatch({type: 'SET_HEIGHT', height: true})
      }
      if(resp.data.attractions.length > 5) {
        dispatch({type: 'SET_HEIGHT', height: false})
      }
      setLoading(false);
    })
  }
  
  const paginate = (juml) => {
    const hal = [];
    for(var h=1; h <= juml; h++) {
      hal.push(<li key={h} className={`page-item ${cPage === h ? 'active' : ''}`}><button name="button" disabled={cPage === h} value={h} onClick={onPage} className="page-link">{h}</button></li>)
    }
    return hal;
  }

  return (
    <Fragment>
      <div className="spots-wrapper listpage">
        <div className="list-title">
          <div className={hideFilter ? "filter-wrapper hide" : "filter-wrapper"}>
            <p>filter</p>
            <input type="checkbox" onClick={e => { handleClick(e); GPSHandle(e) }} id="filter-toggle" />
            <label htmlFor="filter-toggle">
              <span className="fil-span"></span>
            </label>
          </div>
          <p>list attractions</p>
          {console.log('list', list)}
        </div>
        <div className={gridfilter ? "grid-filter" : "grid-wrapper"}>
          <div className={gridfilter ? "filter-panel show" : "filter-panel none"}>
            <div className="sortby-tunel">
              <p>sort by</p>
              <div className="sort-checkbox">
                <div className="reviews-btn">
                  <input type="radio" name="sortBy" onChange={e => { byReviews(e); setFilter(e.target.value) }} className="visually-hidden" value="reviews" id="reviews" />
                  <label htmlFor="reviews" className="sortby-label r">reviews</label>
                </div>
                <div className="reviews-btn">
                  <input type="radio" name="sortBy" onChange={e => { byDistance(e); setFilter(e.target.value) }} className="visually-hidden" value="distance" id="distance" />
                  <label htmlFor="distance" className="sortby-label d">distance</label>
                </div>
                <div className="reviews-btn">
                  <input type="radio" name="sortBy" onChange={e => { byAlphabet(e); setFilter(e.target.value) }} className="visually-hidden" value="alphabet" id="alphabet" />
                  <label htmlFor="alphabet" className="sortby-label a">alphabet</label>
                </div>
              </div>
            </div>
            <hr className="line-divider" />
            <div className="types-tunel">
              <div className="types-tunel-title">
                <p>types of attractions</p>
                <button>reset</button>
              </div>
              <div className="types-checkbox">
                <ul>
                  <li>
                    <div className="type-checkbox">
                      <input type="checkbox" value="mountain" onChange={e => checkHandler(e)} id="mountain-box" />
                      <label htmlFor="mountain-box">
                        <span className="checkmark"></span>
                      </label>
                      <p className="label-title">mountain</p>
                    </div>
                  </li>
                  <li>
                    <div className="type-checkbox">
                      <input type="checkbox" value="beach" onChange={e => checkHandler(e)} id="beach-box" />
                      <label htmlFor="beach-box">
                        <span className="checkmark"></span>
                      </label>
                      <p className="label-title">beach</p>
                    </div>
                  </li>
                  <li>
                    <div className="type-checkbox">
                      <input type="checkbox" value="museum" onChange={e => checkHandler(e)} id="museum-box" />
                      <label htmlFor="museum-box">
                        <span className="checkmark"></span>
                      </label>
                      <p className="label-title">museum</p>
                    </div>
                  </li>
                  <li>
                    <div className="type-checkbox">
                      <input type="checkbox" value="zoo" onClick={e => checkHandler(e)} id="zoo-box" />
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
                          <input type="checkbox" value="recreation" onClick={e => checkHandler(e)} id="recreation-box" />
                          <label htmlFor="recreation-box">
                            <span className="checkmark"></span>
                          </label>
                          <p className="label-title">recreation</p>
                        </div>
                      </li>
                      <li>
                        <div className="type-checkbox">
                          <input type="checkbox" value="lake" onClick={e => checkHandler(e)} id="lake-box" />
                          <label htmlFor="lake-box">
                            <span className="checkmark"></span>
                          </label>
                          <p className="label-title">lake</p>
                        </div>
                      </li>
                      <li>
                        <div className="type-checkbox">
                          <input type="checkbox" value="waterpark" onClick={e => checkHandler(e)} id="waterpark-box" />
                          <label htmlFor="waterpark-box">
                            <span className="checkmark"></span>
                          </label>
                          <p className="label-title">waterpark</p>
                        </div>
                      </li>
                      <li>
                        <div className="type-checkbox">
                          <input type="checkbox" value="waterfall" onClick={e => checkHandler(e)} id="waterfall-box" />
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
            <hr className="line-divider dua" />
            <div className="map">
              <MapContainer center={[PositionReducer.lat, PositionReducer.long]} zoom={5} />
            </div>
          </div>
          <div className={gridfilter ? "main-list-filter" : "main-list"}>
            {loading ? (
              <Fragment>
                {skeletonCard(6)}
              </Fragment>
            ) :
              (
                <IsiKonten />
              )
            }
          </div>
        </div>
        <ul className="pagination-wrapper">
          <li className="page-item"><button name="button" disabled={cPage < 2} onClick={onPrev} className="page-link">prev</button></li>
          {paginate(lPage)}
          <li className="page-item"><button name="button" disabled={cPage === lPage} onClick={onNext} className="page-link">next</button></li>
        </ul>
      </div>
    </Fragment>
  );
}

export default ListGrid;