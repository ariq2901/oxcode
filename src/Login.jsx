import React, { useRef, useEffect, useState, Fragment } from 'react';
import FacebookLogin from 'react-facebook-login';
import { useDispatch, useSelector } from 'react-redux';
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

const Login = () => {

  const LoginReducer = useSelector(state => state.LoginReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log('login reducer : ', LoginReducer);
  }, [])

  const [click, setClick] = useState(false);
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');

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
    }
  }

  const sendProfile = (value, input) => {
    dispatch({type: 'SET_PROFILE', pData: input, pValue: value});
  }

  const logOutFacebook = () => {
    if( auth === true ) {
      setAuth(false);
      setName('');
      setPicture('');
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
      <div className="container-fluid" style={{ height: '100vh' }}>
        <div className="row" style={{ height: '100%' }}>
          <div className="col-4 not-active">
            <div className="form-login center">
              <p>{console.log(LoginReducer.profile)}</p>
              <h2>Create An Account</h2>
              <form action="">
                <input type="email" className="form-control" />
                <input type="password" className="form-control" />
                <button className="btn btn-primary btn-block mt-4">sign up</button>
                <button className="btn btn-block border-black"><img src={`${process.env.PUBLIC_URL + '/google.png'}`} height='20px' /> sign up with google</button>
                {auth ? (
                  <Fragment>
                    <img src={picture} alt={name} />
                    <div>Hi {name}</div>
                    <a href="#" onClick={(e)=>{e.preventDefault(); window.FB.logout(); logOutFacebook()}}>logout</a>
                  </Fragment>
                ) : (
                  // <FacebookLogin
                  //   appId="2363350287365556"
                  //   autoLoad={true}
                  //   fields="name,email,picture"
                  //   callback={responseFacebook}
                  //   render={renderProps => (
                  //     <button onClick={renderProps.onClick} className="btn btn-block border-black"><img src={`${process.env.PUBLIC_URL + '/facebook.png'}`} height='20px' /> sign up with facebook</button>
                  //   )}
                  // />
                  <FacebookLogin
                    appId="2363350287365556"
                    autoLoad={false}
                    onClick={getUserFacebook}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="btn btn-block border-black"
                    icon="fa-facebook"
                  />
                )}
              </form>
              <span className="signin">already have an account? <a href="">sign in</a></span>
            </div>
            <footer className="policy"><span>privacy policy and terms of service</span></footer>
          </div>
          <Side image={image} radButton={radButton} logRad={logRad} changeRad={changeRad} />
        </div>
      </div>
      <input type="hidden" value={LoginReducer.profile.name} onChange={value => sendProfile(value, 'email')}/>
      <input type="hidden" value={LoginReducer.profile.name} onChange={value => sendProfile(value, 'name')}/>
      <input type="hidden" value={LoginReducer.profile.name} onChange={value => sendProfile(value, 'picture')}/>
    </>
  );
}

export default Login;