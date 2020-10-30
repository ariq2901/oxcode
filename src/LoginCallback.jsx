import Axios from 'axios';
import React from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { config } from './config';
import Login from './Login';
import BounceLoader from "react-spinners/BounceLoader";
import { useState } from 'react';

const LoginCallback = () => {
  const { search } = useLocation();
  const { provider } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    sendCode();
  }, []);

  const sendCode = async () => {
    setLoading(true);
    const code = search.replace('?code=', '');
    try {
      const result = await Axios.get(`${config.api_host}/api/auth/${provider}/callback?code=${code}`);
      getUserDetail(`Bearer ${result.data.personal_access_token.token}`);
    } catch (error) {
       swal({
        title: "Ooops!",
        text: "There is something wrong",
        icon: "error"
      });
      history.push('/login');
      console.log('error: ', error);
    }
    setLoading(false);

  }
  
  const getUserDetail = async (token) => {
    setLoading(true);
    try {
      const user = await Axios.get(`${config.api_host}/api/auth/user`, { headers: {'Authorization': token} });
      console.log(user);
      sessionStorage.setItem("typeLogin", 'skytours');
      sessionStorage.setItem("isLogin", true);
      sessionStorage.setItem("email", user.data.user.email);
      sessionStorage.setItem("name", user.data.user.name);
      sessionStorage.setItem("tokenB", token);
      sessionStorage.setItem("picture", `${config.api_host}/api/images/${user.data.user.image.id}`);
      dispatch({type: 'SET_ISLOGIN', typeLogin: 'skytours'});
      dispatch({type: 'SET_ISLOGIN'});
      dispatch({type: 'SET_PROFILE', pData: "email", pValue: user.data.user.email});
      dispatch({type: 'SET_PROFILE', pData: "name", pValue: user.data.user.name});
      dispatch({type: 'SET_PROFILE', pData: "picture", pValue: `${config.api_host}/api/images/${user.data.user.image.id}`});
      history.push('/');
    } catch (error) {
      swal({
        title: "Ooops!",
        text: "There is something wrong",
        icon: "error"
      });
      console.log(error);
      history.push('/login');
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <div className="indicator-loading">
        <BounceLoader
            size={150}
            color={"#439CEF"}
            loading={loading}
          />
      </div>
      <Login/>
    </React.Fragment>

  )
}

export default LoginCallback;