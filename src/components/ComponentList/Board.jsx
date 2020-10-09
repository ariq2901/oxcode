import React, { Fragment } from 'react'

const Board = () => {
  return(
    <Fragment>
      <div className="search-box-wrapper">
        <div className="search-box list-page">
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