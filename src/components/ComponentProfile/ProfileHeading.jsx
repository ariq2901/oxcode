import React, { Fragment } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { config } from '../../config';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';

const ProfileHeading = () => {
  const dispatch = useDispatch();
  const [picture, setPicture] = useState(sessionStorage.getItem("picture"));
  const [name, setName] = useState(sessionStorage.getItem("name"));
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const [password, setpassword] = useState("");

  const submitAction = (e) => {
    e.preventDefault();
    const url = `${config.api_host}/api/users/update`;
    let body = {};
    
    if (name.length > 0) {
      body = {...body, name};
    }
    if (password.length > 0) {
      body = {...body, password};
    }

    console.log('body update ', body);
    const token = sessionStorage.getItem("tokenB").substr(7);
    Axios.put(url, body, { headers: {'Authorization': token} })
    .then(resp => {
      console.log('resp update data ', resp);
      sessionStorage.setItem("typeLogin", 'skytours');
      sessionStorage.setItem("isLogin", true);
      sessionStorage.setItem("email", resp.data.user.email);
      sessionStorage.setItem("name", resp.data.user.name);
      sessionStorage.setItem("picture", `${config.api_host}/api/images/${resp.data.user.image.id}`);
      dispatch({type: 'SET_ISLOGIN', typeLogin: 'skytours'});
      dispatch({type: 'SET_PROFILE', pData: "email", pValue: resp.data.user.email});
      dispatch({type: 'SET_PROFILE', pData: "name", pValue: resp.data.user.name});
      dispatch({type: 'SET_PROFILE', pData: "picture", pValue: `${config.api_host}/api/images/${resp.data.user.image.id}`});
    })
    .catch(err => {
      swal("ooops...", "there is an internal server error, try again later", "error");
    });
  }

  return(
    <Fragment>
      <div className="profile-wrapper">
        <div className="profileStatus">
          <div className="profileImg">
            <img src={picture} alt="picture img"/>
          </div>
          <div className="profileInfo">
            <span>{name}</span>
            <span>{email}</span>
          </div>
        </div>
        <div className="userInfo">
        <form onSubmit={submitAction}>
          <input type="hidden" name="_method" value="put"/>
          <div className="nameInfo">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" onChange={e => setName(e.target.value)} id="nameupdate" value={name}/>
          </div>
          <div className="passwordInfo">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={e => setpassword(e.target.value)} id="passwordupdate" placeholder="*****" value={password}/>
          </div>
          <button className="btn-update" type="submit">Save Changes</button>
        </form>
      </div>
      </div>
    </Fragment>
  );
}
export default ProfileHeading;