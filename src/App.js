import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import ListAttraction from './components/ListAttraction';
import About from './components/About';
import Detail from './Detail';
import Login from './Login';
import Register from './Register';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import AuthGuarder from "./components/Guarder/AuthGuarder";
import LoginCallback from './LoginCallback';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/list-attraction/:type?">
            <ListAttraction/>
          </Route>
          <Route path="/about" component={About} />
          <Route path="/detail/:id" component={Detail} />
          <AuthGuarder path='/oauth/:provider/callback'>
            <LoginCallback />
          </AuthGuarder>
          <AuthGuarder path='/login'>
            <Login />
          </AuthGuarder>
          <AuthGuarder path='/register'>
            <Register />
          </AuthGuarder>
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/reset-password/:token' component={ResetPassword} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
