import React, { Component, Fragment } from 'react';
import {NavLink} from 'react-router-dom';
import '../../App.css';


const Nav = () => {
  const [navbar, setNavbar] = React.useState(false);
  const [hamburger, setHamburger] = React.useState(false);

  const changeNavbar = () => {
    if(window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  window.addEventListener('scroll', changeNavbar);

  const onHamburger = () => {
    setHamburger(!hamburger)
    console.log(hamburger);
  }

  return(
    <Fragment>
      <nav className={navbar ? 'nav-scrolled' : ''}>
        <div className="container">
          <div className="row row-nav">
            <ul className={hamburger ? "nav-links slide" : "nav-links"}>
              <li><NavLink activeClassName="navbar__link--active" className="navbar__link" exact={true} to="/">home</NavLink></li>
              <li><NavLink activeClassName="navbar__link--active" className="navbar__link" to="list-attraction">list attractions</NavLink></li>
              <li className="dropdown">
                <label htmlFor="megamenu-check" className="megamenu-check-label">
                  category
                </label>
                <div className="menu">
                  <input type="checkbox" id="megamenu-check"/>
                  <i className="fas fa-chevron-down arrow-bawah"></i>
                </div>
              </li>
              <li><NavLink activeClassName="navbar__link--active" className="navbar__link" to="/about">about us</NavLink></li>
              <li className="btn-log"><NavLink className="btn-nav-login" to="/login">login</NavLink></li>
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