import React, { Fragment } from 'react';
import Board from './ComponentAbout/Board';
import AboutMain from './ComponentAbout/AboutMain';

const About = () => {
  return(
    <Fragment>
      <section className="header">
        <div className="container">
          <div className="row">
            <Board />
          </div>
        </div>
      </section>
      <section className="main">
        <div className="container">
          <div className="row">
            <AboutMain />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
export default About;