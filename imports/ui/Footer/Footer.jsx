import React, { Component } from 'react';
import { Link } from 'react-router';
// import styles
import './Footer.css';

class Footer extends Component {
  render() {
    return(
      <div className="footerContainer">
        <div className="seperator" />
        <ul className="list">
          <li>
            <Link
              to="/our-mission"
              activeClassName="active"
              className="link">Our Vision</Link>
          </li>
          <li>
            <Link
              to="/contact"
              activeClassName="active"
              className="link">Contact</Link>
          </li>
        </ul>
        <span className="footerText">Copyright Layers, 2016</span>
      </div>
    );
  }
}

export default Footer;
