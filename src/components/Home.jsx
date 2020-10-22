import React, { Fragment } from 'react';
import '../App.css';
import Board from './ComponentHome/Board';
import PopularSpots from './ComponentHome/PopularSpots';
import PopularCity from './ComponentHome/PopularCity';
import Footer from './Footer';

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