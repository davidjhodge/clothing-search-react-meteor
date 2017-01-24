import React, { Component } from 'react';
import BrandList from './BrandList/BrandList.jsx';
import './Filter.css';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      prices: [],
    };
  }

  // This executes after the component renders (is mounted)
  componentDidMount() {
    this.getCategories();
  }

  getCategories() {
    Meteor.call('fetchCategories', (error, response) => {
      if (!error) {
        this.setState({
          categories: response
        });
      }
    });
  }

  render() {
    return (
      <div className="filter-container">
        <div className="filter-section">
          <span className="filter-title">CATEGORIES</span>
          <form>
            <ul className="filter-list">
              {this.state.categories.map((category, index) => (
                <li key={index}>
                  <label className="filter-item">
                    <input
                      className="filter-checkbox"
                      name="category"
                      type="checkbox" />
                    {category.shortName}
                  </label>
                </li>
              ))}
            </ul>
          </form>
        </div>
        <div className="filter-section">
          <span className="filter-title">PRICE</span>
        </div>
        <BrandList />
      </div>
    );
  }
}

export default Filter;
