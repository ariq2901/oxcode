import React, { Fragment, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../config';
import { useEffect } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const Board = ({ result }) => {
  const CategoryReducer = useSelector(state => state.CategoryReducer);
  const BoardHome = useSelector(state => state.ResultReducer);
  const dispatch = useDispatch();
  let history = useHistory();

  const [options, setOptions] = useState([]);
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState([]);
  const [searchKota, setSearchKota] = useState("");
  const [categories, setCategories] = useState("");
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
    console.log('payload board HOME ', payloads);
    Axios.post(url, payloads)
    .then(respons => {
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
            <select onClick={() => setDisplay(!display)} onChange={event => {keyDownHandler(event);setCategories(event.target.value)}} id="searchCategory" value={categories} class="select-category">
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