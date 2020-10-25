import React, { Fragment } from 'react';
import { GoogleLogout, GoogleLogin } from 'react-google-login';

const GoogleBtn = ({...rest}) => {
  const [login, setLogin] = React.useState(false);

  const loginResponse = (response) => {
    if(response.accessToken) {
      console.log(response);
      setLogin(true)
    }
  }

  const logoutResponse = (response) => {
    console.log(response);
    setLogin(false)
  }

  const handleLoginFailure = () => {
    alert('failed login');
  }

  const handleLogoutFailure = () => {
    alert('failed logout')
  }

  return(
    <Fragment>
      <GoogleLogin
        clientId="AIzaSyCrS23yCWeOlkCK3qA4yfh6XtxWqzCqwRE"
        buttonText="sign in with google"
        onSuccess={loginResponse}
        onFailure={handleLoginFailure}
        responseType='code,token'
        {...rest}
      />
    </Fragment>
  );

}
export default GoogleBtn;