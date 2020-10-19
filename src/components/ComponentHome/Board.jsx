import React, { Fragment, Component } from 'react';
import WorldMap from '../../img/home/worldmap.png';
import Typical from 'react-typical';
import '../../App.css';

const Board = () => {
  return(
    <Fragment>
      <div className="wrapper">
        <div className="slogant">
          <p className="big-title"><Typical steps={[`find your destination`, 10000, 'find your exploration', 10000, 'find your happiness', 10000]} loop={1} wrapper="p"/></p>
          <p className="slogant-title">this is the start of your journey, don't let other people hold your move. get your own way</p>
        </div>
        <div className="worldmap-img">
          <img src={WorldMap} alt="worldmap image"/>
        </div>
      </div>
      <div className="search-box-wrapper">
        <div className="search-box">
          <div className="find">
            <i class="fas fa-search"></i>
            <input type="text" name="search" placeholder="what you would like to find?"/>
          </div>
          <div className="vl"></div>
          <div className="anywhere">
            <i class="fas fa-map-marker-alt"></i>
            <input type="text" name="search" placeholder="anywhere"/>
          </div>
          <div className="category-search-box">
            <select class="select-category">
              <option selected>All</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <i class="fas fa-chevron-up"></i>
            <i class="fas fa-chevron-down"></i>
          </div>
          <button type="submit" className="btn-search-box">search</button>
        </div>
      </div>
    </Fragment>
  );
}

export default Board;