import React, { Component, Dimensions } from 'react';
import { IndexLink } from 'react-router';
import './NotFound.css';

const styles = {
    container: {
      display: 'flex',
      flex:1,
      flexDirection:'row',
      justifyContent: 'center',
      paddingTop: 128,
      paddingRight: 48,
      paddingLeft: 48,
      paddingBottom: 48,
    },
    headline: {
      fontFamily: 'Lato',
      fontSize: 24,
    },
    description: {
      fontFamily: 'Lato',
      fontSize: 20,
    },
    link: {
      color: '#4c85ee',
      textDecoration: 'none',
      fontFamily: 'Lato',
      fontSize: 20,
    },
    ctaContainer: {
      padding: 48,
      textAlign: 'center',
    }
};

class NotFound extends Component {
  render() {
    return(
      <div style={styles.container}>
        <div>
          <span
            style={styles.headline}>
            Whoops! There's nothing to see on this page.
          </span>
          <div style={styles.ctaContainer}>
            <span style={styles.description}>Click </span>
            <IndexLink
              to="/"
              style={styles.link}>here</IndexLink>
            <span style={styles.description}> to go back to search.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
