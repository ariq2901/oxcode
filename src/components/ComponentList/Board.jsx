import React, { Fragment, useRef } from 'react'
import { useSelector } from 'react-redux';
import { config } from '../../config';
import { useEffect } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';

const Board = ({ result }) => {
  const CategoryReducer = useSelector(state => state.CategoryReducer);

  const [searchKota, setSearchKota] = React.useState("");
  const [categories, setCategories] = React.useState("");
  const [display, setDisplay] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  const wrapperRef = useRef(null);

  const keyDownHandler = event => {
    event.preventDefault()
    const url = `${config.api_host}/api/search/attractions`;
    var namaa = document.getElementById("searchName").value;
    var cityy = document.getElementById("searchCity").value;
    var category = document.getElementById("searchCategory").value;

    if( namaa.length > 0 && cityy.length > 0 && category !== null ) {
      var payloadk = {
        name : namaa,
        city : cityy,
        categories : [category]
      }
    }
    if( namaa.length > 0 && cityy.length > 0 && category === null ) {
      var payloadk = {
        name : namaa,
        city : cityy
      }
    }
    if( namaa.length > 0 && cityy.length < 1 && category !== null ) {
      var payloadk = {
        name : namaa,
        categories : [category]
      }
    }
    if( cityy.length > 0 && namaa.length < 1 && category !== null ) {
      var payloadk = {
        city : cityy,
        categories : [category]
      }
    }
    if( namaa.length > 0 && cityy.length < 1 && category === null ) {
      var payloadk = {
        name : namaa
      }
    }
    if( namaa.length < 1 && cityy.length > 0 && category === null ) {
      var payloadk = {
        city : cityy
      }
    }
    if( namaa.length < 1 && cityy.length < 1 && category !== null ) {
      var payloadk = {
        categories : [category]
      }
    }
    Axios.post(url, payloadk)
    .then(respons => {
      setOptions(respons.data.attractions)
    })
    .catch(err => {
      swal("ooops...", "there is an internal server error, try again later", "error");
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

    if( namaa.length > 0 && cityy.length > 0 && category !== null ) {
      var payloads = {
        name : namaa,
        city : cityy,
        categories : [category]
      }
    }
    if( namaa.length > 0 && cityy.length > 0 && category === null ) {
      var payloads = {
        name : namaa,
        city : cityy
      }
    }
    if( namaa.length > 0 && cityy.length < 1 && category !== null ) {
      var payloads = {
        name : namaa,
        categories : [category]
      }
    }
    if( cityy.length > 0 && namaa.length < 1 && category !== null ) {
      var payloads = {
        city : cityy,
        categories : [category]
      }
    }
    if( namaa.length > 0 && cityy.length < 1 && category === null ) {
      var payloads = {
        name : namaa
      }
    }
    if( namaa.length < 1 && cityy.length > 0 && category === null ) {
      var payloads = {
        city : cityy
      }
    }
    if( namaa.length < 1 && cityy.length < 1 && category !== null ) {
      var payloads = {
        categories : [category]
      }
    }

    Axios.post(url, payloads)
    .then(respons => {
      result(respons.data.attractions)
    })
    .catch(e => {
      swal("ooops...", "there is an internal server error, try again later", "error");
    })
  }

  const setPlace = place => {
    setSearch(place);
    setDisplay(false);
  }

  return(
    <Fragment>
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
                <option selected value="" key="">All</option>
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