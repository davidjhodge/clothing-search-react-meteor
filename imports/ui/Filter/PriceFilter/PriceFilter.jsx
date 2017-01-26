import React, { Component } from 'react';
import '../Filter.css';
import './PriceFilter.css';

class PriceFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceRanges: this.priceRanges(),
      minPrice: "0",
      maxPrice: "100000",
    };
  }

  priceRanges() {
    return [
      {
        "min": "0",
        "max": "50",
      },
      {
        "min": "50",
        "max": "100",
      },
      {
        "min": "100",
        "max": "150",
      },
      {
        "min": "150",
        "max": "250",
      },
      {
        "min": "250",
        "max": "500",
      },
    ];
  }

  minChanged(event) {
    this.state.minPrice = event.target.value;
    this.props.onPriceChange(this.state.minPrice, this.state.maxPrice);
  }

  maxChanged(event) {
    this.state.maxPrice = event.target.value;
    this.props.onPriceChange(this.state.minPrice, this.state.maxPrice);
  }

  render() {
    return (
      <div className="filter-section">
        <span className="filter-title">PRICE</span>
        <form>
          <div>
            <input
              type="number"
              placeholder="min"
              className="price-input"
              onChange={this.minChanged.bind(this)} />
            <span id="to-separator">to</span>
            <input
              type="number"
              placeholder="max"
              className="price-input"
              onChange={this.maxChanged.bind(this)} />
          </div>
          <ul className="filter-list">
            {this.state.priceRanges.map((priceRange, index) => (
              <li key={index}>
                <label className="filter-item">
                  <input
                    className="filter-checkbox"
                    name="category"
                    type="checkbox" />
                  ${priceRange.min} - {priceRange.max}
                </label>
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}

export default PriceFilter;
