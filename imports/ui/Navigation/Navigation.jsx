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
    // display: 'flex',
    // flex: 1,
    // flexDirection: 'row',
    // height: 70,
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

  searchBarEntered() {

  }

  searchTextChanged () {

  }

  currentSearch() {

  }

  render() {
    return (
      <div style={styles.navContainer} className="nav-container">
        <div
          className="nav-bar"
          style={styles.horizontalContainer}>
          <IndexLink
            to="/"
            activeStyle={styles.activeLink}
            className="logo">LAYERS</IndexLink>
          <div style={styles.navLinksContainer} className="navLinksContainer">
            <Link
              to="/clothing-search"
              activeStyle={styles.activeLink}
              className="nav-link">Clothing Search</Link>
            <Link
              to="/our-vision"
              activeStyle={styles.activeLink}
              className="nav-link">Our Vision</Link>
            <AccountsUIWrapper />
          </div>
        </div>
        <div className="lower-nav">
          <div
            className="headline-container"
            style={styles.headlineContainer}>
            <span
              className="headline">
              Fashion collections, curated by you.
            </span>
          </div>
          <form
            onSubmit={this.searchBarEntered.bind(this)}
            style={styles.searchContainer}
            className="search-container">
            <input
              type="text"
              placeholder="Search collections..."
              style={styles.searchBar}
              className="search-bar"
              onChange={this.searchTextChanged.bind(this)} />
            <button
              className="search-button"
              onClick={this.currentSearch.bind(this)}
              >
              <img
                src="images/search-glass.svg"
                className="search-icon" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Navigation;
