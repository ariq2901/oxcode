import React, { Component, Fragment } from 'react';
import Nav from './ComponentHome/Nav';
import Board from './ComponentHome/Board';
import PopularSpots from './ComponentHome/PopularSpots';
import PopularCity from './ComponentHome/PopularCity';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import ListAttraction from './ListAttraction';
import '../App.css';
import ListAttraction from './ListAttraction';

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
    </Fragment>
  );
}

export default Home;