import React, { Fragment } from 'react';
import ProfileHeading from './ComponentProfile/ProfileHeading';
import Footer from '../components/Footer';

const Profile = () => {
  return(
    <Fragment>
      <section className="header netral">
        <div className="container">
          <div className="row">
            <ProfileHeading />
          </div>
        </div>
      </section>
      <Footer/>
    </Fragment>
  );
}
export default Profile;