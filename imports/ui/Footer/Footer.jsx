import React, { Component } from 'react';
import { Link } from 'react-router';
// import styles
import './Footer.css';

const styles = {
  activeLink: {
    color: '#4a4a4a',
    textDecoration: 'none',
  },
};

class Footer extends Component {
  render() {
    return(
      <div className="footerContainer">
        <div className="affiliate-disclaimer">
          <span className="footerText">
            This site uses affiliate links. See the full disclosure on the Terms Page.
          </span>
        </div>
        <div className="seperator" />
        <ul className="list">
          <li className="link">
            <Link
              to="/our-vision"
              activeStyle={styles.activeLink}
              className="link">Our Vision</Link>
          </li>
          <li className="link">
            <Link
              to="/contact"
              activeStyle={styles.activeLink}
              className="link">Contact</Link>
          </li>
        </ul>
        <span className="footerText copyright-text">Copyright Layers, 2016</span>
      </div>
    );
  }
}

export default Footer;
