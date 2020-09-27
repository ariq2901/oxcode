import React, { Component, Fragment } from 'react';
import '../../App.css';

class Nav extends Component {
  render() {
    return(
      <Fragment>
        <nav>
          <ul className="nav-links">
            <li>home</li>
            <li>list attractions</li>
            <li>category</li>
            <li>about us</li>
          </ul>
          <button className="btn-nav-login">login</button>
        </nav>
      </Fragment>
    );
  }
}
export default Nav;