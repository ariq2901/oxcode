import React, { Fragment } from 'react';
import Board from './ComponentList/Board';
import ListGrid from './ComponentList/ListGrid';

const ListAttraction = () => {
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
            <ListGrid />
          </div>
        </div>
      </section>
    </Fragment>
  );
}
export default ListAttraction;
