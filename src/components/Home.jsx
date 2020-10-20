import React, { Fragment } from 'react';
import Board from './ComponentHome/Board';
import PopularSpots from './ComponentHome/PopularSpots';
import PopularCity from './ComponentHome/PopularCity';
import '../App.css';
import Footer from './Footer';

const Home = () => {
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
            <PopularSpots />
          </div>
          <div className="row">
            <PopularCity />
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}

export default Home;