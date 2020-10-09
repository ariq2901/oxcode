import React, { Component, Fragment } from 'react';
import {NavLink} from 'react-router-dom';
import '../../App.css';


const Nav = () => {
  const [hamburger, setHamburger] = React.useState(false);

  const onHamburger = () => {
    setHamburger(!hamburger)
    console.log(hamburger);
  }

  return(
    <Fragment>
      <nav>
        <div className="container">
          <div className="row row-nav">
          <ul className={hamburger ? "nav-links slide" : "nav-links"}>
            <li><NavLink activeClassName="navbar__link--active" className="navbar__link" exact={true} to="/">home</NavLink></li>
            <li><NavLink activeClassName="navbar__link--active" className="navbar__link" to="list-attraction">list attractions</NavLink></li>
            <li className="dropdown">
              category
              <div className="menu">
                <input type="checkbox"/>
                <i className="fas fa-chevron-down arrow-bawah"></i>
              </div>
            </li>
            <li><NavLink activeClassName="navbar__link--active" className="navbar__link" to="/about">about us</NavLink></li>
            <li><NavLink className="btn-nav-login" to="/login">login</NavLink></li>
          </ul>
          <div className="menu-toggle">
            <input type="checkbox" onClick={onHamburger}/>
            <span></span>
            <span></span>
            <span></span>
          </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
export default Nav;