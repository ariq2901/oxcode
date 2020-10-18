import React, { Component, Fragment } from 'react';
import {NavLink} from 'react-router-dom';
import '../../App.css';
import Groupone from '../../img/icon/groupone.png';
import Axios from 'axios';
import { config } from '../../config';

const Nav = () => {
  const [category, setCategory] = React.useState([]);
  const [megamenu, SetMegamenu] = React.useState(false);
  const [navbar, setNavbar] = React.useState(false);
  const [hamburger, setHamburger] = React.useState(false);

  const getCategory = async () => {
    try {
      const respon = await Axios.get(`${config.api_host}/api/categories`);
      // setList(respon.data);
      setCategory(respon.data.data);
      
    } catch(e) {
      console.error('error feching data', e);
    }
  }

  // const getImageById = () => {
  //   try {
  // }
  // catch(e) {
  //   console.error('error fetching', e);
  // }
  //   // console.log('calist', calist);
  //   // console.log('categories ', category);
  // }

  // const getImage = () => {
  //   const imageMap = category.map((item) => item.image);
  //   const image = imageMap.map((icon) => icon.id);
  //   const imageData = category.map((data) => data.push(image));
  //   // console.log('image', image);
  //   // imageData.push(image);
  //   console.log('category final', imageData);
  // }
  
  React.useEffect(() => {
    getCategory();
  }, []);


  
  const changeNavbar = () => {
    if(window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }
  
  window.addEventListener('scroll', changeNavbar);

  const onHamburger = () => {
    setHamburger(!hamburger);
  }

  const onMegamenu = () => {
    SetMegamenu(!megamenu);
  }


  return(
    <Fragment>
      <nav className={ navbar ? 'nav-scrolled' : megamenu ? 'nav-white' : ''}>
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
                  <input type="checkbox" onClick={onMegamenu} id="megamenu-check"/>
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
        <div className={megamenu ? "megamenu" : "megamenu-hidden"}>
          <div className="container pt-4">
            <div className="megamenu-title">
              <div className="p-categories">
                <p className="popular-title">popular categories</p>
                <p className="popular-link">view all</p>
              </div>
              <div className="p-searches">
                <p className="popular-searches">popular searches</p>
              </div>
            </div>
            <div className="megamenu-main">
              {console.log(category)}
              <div className="category-list">
              {category.map((item) => 
                <div className="category-wrapper">
                  <img src={`${config.api_host}/api/images/${item.image.id}`} alt="icon" />
                  <p>{item.name}</p>
                </div>
              )}
              </div>
              <div className="search-list">
                <div className="search-wrapper">
                  <i class="fas fa-search"></i>
                  <p>bromo</p>
                </div>
                <div className="search-wrapper">
                  <i class="fas fa-search"></i>
                  <p>dufan</p>
                </div>
                <div className="search-wrapper">
                  <i class="fas fa-search"></i>
                  <p>ancol</p>
                </div>
                <div className="search-wrapper">
                  <i class="fas fa-search"></i>
                  <p>taman safari</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
export default Nav;