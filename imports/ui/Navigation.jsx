import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';

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
  logo: {
    height: 30,
    width: 120,
    paddingLeft: 48,
    fontFamily: 'Lato',
    fontSize: 24,
    color: 'white',
    letterSpacing: 2.8,
    fontWeight: 'regular',
    alignSelf: 'center',
    textDecoration: 'none',
  },
  navLinksContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    height: 18,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 48,
  },
  link: {
    fontFamily: 'Lato',
    fontSize: 14,
    color: 'white',
    fontWeight: 'regular',
    textDecoration: 'none',
    padding: 16,
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
            style={styles.logo}>LAYERS</IndexLink>
          <div style={styles.navLinksContainer}>
            <Link
              to="/our-mission"
              activeClassName="active"
              style={styles.link}>Our Mission</Link>
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
