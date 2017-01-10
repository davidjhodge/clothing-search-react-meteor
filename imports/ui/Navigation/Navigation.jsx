import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import './Navigation.css';

const styles = {
  navContainer: {
    height: 70,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#4c85ee'
  },
  horizontalContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  navLinksContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    height: 18,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  activeLink: {
    color: 'white',
    textDecoration: 'none',
  }
}

class Navigation extends Component {
  render() {
    return (
      <div style={styles.navContainer}>
        <div style={styles.horizontalContainer}>
          <IndexLink
            to="/"
            activeStyle={styles.activeLink}
            className="logo">LAYERS</IndexLink>
          <div style={styles.navLinksContainer} className="navLinksContainer">
            <Link
              to="/our-vision"
              activeStyle={styles.activeLink}
              className="nav-link">Our Vision</Link>
            <Link
              to="/contact"
              activeStyle={styles.activeLink}
              className="nav-link">Contact</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
