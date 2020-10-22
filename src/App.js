import React from 'react';
import './App.css';
import Nav from './components/ComponentHome/Nav';
import Home from './components/Home';
import ListAttraction from './components/ListAttraction';
import About from './components/About';
import Detail from './Detail';
import Login from './Login';
import ResetPassword from './components/ResetPassword';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/list-attraction" component={ListAttraction} />
        <Route path="/about" component={About} />
        <Route path="/detail" component={Detail} />
        <Route path='/login' component={Login} />
        <Route path='/reset-password/:token' component={ResetPassword} />
      </Switch>

    </Router>
  );
}

export default App;
