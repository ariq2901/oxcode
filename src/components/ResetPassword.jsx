import Axios from 'axios';
import React, { Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Footer from './Footer';
import { config } from '../config';

const ResetPassword = () => {
  const params = useParams();
  const history = useHistory();
  let [password, setPassword] = React.useState('');
  let [email, setEmail] = React.useState('');
  let [token, setToken] = React.useState('');
  let [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  let [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const result =  (await Axios.get(`${config.api_host}/api/password/find/${params.token}`)).data.reset_password_token;
      setEmail(result.email);
      setToken(result.token);
    } catch (error) {
      history.push('/');
    }
  }

  const validation = () => {
    if (password !== passwordConfirmation ) {
      swal({title: 'Something went wrong', text: 'The password must be same with Password Confirmation',icon:'error'});
      return false;
    }
    
    if (password === '') {
      swal({title: 'Something went wrong', text: 'The password can\'t be empty',icon:'error'});
      return false;
    }
    
    if (password.length < 8) {
      swal({title: 'Something went wrong', text: 'The password must be at least 8 characters.',icon:'error'});
      return false;
    }
    return true;
  }
  
  const changePassword = async () => {
    const isValidated = validation();
    if (!isValidated) {
      return;
    }
    const payload = {
      email,
      password,
      password_confirmation: passwordConfirmation,
      token
    };
    setLoading(true);
    try {
      const result = await Axios.post(`${config.api_host}/api/password/reset`, payload);
      if (!result.error) {
        swal({title: 'Success', text: 'Your password has been changed successfully!',icon:'success'});
        history.push('/login');
      }
    } catch (error) {
      console.log(error);
      swal({title: 'Something went wrong', text: 'Please try again.',icon:'error'});
    }

    setLoading(false);

  }

  return (
    <Fragment>
      <main className="reset-password">
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-4 bg-white shadow p-4 rounded">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value.trim().toString())} id="password" placeholder="Password"/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password Confirmation</label>
                <input type="password" className="form-control" onChange={(e) => setPasswordConfirmation(e.target.value.trim().toString())} id="password_confirmation" placeholder="Password Confirmation"/>
              </div>
  <button className="btn btn-sm btn-primary" disabled={loading} onClick={changePassword}>{loading ? 'changing your password' : 'Change Password'}</button>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </Fragment>
  )
};

export default ResetPassword;