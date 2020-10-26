import React, { Fragment } from 'react';
import AbS from '../../svg/travel.svg';

const Board = () => {
  return(
    <Fragment>
      <div className="search-box-wrapper">
        <div className="search-box list-page">
          <div className="find">
            <i className="fas fa-search"></i>
            <input type="text" name="search" placeholder="what you would like to find?"/>
          </div>
          <div className="vl"></div>
          <div className="anywhere">
            <i className="fas fa-map-marker-alt"></i>
            <input type="text" name="search" placeholder="anywhere"/>
          </div>
          <div className="category-search-box">
            <select className="select-category">
              <option selected>All</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <i className="fas fa-chevron-up"></i>
            <i className="fas fa-chevron-down"></i>
          </div>
          <button type="submit" className="btn-search-box">search</button>
        </div>
      </div>
      <div className="about-us">
        <div className="about-title-wrapper">
          <p className="about-title">about us</p>
          <p className="about-text">
            as a trusted travel agency, we aim to satisfy our customers by providing the utmost best service.
            we believe that everything we do for you will be a new experience in enjoying your whole journey which is very enjoyable.
          </p>
        </div>
        <div className="about-image-svg">
          <img src={AbS} alt="teamwork" />
        </div>
      </div>
    </Fragment>
  );
}
export default Board;