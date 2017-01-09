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
  link: {
    fontFamily: 'Lato',
    fontSize: 14,
    color: 'white',
    fontWeight: 'regular',
    textDecoration: 'none',
    padding: 16,
    letterSpacing: 0.5,
  }
}

class Navigation extends Component {
  render() {
    return (
      <div style={styles.navContainer}>
        <div style={styles.horizontalContainer}>
          <IndexLink
            to="/"
            activeClassName="active"
            className="logo">LAYERS</IndexLink>
          <div style={styles.navLinksContainer} className="navLinksContainer">
            <Link
              to="/our-mission"
              activeClassName="active"
              style={styles.link}>Our Vision</Link>
            <Link
              to="/contact"
              activeClassName="active"
              style={styles.link}>Contact</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
