import React, { Fragment, Component, useRef, useEffect } from 'react';
import WorldMap from '../../img/home/worldmap.png';
import Typical from 'react-typical';
import '../../App.css';
import Axios from 'axios';
import { config } from '../../config';

const Board = ({result}) => {
  const [options, setOptions] = React.useState([]);
  const [display, setDisplay] = React.useState(false);
  const [search, setSearch] = React.useState([]);
  const wrapperRef = useRef(null);
  const [hasil, setHasil] = React.useState([]);
  const [searchName, setSearchName] = React.useState("");
  const [searchCity, setSearchCity] = React.useState("");
  const [searchCat, setSearchCat] = React.useState("");
  const [searchFrom, setSearchFrom] = React.useState("00:00");
  const [searchTo, setSearchTo] = React.useState("00:00");

  const keyDownHandler = event => {
    event.preventDefault()
    const url = `${config.api_host}/api/attractions/search`;
    const payload = {
      name : event.target.value
    }
    Axios.post(url, payload)
    .then(respons => {
      setOptions(respons.data)
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
    const url = `${config.api_host}/api/attractions/search`;
    const payload = {
      name : search
    }

    Axios.post(url, payload)
    .then(respons => {
      result(respons.data)
    })
    .catch(e => {
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
          <p className="big-title"><Typical steps={[`find your destination`, 10000, 'find your exploration', 10000, 'find your happiness', 10000]} loop={Infinity} wrapper="p"/></p>
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
              <i class="fas fa-search"></i>
              <input type="text" name="searchName" onClick={() => setDisplay(!display)} onChange={event => {keyDownHandler(event); setSearch(event.target.value)}} placeholder="what you would like to find?" value={search} />
            </div>
            <div className="vl"></div>
            <div className="anywhere">
              <i class="fas fa-map-marker-alt"></i>
              <input type="text" name="searchCity" onChange={event => setSearchCity(event.target.value)} placeholder="anywhere"/>
            </div>
            <div className="category-search-box">
              <select onChange={event => setSearchCat(event.target.value)} class="select-category">
                <option selected>All</option>
                <option value="waterpark">One</option>
                <option value="zoo">Two</option>
                <option value="mountain">Three</option>
              </select>
              <i class="fas fa-chevron-up"></i>
              <i class="fas fa-chevron-down"></i>
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
                <span><i class="fas fa-map-marker-alt"></i> &nbsp;{v.name}</span>
                <span>{v.address}</span>
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