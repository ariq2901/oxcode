import React, { Fragment } from 'react';
import { useState } from 'react';
import { config } from '../config';
import { Link } from 'react-router-dom';
import ForgotIMG from '../img/home/forgot.jpg';
import Axios from 'axios';
import Swal from 'sweetalert';
import Loader from 'react-loader-spinner';

const Forgotpassword= () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function validateEmail(em) {
    const re = /\S+@\S+\.\S+/;
    return re.test(em);
  }

  const sendRequest = () => {
    setLoading(true);
    if( email.length == '' ){
      Swal.fire('Something went wrong', 'The email can\'t be empty','error')
      setLoading(false);
      return false;
    }
    if( !validateEmail(email) ) {
      Swal.fire('Something went wrong', 'The email is not valid','error')
      setLoading(false);
      return false;
    }
    const url = `${config.api_host}/api/password/create`;
    const body = {
      email: email
    }
    Axios.post(url, body)
    .then(_ => {
      Swal("Done!", "we've sent the reset password request to your mailbox.", "success");
      setLoading(false);
    })
    .catch(err => {
<<<<<<< HEAD

      if(err.response.status == 404) {
        swal({
          title: "Email isn't registered",
          text: email + " " + "is not registered in our server",
          icon: "warning"
        })
      } else {
        swal("oops...!", "we've got some trouble, try again later", "error");
      }
=======
      Swal("oops...!", "we've got some trouble, try again later" + err, "error");
>>>>>>> 43d69633be54ae20b401163c49ad92ab0e978862
      setLoading(false);
    })
  }

  return(
    <Fragment>
      <div className="container forgot">
        <div className="row">
          <div className="forgot-wrapper">
            <div className="illustration-wrapper">
              <img src={ForgotIMG} alt="forgot img"/>
            </div>
            <div className="forgot-box">
              <div className="mail-input">
                <p><span>forgot</span> password?</p>
                <p><span>Enter</span> the email address you've registered with. We'll send you the instructions there.</p>
                <input type="email" onChange={e => setEmail(e.target.value)} id="email" placeholder="e-mail"/>
                <button disabled={loading} onClick={sendRequest}>{loading ? <Loader type="ThreeDots" color="#ffffff" height="30" width="30" /> : "Request password reset"}</button>
                <Link to="/login" className="backlogin">Back to login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Forgotpassword;