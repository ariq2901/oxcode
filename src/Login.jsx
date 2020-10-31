import Axios from 'axios';
import React, { useRef, useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { config } from './config';
import { Input, Button, IndicatorLoading } from './property/Form';
import Side from './side';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);

  return windowDimensions;
}

const Login = (props) => {
  const LoginReducer = useSelector(state => state.LoginReducer);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [click, setClick] = useState(false);
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  // const { width } = useViewport();

  // ^ Breakpoint
  const breakpoint = 1200;

  const submitLog = async (e) => {
    e.preventDefault();

    if( emailInput.length > 0 && passInput.length > 0 ) {
      setLoading(true);
      console.log(loading);
      const url = `${config.api_host}/api/auth/login`;
      const payload = {
        email : emailInput,
        password : passInput,
        remember_me : remember
      }
      try {
        const personal_access_token = (await Axios.post(url, payload)).data.personal_access_token;
        const token = `Bearer `.concat(personal_access_token.token);
        const urlD = `${config.api_host}/api/auth/user`;
        getUserDetail(urlD, token);
      } catch (error) {
         swal({
          title: "Something went wrong",
          text: `${error.response.data.message}`,
          icon: "error"
        });
        setLoading(false);
      }
    } 
  }

  const getUserDetail = async (url, token) => {
    try {
      const user = ((await Axios.get(url, { headers : {'Authorization': token} }))).data.user;
      sessionStorage.setItem("typeLogin", 'skytours');
      sessionStorage.setItem("isLogin", true);
      sessionStorage.setItem("email", user.email);
      sessionStorage.setItem("name", user.name);
      sessionStorage.setItem("tokenB", token);
      sessionStorage.setItem("picture", `${config.api_host}/api/images/${user.image.id}`);
      dispatch({type: 'SET_ISLOGIN', typeLogin: 'skytours'});
      dispatch({type: 'SET_ISLOGIN'});
      dispatch({type: 'SET_PROFILE', pData: "email", pValue: user.email});
      dispatch({type: 'SET_PROFILE', pData: "name", pValue: user.name});
      dispatch({type: 'SET_PROFILE', pData: "picture", pValue: `${config.api_host}/api/images/${user.image.id}`});
      props.history.push('/');
    } catch (error) {
      swal({
        title: "Something went wrong",
        text: `${error.response.data.message}`,
        icon: "error"
      });
    }
    setLoading(false);
  }

  const logRad = useRef();
  const image = useRef();
  const { height, width } = useWindowDimensions();

  let radAct = null;

  const changeRad = (e, p = 'null') => {
    if (p === 'button') {
      e.currentTarget = e.children[0];
    }

    let arr = [...logRad.current.children];
    let t = arr.findIndex((id) => { return id === e.currentTarget.parentElement });
    e.currentTarget.innerHTML = 'radio_button_checked';
    if (radAct !== null) {
      if (logRad.current.children[radAct].children[0] === e.currentTarget) {
        return null;
      }
      logRad.current.children[radAct].children[0].innerHTML = 'radio_button_unchecked';
    } else {
      if (logRad.current.children[0].children[0] === e.currentTarget) {
        return null;
      }
      logRad.current.children[0].children[0].innerHTML = 'radio_button_unchecked';
    }
    radAct = t;
    return null;
  }

  const radButton = (e) => {
    let a = e.currentTarget.innerHTML;
    let n = null;

    if (radAct === null) {
      radAct = 0;
    }

    if (a === '&gt;') {
      if (radAct === 2) {
        n = 0
        clickOn(n);
        return null;
      }
      n = radAct + 1;
      clickOn(n);
    } else if (a === '&lt;') {
      if (radAct === 0) {
        n = 2;
        clickOn(n);
        return null;
      }
      n = radAct - 1;
      clickOn(n);
    }
  }

  const clickOn = (e) => {
    let a = logRad.current.children[e];
    changeRad(a, 'button');
    return null;
  }

  const requestProvider = async (provider) => { 
    setLoading(true);
    try {
      let url = await Axios.get(`${config.api_host}/api/auth/${provider}/redirect`);
      window.location.replace(url.data.redirectToProvider);
    } catch (error) {
      swal({
        title: "Oops! Something went wrong",
        text: "Please try again later",
        icon: "error"
      });
    }
    setLoading(false);
  }

  return (
    <>
      {
        loading ? <IndicatorLoading /> : ''
      }
      <div className="container-fluid no-select" style={{ height: '100vh' }}>
        <div className="row" style={{ height: '100%' }}>
          <div className={width < breakpoint ? "col-12 login-area not-active" : "col-4 login-area not-active"}>
            <div className="form-login center">
              <p>login with your account</p>
              <h2>Login with account</h2>
              <div className="user-choice">
                <form onSubmit={submitLog}>
                  <Input type="email" className="form-control" onChange={e => setEmailInput(e.target.value)} placeholder="enter your email" />
                  <Input type="password" className="form-control" onChange={e => setPassInput(e.target.value)} placeholder="enter your password"/>
                  <div className="add-on">
                    <div className="remember-me">
                      <input type="checkbox" onClick={e => setRemember(!remember)} id="remember"/>
                      <label htmlFor="remember">remember me</label>
                    </div>
                    <Link to="/forgot-password">forgot password ?</Link>
                  </div>
                  {loading ? 
                  (
                    <Button className="btn btn-primary btn-block mt-4" label="getting your info..." />
                  ) : (
                    <Button className="btn btn-primary btn-block mt-4" type="submit" label="sign in" />
                  )}

                </form>
                <div className="social-login">
                  {auth ? (
                    <Fragment>
                      {/* <a href="#" onClick={(e)=>{e.preventDefault(); window.FB.logout(); logOutFacebook()}}>logout</a> */}
                    <button className="btn btn-block border-black"><img src={`${process.env.PUBLIC_URL + '/google.png'}`} height='20px' /> sign in with google </button>
                    <button className="btn btn-block border-black"><img src={`${process.env.PUBLIC_URL + '/facebook.png'}`} height='20px' /> getting your info... </button>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <button onClick={() => requestProvider('google')} className="btn btn-block border-black"><img src={`${process.env.PUBLIC_URL + '/google.png'}`} height='20px' /> sign in with google </button>
                      <button onClick={() => requestProvider('facebook')} className="btn btn-block border-black"><img src={`${process.env.PUBLIC_URL + '/facebook.png'}`} height='20px' /> sign in with facebook </button>
                    </Fragment>
                  )}
                </div>
              </div>
              <span className="signin">doesn't have an account? <Link to="/register">sign up</Link></span>
            </div>
            <footer className="policy"><span>privacy policy and terms of service</span></footer>
          </div>
          <Side image={image} radButton={radButton} logRad={logRad} changeRad={changeRad} />
        </div>
      </div>
    </>
  );
}

export default withRouter(Login);