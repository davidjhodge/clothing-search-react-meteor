import React, { Component } from 'react';
import '../Filter.css';

class BrandList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brands: []
    };
  }

  componentDidMount() {
    this.getBrands();
  }

  getBrands() {
    Meteor.call('fetchBrands', (error, response) => {
      if (!error) {
        this.setState({
          brands: response
        });
      }
    });
  }

  render() {
    return (
      <div className="filter-section">
        <span className="filter-title">BRANDS</span>
        <form>
          <ul className="filter-list">
            {this.state.brands.map((brand, index) => (
              <li key={index}>
                <label className="filter-item">
                  <input
                    className="filter-checkbox"
                    name="category"
                    type="checkbox" />
                  {brand.name}
                </label>
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}

export default BrandList;
