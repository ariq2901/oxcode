import React, { Component, Fragment } from 'react';
import {NavLink} from 'react-router-dom';
import '../../App.css';


const Nav = () => {
  return(
    <Fragment>
      <nav>
        <div className="container">
          <div className="row row-nav">
          <ul className="nav-links">
            <li><NavLink activeClassName="navbar__link--active" className="navbar__link" exact={true} to="/">home</NavLink></li>
            <li><NavLink activeClassName="navbar__link--active" className="navbar__link" to="list-attraction">list attractions</NavLink></li>
            <li className="dropdown">
              category
              <div className="menu">
                <input type="checkbox"/>
                <i class="fas fa-chevron-down arrow-bawah"></i>
              </div>
            </li>
            <li><NavLink activeClassName="navbar__link--active" className="navbar__link" to="/about">about us</NavLink></li>
          </ul>
          <button className="btn-nav-login">login</button>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
export default Nav;