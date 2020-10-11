import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';
import './App.css'
import Detail from './Detail';

const App = () => {
  return (
    <Fragment>
      <Detail />
    </Fragment>
  );
}

export default App;
