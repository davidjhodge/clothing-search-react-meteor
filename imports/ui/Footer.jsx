import React, { Component } from 'react';

const styles = {
  footerContainer: {
    backgroundColor: 'white',
    height: 70,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

class Footer extends Component {
  render() {
    return(
      <div style={styles.footerContainer}>
        <span>Links to other stuff on the site</span>
      </div>
    );
  }
}

export default Footer;
