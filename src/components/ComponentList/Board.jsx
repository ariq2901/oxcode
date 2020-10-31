import React, { Fragment, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../config';
import { useEffect } from 'react';
import Axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const Board = ({ result }) => {
  let history = useHistory();
  const CategoryReducer = useSelector(state => state.CategoryReducer);
  const dispatch = useDispatch();
  const [searchKota, setSearchKota] = React.useState("");
  const [categories, setCategories] = React.useState("");
  const [display, setDisplay] = React.useState(false);
  let [attractions, setAttractions] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  const wrapperRef = useRef(null);

  const keyDownHandler = async (event) => {
    event.preventDefault()
    const attractions = await getFilteredAttractions();
    setAttractions(attractions);
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

  const onSubmit = async (event) => {
    event.preventDefault()
    const attractions = await getFilteredAttractions();
    result(attractions);
    
    dispatch({type: 'SET_RESULT', aData: "data", aValue: attractions});
    dispatch({type: 'SET_RESULT', aData: "aksi", aValue: true});
    console.log('onSubmit: ', attractions);
  }

  const setPlace = place => {
    setSearch(place);
    setDisplay(false);
  }

  const getFilteredAttractions = async () => {
    let result = [];
    const url = `${config.api_host}/api/search/attractions`;
    let name = document.getElementById("searchName").value;
    let city = document.getElementById("searchCity").value;
    let category = document.getElementById("searchCategory").value;
    let payload = {};
    
    if (name.length > 0) {
      payload = {...payload, name};
    }
    
    if (city.length > 0) {
      payload = {...payload, city};
    }

    if (category == "all") {
      history.push("/list-attraction");
      return false;
    }
    if (category !== null && category != "all") {
      payload = {...payload, categories: [category]};
    }
    console.log('payload board LIST ', payload);
    try {
      result = await Axios.post(url, payload);
      console.log('isi: ', result);
    } catch (error) {
      swal("ooops...", "there is an internal server error, try again later", "error");
      return null;
    }
    
    return result.data.attractions;
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
              <select onClick={() => setDisplay(!display)} onChange={event => {setCategories(event.target.value)}} id="searchCategory" value={categories} className="select-category">
                <option value="all">All</option>
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
          {attractions.slice(0, 5).map((v, i) => {
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