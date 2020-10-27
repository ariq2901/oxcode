import PopularSpots from './ComponentHome/PopularSpots';
import { useDispatch, useSelector } from 'react-redux';
import PopularCity from './ComponentHome/PopularCity';
import Board from './ComponentHome/Board';
import React, { Fragment } from 'react';
import Footer from './Footer';
import '../App.css';

const Home = () => {

  const [result, setResult] = React.useState([]);
  return(
    <Fragment>
      <section className="header">
        <div className="container">
          <div className="row">
            <Board result={result => setResult(result)}/>
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