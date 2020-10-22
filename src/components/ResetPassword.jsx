import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import Footer from './Footer';

const ResetPassword = () => {
  const [token, setToken]=  React.useState();
  const params = useParams();

console.log('hello', params);
  return (
    <Fragment>
      <section className="main">
        <div className="container">
          <div className="row">
            <h1>sh</h1>
          </div>
        </div>
      </section>
      <Footer/>
    </Fragment>
  )
};

export default ResetPassword;