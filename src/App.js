import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/ComponentHome/Nav';
import Home from './components/Home';
import ListAttraction from './components/ListAttraction';
import About from './components/About';
import Detail from './Detail';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
<<<<<<< HEAD
        <Route path='/login' component={Login} />
        <Nav>
          <Route path="/" exact component={Home} />
          <Route path="/list-attraction" component={ListAttraction} />
          <Route path="/about" component={About} />
          <Route path="/detail" component={Detail} />
        </Nav>
=======
        <Route path="/" exact component={Home} />
        <Route path="/list-attraction/:type?" component={ListAttraction} />
        <Route path="/about" component={About} />
        <Route path="/detail" component={Detail}/>
>>>>>>> de57c3a63d96caac7becf1e4fde312e6230a62dc
      </Switch>

    </Router>
  );
}

export default App;
