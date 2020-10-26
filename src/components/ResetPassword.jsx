import Axios from 'axios';
import React, { Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from './Footer';
import { config } from '../config';

const ResetPassword = () => {
  const params = useParams();
  const history = useHistory();
  let [password, setPassword] = React.useState('');
  let [email, setEmail] = React.useState('');
  let [token, setToken] = React.useState('');
  let [passwordConfirmation, setPasswordConfirmation] = React.useState('');

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

  const changePassword = async () => {
    if (password !== passwordConfirmation ) {
      Swal.fire('Something went wrong', 'The password must be same with Password Confirmation','error');
      return;
    }
    
    if (password === '') {
      Swal.fire('Something went wrong', 'The password can\'t be empty','error');
      return;
    }
    
    if (password.length < 8) {
      Swal.fire('Something went wrong', 'The password must be at least 8 characters.','error');
      return;
    }

    try {
      const payload = {
        email,
        password,
        password_confirmation: passwordConfirmation,
        token
      };

      const result = await Axios.post(`${config.api_host}/api/password/reset`, payload);
      console.log('error ', result);
      Swal.fire('Success', 'Your password has been changed successfully!','success');
    } catch (error) {
      console.log(error);
      Swal.fire('Something went wrong', 'Please try again.','error');
    }

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
              <button className="btn btn-sm btn-primary" onClick={changePassword}>Change Password</button>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </Fragment>
  )
};

export default ResetPassword;