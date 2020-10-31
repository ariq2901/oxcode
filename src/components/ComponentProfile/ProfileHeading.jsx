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
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [pictureUpdate, setPictureUpdate] = useState('');

  const submitAction = (e) => {
    e.preventDefault();
    const url = `${config.api_host}/api/users/update`;
    let body = {};
    
    if (name.length > 3) {
      body = {...body, name};
    } else {
      swal("Oops!", " Minimal Name length is 3", "error");
      return;
    }
    
    if (password !== passwordConfirmation) {
      swal("Oops!", "Make sure your password is matched with confirmation password", "error");
      return;
    } 
    
    if (password.length > 0 && password.length < 8) {
      swal("Oops!", " Minimal Password length is 8", "error");
      return;
    } 

    if(password.length > 8) {
      console.log('masuk');
      body = {...body, password, password_confirmation: passwordConfirmation};
    }

    const token = sessionStorage.getItem("tokenB");
    setLoading(true);
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
      setLoading(false);
      swal("Success", "Success to Update Profile!", "success");
    })
    .catch(err => {
      setLoading(false);
      swal("Oops!", "Something went wrong", "error");
    });
  }
  const changePicture = (e) => {
    // e.preventDefault();
    // fileUpload(pictureUpdate);
    // let images = e.target.files;
    let fd = new FormData();
    let fdAppend = fd.append("images", e);
    console.log('images fd', fdAppend);
  }
  // const changePicture = (e) => {
  //   let files = e.target.files || e.dataTransfer.files;
  //   if(!files.length) {
  //     return;
  //   }
  //   console.log('files ',files[0]);
  //   createImage(files[0]);
  // }
  // const createImage = (file) => {
  //   let reader = new FileReader();
  //   reader.onload = (e) => {
  //     setPictureUpdate(e.target.result)
  //   };
  //   reader.readAsDataURL(file);
  // }
  // const fileUpload = (image) => {
  //   const url = `${config.api_host}/api/users/update`;
  //   const body = {
  //     image: image
  //   }
  //   const token = sessionStorage.getItem("tokenB");
  //   setLoading(true);
  //   console.log('body ', body);
  //   Axios.put(url, body, { headers: {'Authorization': token} })
  //   .then(resp => {
  //     console.log('update data ', resp);
  //     setLoading(false);
  //   })
  //   .catch(err => {
  //     setLoading(false);
  //     swal("Oops!", "Something went wrong", "error");
  //   });
  // }

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
            <form encType="multipart/form-data">
              <input type="file" name="images" onChange={e => changePicture(e.target.files)} id="pictureupdate"/>
              <button type="submit">submit</button>
            </form>
          </div>
        </div>
        <div className="userInfo">
        <form onSubmit={submitAction} id="formPicture">
          <input type="hidden" name="_method" value="put"/>
          <div className="nameInfo">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" onChange={e => setName(e.target.value)} id="nameupdate" value={name}/>
          </div>
          <div className="passwordInfo">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={e => setPassword(e.target.value)} id="password" placeholder="*****" value={password}/>
          </div>
          <div className="passwordInfo">
            <label htmlFor="password_confirmation">Confirmation Password</label>
            <input type="password" name="password_confirmation" onChange={e => setPasswordConfirmation(e.target.value)} id="password_confirmation" placeholder="*****" value={passwordConfirmation}/>
          </div>
          <button className="btn-update mt-2" type="submit" disabled={loading}>{loading ? 'Updating your profile' : 'Save Changes'}</button>
        </form>
      </div>
      </div>
    </Fragment>
  );
}
export default ProfileHeading;