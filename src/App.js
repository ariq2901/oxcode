import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/ComponentHome/Nav';
import Home from './components/Home';
import ListAttraction from './components/ListAttraction';
import About from './components/About';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/list-attraction" component={ListAttraction} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;
