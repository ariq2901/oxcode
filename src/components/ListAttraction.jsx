import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import Board from './ComponentList/Board';
import ListGrid from './ComponentList/ListGrid';
import Footer from './Footer';

const ListAttraction = (props) => {
  const [result, setResult] = useState([]);
  let{ type } = useParams();
  return(
    <Fragment>
      <section className="header">
        <div className="container">
          <div className="row">
            <Board result={result => setResult(result)} />
          </div>
        </div>
      </section>
      <section className="main">
        <div className="container">
          <div className="row">
            <ListGrid type={type} resulta={result}/>
          </div>
        </div>
      </section>
      <Footer/>
    </Fragment>
  );
}
export default ListAttraction;
