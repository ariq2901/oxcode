import React, { Fragment, useRef, useEffect, useState } from 'react';
import WorldMap from '../../img/home/worldmap.png';
import Typical from 'react-typical';
import '../../App.css';
import Axios from 'axios';
import { config } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const Board = ({result}) => {

  const CategoryReducer = useSelector(state => state.CategoryReducer);
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
    var namaa = document.getElementById("searchName").value;
    var cityy = document.getElementById("searchCity").value;
    var category = document.getElementById("searchCategory").value;
    let payloadk = {};
    if( namaa.length > 0 && cityy.length > 0 && category !== null ) {
      payloadk = {
        name : namaa,
        city : cityy,
        categories : [category]
      }
    }
    if( namaa.length > 0 && cityy.length > 0 && category === null ) {
      payloadk = {
        name : namaa,
        city : cityy
      }
    }
    if( namaa.length > 0 && cityy.length < 1 && category !== null ) {
      payloadk = {
        name : namaa,
        categories : [category]
      }
    }
    if( cityy.length > 0 && namaa.length < 1 && category !== null ) {
      payloadk = {
        city : cityy,
        categories : [category]
      }
    }
    if( namaa.length > 0 && cityy.length < 1 && category === null ) {
      payloadk = {
        name : namaa
      }
    }
    if( namaa.length < 1 && cityy.length > 0 && category === null ) {
      payloadk = {
        city : cityy
      }
    }
    if( namaa.length < 1 && cityy.length < 1 && category !== null ) {
      payloadk = {
        categories : [category]
      }
    }
    console.log('payload onKydown ', payloadk);
    Axios.post(url, payloadk)
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
    var namaa = document.getElementById("searchName").value
    var cityy = document.getElementById("searchCity").value
    var category = document.getElementById("searchCategory").value;
    let payloads = {};
    
    if( namaa.length > 0 && cityy.length > 0 && category !== null ) {
      payloads = {
        name : namaa,
        city : cityy,
        categories : [category]
      }
    }
    if( namaa.length > 0 && cityy.length > 0 && category === null ) {
      payloads = {
        name : namaa,
        city : cityy
      }
    }
    if( namaa.length > 0 && cityy.length < 1 && category !== null ) {
      payloads = {
        name : namaa,
        categories : [category]
      }
    }
    if( cityy.length > 0 && namaa.length < 1 && category !== null ) {
      payloads = {
        city : cityy,
        categories : [category]
      }
    }
    if( namaa.length > 0 && cityy.length < 1 && category === null ) {
      payloads = {
        name : namaa
      }
    }
    if( namaa.length < 1 && cityy.length > 0 && category === null ) {
      payloads = {
        city : cityy
      }
    }
    if( namaa.length < 1 && cityy.length < 1 && category !== null ) {
      payloads = {
        categories : [category]
      }
    }
    Axios.post(url, payloads)
    .then(respons => {
      result(respons.data.attractions)
      dispatch({type: 'SET_RESULT', result: respons.data.attractions});
      history.push('/list-attraction');
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
          <p className="big-title">{display ? "find your destination" : <Typical steps={[`find your destination`, 4000, 'find your exploration', 4000, 'find your happiness', 4000]} loop="1" wrapper="p"/>}</p>
          <p className="slogant-title">this is the start of your journey, don't let other people hold your move. get your own way</p>
        </div>
        <div className="worldmap-img">
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
            <select onClick={() => setDisplay(!display)} onChange={event => {keyDownHandler(event);setCategories(event.target.value)}} id="searchCategory" value={CategoryReducer.category ? CategoryReducer.category : categories} className="select-category">
                <option selected value="" key="">All</option>
                {CategoryReducer.category.map((c) =>
                  <option value={c.name} key={c.name}>{c.name}</option>
                )}
              </select>
              <i className="fas fa-chevron-up"></i>
              <i className="fas fa-chevron-down"></i>
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