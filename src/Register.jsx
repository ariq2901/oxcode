import React, { useRef, useEffect, useState, Fragment } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Input, Button } from './property/Form';
import swal from 'sweetalert2';
import { config } from './config';
import Side from './side';
import Axios from 'axios';

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

const Register = (props) =>{

  const LoginReducer = useSelector(state => state.LoginReducer);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCon, setPasswordCon] = useState('');
  const [picture, setPicture] = useState('');

  const submitReg = (e) => {
    e.preventDefault()
    console.log();
    if(name.length > 0 && email.length > 0 && password.length > 0 && password === passwordCon) {
      if( password === passwordCon ) {
        setLoading(true);
        console.log('all confirmed');
        const url = `${config.api_host}/api/auth/register`;
        const payload = {
          name : name,
          email : email,
          password : password,
          password_confirmation : passwordCon
        }
        console.log('payload ', payload);
        Axios.post(url, payload)
        .then(respons => {
          swal("Check your Email", "confirm email verification!", "success");
          setLoading(false);
          props.history.push('/login');
        })
        .catch(e => {
          console.log('failure ', e);
          setLoading(false);
        })
      } else {
        console.log('pass GK SAMA');
      }
    } else {
      console.log('ada error');
    }
  }

  const getUserFacebook = () => {
    console.log('facebook btn clicked');
    setClick(true);
  }

  const responseFacebook = (response) => {
    if( response.status !== "unknown" ){
      setAuth(true);
      setName(response.email);
      setName(response.name);
      setPicture(response.picture.data.url);
      console.log('berhasil di set');
      sessionStorage.setItem("isLogin", true);
      sessionStorage.setItem("email", response.email);
      sessionStorage.setItem("name", response.name);
      sessionStorage.setItem("picture", response.picture.data.url);
      dispatch({type: 'SET_ISLOGIN'});
      dispatch({type: 'SET_PROFILE', pData: "email", pValue: response.email});
      dispatch({type: 'SET_PROFILE', pData: "name", pValue: response.name});
      dispatch({type: 'SET_PROFILE', pData: "picture", pValue: response.picture.data.url});

      props.history.goBack();
    }
  }
    
  const logRad = useRef();
  const image = useRef();
  const { height, width } = useWindowDimensions();

  let radAct = null;

  // if (width <= 576) {
  //   return;
  // }

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

  return(
    <Fragment>
      <div className="container-fluid no-select" style={{ height: '100vh' }}>
        <div className="row" style={{ height: '100%' }}>
          <div className="col-4 not-active">
            <div className="form-login center">
              <p>register for free</p>
              <h2>Create An Account</h2>
              <form onSubmit={submitReg}>
                <ul className="ul-form">
                  <li>
                    <Input type="text" className="form-control" onChange={e => setName(e.target.value)} placeholder="enter your name" />
                  </li>
                  <li>
                    <Input type="email" className="form-control" onChange={e => setEmail(e.target.value)} placeholder="enter your email"/>
                  </li>
                  <li className="show-wrapper">
                    <input type="checkbox" id="show-form"/>
                    <label htmlFor="show-form" className="show-input"></label>
                    <ul className="ul-form2">
                      <li>
                        <Input type="password" className="form-control" onChange={e => setPassword(e.target.value)} placeholder="enter your password"/>
                      </li>
                      <li>
                        <Input type="password" className="form-control" onChange={e => setPasswordCon(e.target.value)} placeholder="confirm your password"/>
                      </li>
                    </ul>
                  </li>
                </ul>
                {loading ?
                (
                  <Button className="btn btn-primary btn-block mt-5" type="submit" label="storing your info..." />
                ) : (
                  <Button className="btn btn-primary btn-block mt-5" type="submit" label="sign up" />
                )}

                <button className="btn btn-block border-black"><img src={`${process.env.PUBLIC_URL + '/google.png'}`} height='20px' /> sign in with google</button>
                {auth ? (
                  <Fragment>
                    {/* <a href="#" onClick={(e)=>{e.preventDefault(); window.FB.logout(); logOutFacebook()}}>logout</a> */}
                  <button className="btn btn-block border-black"><img src={`${process.env.PUBLIC_URL + '/facebook.png'}`} height='20px' /> getting your info... </button>
                  </Fragment>
                ) : (
                  <FacebookLogin
                    appId="2363350287365556"
                    autoLoad={false}
                    onClick={getUserFacebook}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="btn btn-block border-black"
                    icon="fa-facebook"
                    textButton="&nbsp;&nbsp;Sign in with facebook"
                  />
                )}
              </form>
              <span className="signin">already have an account? <Link to="/login">sign in</Link></span>
            </div>
            <footer className="policy"><span>privacy policy and terms of service</span></footer>
          </div>
          <Side image={image} radButton={radButton} logRad={logRad} changeRad={changeRad} />
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(Register);