import React, { Fragment, useRef } from 'react'
import Axios from 'axios';
import { config } from '../../config';
import { useEffect } from 'react';
import { event } from 'jquery';

const Board = ({ result }) => {
  const [options, setOptions] = React.useState([]);
  const [display, setDisplay] = React.useState(false);
  const [search, setSearch] = React.useState([]);
  const [searchKota, setSearchKota] = React.useState("");
  const wrapperRef = useRef(null);
  // const [searchName, setSearchName] = React.useState("");
  // const [searchCity, setSearchCity] = React.useState("");
  const [searchCat, setSearchCat] = React.useState("");
  // const [searchFrom, setSearchFrom] = React.useState("00:00");
  // const [searchTo, setSearchTo] = React.useState("00:00");

  const keyDownHandler = event => {
    event.preventDefault()
    const url = `${config.api_host}/api/attractions/search`;
    var namaa = document.getElementById("searchName").value
    var cityy = document.getElementById("searchCity").value

    if( namaa.length > 0 && cityy.length > 0 ) {
      var payloadk = {
        name : namaa,
        city : cityy
      }
    }
    if( namaa.length > 0 && cityy.length < 1 ) {
      var payloadk = {
        name : namaa
      }
    }
    if( namaa.length < 1 && cityy.length > 0 ) {
      var payloadk = {
        city : cityy
      }
    }

    console.log('payload onKydown ', payloadk);
    Axios.post(url, payloadk)
    .then(respons => {
      console.log('kena, ', respons);
      setOptions(respons.data.data)
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
    var namaa = document.getElementById("searchName").value
    var cityy = document.getElementById("searchCity").value

    if( namaa.length > 0 && cityy.length > 0 ) {
      var payloads = {
        name : namaa,
        city : cityy
      }
    }
    if( namaa.length > 0 && cityy.length < 1 ) {
      var payloads = {
        name : namaa
      }
    }
    if( namaa.length < 1 && cityy.length > 0 ) {
      var payloads = {
        city : cityy
      }
    }

    Axios.post(url, payloads)
    .then(respons => {
      result(respons.data.data)
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
      <div className="all-wrap">
      <div className="search-box-wrapper">
        <div className="search-box list-page">
          <form autoComplete="off" onSubmit={onSubmit}>
            <div className="find">
              <i class="fas fa-search"></i>
              <input type="text" name="searchName" id="searchName" onClick={() => setDisplay(!display)} onChange={event => {keyDownHandler(event); setSearch(event.target.value)}} placeholder="what you would like to find?" value={search} />
            </div>
            <div className="vl"></div>
            <div className="anywhere">
              <i class="fas fa-map-marker-alt"></i>
              <input type="text" name="searchCity" id="searchCity" onClick={() => setDisplay(!display)} onChange={event => {keyDownHandler(event);setSearchKota(event.target.value)}} placeholder="anywhere" value={searchKota}/>
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