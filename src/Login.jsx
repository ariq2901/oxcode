import Axios from 'axios';
import React, { useRef, useEffect, useState, Fragment } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import swal from 'sweetalert2';
import { config } from './config';
import { Input, Button } from './property/Form';
import Side from './side';
import { GoogleLogin } from 'react-google-login';

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

  const submitLog = (e) => {
    console.log('hi');
    e.preventDefault();
    if( emailInput.length > 0 && passInput.length > 0 ) {

      setLoading(true);
      console.log('confirmed');
      const url = `${config.api_host}/api/auth/login`
      const payload = {
        email : emailInput,
        password : passInput,
        remember_me : remember
      }
      console.log('payload ', payload);
      Axios.post(url, payload)
      .then(_ => {
        const token = _.data.personal_access_token;
        const tokenB = `Bearer `.concat(token.token);
        // const options = {
          //   headers: {'Authorization': tokenB}
          // }
          const urlD = `${config.api_host}/api/auth/user`;
          Axios.get(urlD, { headers : {'Authorization': tokenB} })
          .then(u => {
            console.log('user data: ', u);
          sessionStorage.setItem("isLogin", true);
          sessionStorage.setItem("email", u.data.user.email);
          sessionStorage.setItem("name", u.data.user.name);
          sessionStorage.setItem("tokenB", token);
          sessionStorage.setItem("picture", `${config.api_host}/api/images/${u.data.user.image.id}`);
          dispatch({type: 'SET_ISLOGIN'});
          dispatch({type: 'SET_PROFILE', pData: "email", pValue: u.data.user.email});
          dispatch({type: 'SET_PROFILE', pData: "name", pValue: u.data.user.name});
          dispatch({type: 'SET_PROFILE', pData: "picture", pValue: `${config.api_host}/api/images/${u.data.user.image.id}`});

          props.history.push('/');
        })
        .catch(err => {
          console.log('error ', err);
        })
        setLoading(false);
      })
      .catch(e => {
        console.log('failure', e);
        if( e.response.status == 401 ) {
          swal({
            title: "verify your account",
            text: "Verify your account in the email we sent to your mailbox",
            icon: "warning"
          })
        }
        setLoading(false);
      })
    } else {
      console.log('NOT confirmed');
    }
  }

  const getUserFacebook = () => {
    console.log('facebook btn clicked');
    setClick(true);
  }

  const responseFacebook = (response) => {
    if( response.status !== "unknown" ){
      setAuth(true);
      setEmail(response.email);
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

  const responseGoogle = (response) => {
    if( response.accessToken ) {
      console.log(response);
      setAuth(true);
      setEmail(response.profileObj.email);
      setName(response.profileObj.name);
      setPicture(response.profileObj.imageUrl);
      console.log('berhasil di set');
      sessionStorage.setItem("isLogin", true);
      sessionStorage.setItem("email", response.profileObj.email);
      sessionStorage.setItem("name", response.profileObj.name);
      sessionStorage.setItem("picture", response.profileObj.imageUrl);
      dispatch({type: 'SET_ISLOGIN'});
      dispatch({type: 'SET_PROFILE', pData: "email", pValue: response.profileObj.email});
      dispatch({type: 'SET_PROFILE', pData: "name", pValue: response.profileObj.name});
      dispatch({type: 'SET_PROFILE', pData: "picture", pValue: response.profileObj.imageUrl});

      props.history.push("/");
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

  return (
    <>
      <div className="container-fluid no-select" style={{ height: '100vh' }}>
        <div className="row" style={{ height: '100%' }}>
          <div className="col-4 not-active">
            <div className="form-login center">
              <p>login with your account</p>
              <h2>Login with account</h2>
              <form onSubmit={submitLog}>
                <Input type="email" className="form-control" onChange={e => setEmailInput(e.target.value)} placeholder="enter your email" />
                <Input type="password" className="form-control" onChange={e => setPassInput(e.target.value)} placeholder="enter your password"/>
                <div className="add-on">
                  <div className="remember-me">
                    <input type="checkbox" onClick={e => setRemember(!remember)} id="remember"/>
                    <label htmlFor="remember">remember me</label>
                  </div>
                  <span>forgot password ?</span>
                </div>
                {loading ? 
                (
                  <Button className="btn btn-primary btn-block mt-4" label="getting your info..." />
                ) : (
                  <Button className="btn btn-primary btn-block mt-4" type="submit" label="sign in" />
                )}

                {auth ? (
                  <Fragment>
                    {/* <a href="#" onClick={(e)=>{e.preventDefault(); window.FB.logout(); logOutFacebook()}}>logout</a> */}
                  <button className="btn btn-block border-black"><img src={`${process.env.PUBLIC_URL + '/google.png'}`} height='20px' /> sign in with google</button>
                  <button className="btn btn-block border-black"><img src={`${process.env.PUBLIC_URL + '/facebook.png'}`} height='20px' /> getting your info... </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <GoogleLogin 
                      autoLoad={false}
                      onSuccess={responseGoogle}
                      className="btn btn-block border-black goog"
                      icon="fa-google"
                      clientId="237905800096-t4qvpgqhmkis3dpa8ce9pdhem7d5dgi2.apps.googleusercontent.com"
                      buttonText="sign in with google"
                    />
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
                  </Fragment>
                )}
              </form>
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