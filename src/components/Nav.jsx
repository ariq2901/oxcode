import React, { Fragment } from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import Skytours from '../img/logo/logo.png';
import Axios from 'axios';
import { config } from '../config';
import Loader from 'react-loader-spinner';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import swal from 'sweetalert';

const Nav = () => {
  const LoginReducer = useSelector(state => state.LoginReducer);
  const CategoryReducer = useSelector(state => state.CategoryReducer);
  const dispatch = useDispatch();
  let history = useHistory();

  const [auth, setAuth] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [picture, setPicture] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [category, setCategory] = React.useState([]);
  const [megamenu, setMegamenu] = React.useState(false);
  const [navbar, setNavbar] = React.useState(false);
  const [hamburger, setHamburger] = React.useState(false);
  const [profilePop, setProfilePop] = React.useState(false);
  const [typeLogin, setTypeLogin] = React.useState('');

  const loginType = () => {
    switch( sessionStorage.getItem("typeLogin") ) {
      case 'facebook' :
        return (<div className="logoutBtn" onClick={(e)=>{logOutFacebook(e)}}><i class="fas fa-sign-out-alt"></i><span>logout facebook</span></div>)
      case 'google' :
        return (
          <GoogleLogout 
            clientId="237905800096-t4qvpgqhmkis3dpa8ce9pdhem7d5dgi2.apps.googleusercontent.com"
            render={renderProps => (
              <div className="logoutBtn" onClick={renderProps.onClick}><i class="fas fa-sign-out-alt"></i><span>logout google</span></div>
            )}
            onLogoutSuccess={logoutGoogle}
            onFailure={logoutFailure}
          />
        )
      case 'skytours' :
        return <div className="logoutBtn" onClick={logoutSkytours} ><i class="fas fa-sign-out-alt"></i><span>logout skytours</span></div>
      default :
        return null;
    }
  }

  React.useEffect(() => {
    loginType();
  }, [auth])

  const getCategory = async () => {
    try {
      setLoading(true);
      const respon = await Axios.get(`https://peaceful-river-55348.herokuapp.com/api/popular/categories`);
      setCategory(respon.data.categories);
      dispatch({type: 'SET_CATEGORY', categories: respon.data.categories});
      setLoading(false);
    } catch(e) {
      console.error('ini error ngapa ', e);
    }
  }

  React.useEffect(() => {
    setEmail(sessionStorage.getItem("email"))
    setName(sessionStorage.getItem("name"))
    setPicture(sessionStorage.getItem("picture"))
    console.log('has been set');
    const isBoolean = (sessionStorage.getItem("isLogin") == 'true');
    setAuth(isBoolean);
  }, [LoginReducer]);
  
  React.useEffect(() => {
    getCategory();
  }, []);
  
  const changeNavbar = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }
  
  function logOutFacebook(e) {
    e.preventDefault();
    if( window.FB ) {
      window.FB.logout();
      console.log('logout kena');
    }
    dispatch({type: 'SET_lOGOUT'});
    setEmail('');
    setName('');
    setPicture('');
    setAuth(false);
    sessionStorage.clear();
  }

  const logoutGoogle = () => {
    dispatch({type: 'SET_lOGOUT'});
    setEmail('');
    setName('');
    setPicture('');
    setAuth(false);
    sessionStorage.clear();
  }

  const logoutSkytours = () => {
    const url = `${config.api_host}/api/auth/logout`
    const tokenB = `Bearer `.concat(sessionStorage.getItem("tokenB"));
    Axios.get(url, { headers : {'Authorization': tokenB} })
    .then(_ => {
      dispatch({type: 'SET_lOGOUT'});
      setEmail('');
      setName('');
      setPicture('');
      setAuth(false);
      sessionStorage.clear();
    })
    .catch(err => {
      swal("oops...", "Something went wrong, try again later", "error");
    })
  }

  const logoutFailure = () => {
    swal('Oops...', 'Something went wrong!', 'error');
  }
  
  window.addEventListener('scroll', changeNavbar);
  
  const onHamburger = () => {
    setHamburger(!hamburger);
  }

  const onMegamenu = () => {
    setMegamenu(!megamenu);
  }

  const onProfilePop = () => {
    setProfilePop(!profilePop);
  }

  function GlobalMegamenu(name) {
    dispatch({type: 'SET_CAT', cat: name});
    history.push('/list-attraction');
  }
  

  return(
    <Fragment>
      <nav className={ navbar ? 'nav-scrolled' : megamenu ? 'nav-white' : ''}>
        <div className="container">
          <div className="row row-nav">
            <Link to="/" className="nav-logo">
              <img src={Skytours} alt="skytours" />
              <span>Skytours</span>
            </Link>
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
              <li className="btn-log">
                {auth ? 
                (
                  <div className="userOverlay">
                    <button className="userPicBtn" onClick={onProfilePop}>
                      <img className="userPic" src={picture} alt="profile" />
                    </button>
                    <div className={profilePop ? "status-wrapper" : "status-wrapper hidden"}>
                      <div><i class="fas fa-user-circle"></i><span>{name}</span></div>
                      <div><i class="far fa-envelope-open"></i><span>{email}</span></div>
                      {loginType()}
                    </div>
                  </div>
                ) : 
                (
                  <NavLink className="btn-nav-login" to="/login">login</NavLink>
                )}
              </li>
            </ul>
            <div className="menu-toggle">
              <input type="checkbox" onClick={onHamburger} />
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
              {loading ? (
                <div className="loader-category">
                  <Loader type="ThreeDots" color="#439CEF" height="80" width="80" />
                </div>
              ) : (
              <div className="category-list">
              {category.map((item, index) => 
                <div className="category-wrapper" onClick={() => GlobalMegamenu(item.name)} key={index}>
                  <img src={`${config.api_host}/api/images/${item.image.id}`} alt="icon" />
                  <p>{item.name}</p>
                </div>
              )}
              </div>
              )}
              <div className="search-list">
                <div className="search-wrapper">
                  <i className="fas fa-search"></i>
                  <p>bromo</p>
                </div>
                <div className="search-wrapper">
                  <i className="fas fa-search"></i>
                  <p>dufan</p>
                </div>
                <div className="search-wrapper">
                  <i className="fas fa-search"></i>
                  <p>ancol</p>
                </div>
                <div className="search-wrapper">
                  <i className="fas fa-search"></i>
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