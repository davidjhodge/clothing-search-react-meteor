import React, { Component } from 'react';

const styles = {
  navContainer: {
    height: 70,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4c85ee'
  },
  verticalContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
    alignSelf: 'center,'
  },
}

class Navigation extends Component {
  render() {
    return (
      <div style={styles.navContainer}>
        <div style={styles.verticalContainer}>
          <span style={styles.logo}>LAYERS</span>
        </div>
      </div>
    );
  }
}

export default Navigation;
