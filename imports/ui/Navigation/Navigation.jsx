import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import AccountsUIWrapper from '../Accounts/AccountsUIWrapper.jsx';
import './Navigation.css';

const styles = {
  navContainer: {
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
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  activeLink: {
    color: 'white',
    textDecoration: 'none',
  }
};

class Navigation extends Component {
  render() {
    return (
      <div style={styles.navContainer} className="nav-container">
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
            <AccountsUIWrapper />
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
