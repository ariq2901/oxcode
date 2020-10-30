import React, { Fragment, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorldMap from '../../img/home/worldmap.png';
import { useHistory } from 'react-router-dom';
import { config } from '../../config';
import Typical from 'react-typical';
import swal from 'sweetalert';
import Axios from 'axios';
import '../../App.css';

const Board = ({result}) => {

  const CategoryReducer = useSelector(state => state.CategoryReducer);
  const BoardHome = useSelector(state => state.ResultReducer);
  const dispatch = useDispatch();
  let history = useHistory();

  const [options, setOptions] = useState([]);
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState([]);
  const [searchKota, setSearchKota] = React.useState("");
  const [categories, setCategories] = React.useState("");
  const wrapperRef = useRef(null);
  // const [hasil, setHasil] = useState([]);
  // const [searchName, setSearchName] = useState("");
  // const [searchCity, setSearchCity] = useState("");
  // const [searchCat, setSearchCat] = useState("");
  // const [searchFrom, setSearchFrom] = useState("00:00");
  // const [searchTo, setSearchTo] = useState("00:00");

  const keyDownHandler = event => {
    event.preventDefault()
    const url = `${config.api_host}/api/search/attractions`;
    var name = document.getElementById("searchName").value;
    var city = document.getElementById("searchCity").value;
    var category = document.getElementById("searchCategory").value;
    let payload = {};
     
    if (name.length > 0) {
      payload = {...payload, name};
    }
    
    if (city.length > 0) {
      payload = {...payload, city};
    }
    
    if (category !== null) {
      payload = {...payload, categories: [category]};
    }
    console.log('payload onKydown ', payload);
    Axios.post(url, payload)
    .then(respons => {
      setOptions(respons.data.attractions)
    })
    .catch(err => {
      console.log('failure ', err);
    })
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = event => {
    const {current: wrap} = wrapperRef;
    if( wrap && !wrap.contains(event.target) ) {
      setDisplay(false);
    }
  }

  const onSubmit = event => {
    event.preventDefault()
    const url = `${config.api_host}/api/search/attractions`;
    var name = document.getElementById("searchName").value
    var city = document.getElementById("searchCity").value
    var category = document.getElementById("searchCategory").value;
    let payload = {};
     
    if (name.length > 0) {
      payload = {...payload, name};
    }
    
    if (city.length > 0) {
      payload = {...payload, city};
    }
    
    if (category !== null) {
      payload = {...payload, categories: [category]};
    }
    console.log('payload board HOME ', payload);
    Axios.post(url, payload)
    .then(respons => {
      result(respons.data.attractions)
      console.log('respon board submit', respons);
      dispatch({type: 'SET_RESULT', aData: "data", aValue: respons.data.attractions});
      dispatch({type: 'SET_RESULT', aData: "aksi", aValue: true});
      history.push("/list-attraction");
    })
    .catch(e => {
      swal("ooops...", "there is an internal error, try again later", "error");
      console.log("error ", e);
    })
  }

  const setPlace = place => {
    setSearch(place);
    console.log('place', place);
    setDisplay(false);
  }

  return(
    <Fragment>
      <div className="wrapper">
        <div className="slogant">
          <p className="big-title">find your destination</p>
          <p className="slogant-title">this is the start of your journey, don't let other people hold your move. get your own way</p>
        </div>
        <div className="worldmap-img">
          {console.log('BOARDHOME ', BoardHome)}
          <img src={WorldMap} alt="worldmap image"/>
        </div>
      </div>
      <div className="all-wrap">
      <div className="search-box-wrapper">
        <div className="search-box list-page">
          <form autoComplete="off" onSubmit={onSubmit}>
            <div className="find">
              <i className="fas fa-search"></i>
              <input type="text" name="searchName" id="searchName" onClick={() => setDisplay(!display)} onChange={event => {keyDownHandler(event); setSearch(event.target.value)}} placeholder="what you would like to find?" value={search} />
            </div>
            <div className="vl"></div>
            <div className="anywhere">
              <i className="fas fa-map-marker-alt"></i>
              <input type="text" name="searchCity" id="searchCity" onClick={() => setDisplay(!display)} onChange={event => {keyDownHandler(event);setSearchKota(event.target.value)}} placeholder="anywhere" value={searchKota}/>
            </div>
            <div className="category-search-box">
            <select onClick={() => setDisplay(!display)} onChange={event => {keyDownHandler(event);setCategories(event.target.value)}} id="searchCategory" value={categories} className="select-category">
                <option defaultValue value="" key="">All</option>
                {CategoryReducer.category.map((c) =>
                  <option value={c.name} key={c.name}>{c.name}</option>
                )}
              </select>
              <div className="chev-option">
                <i className="fas fa-chevron-up"></i>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
            <button type="submit" className="btn-search-box">search</button>
          </form>
        </div>
      </div>
      {display && (
        <div  ref={wrapperRef} className="autoContainer">
          {options.slice(0, 5).map((v, i) => {
            return (
              <div onClick={() => setPlace(v.name)} className="autoOption" key={i} tabIndex="0">
                {console.log('v', v)}
                <div className="iconOption">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="nameOption">
                  <span>{v.name}</span>
                  <span>{v.city}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
      </div>
    </Fragment>
  );
}

export default Board;