import React, { Component } from 'react';
import BrandList from './BrandList/BrandList.jsx';
import PriceFilter from './PriceFilter/PriceFilter.jsx';
import { Button } from 'react-bootstrap';
import './Filter.css';

const styles = {
  womenButton: {
    marginRight: 0,
  }
};


class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      priceRanges: [],
      brands: [],
      gender: "m",
    };
  }

  updateFilters() {
    this.props.onFilterChange(
      this.state.gender,
      this.state.priceRanges,
      this.state.brands
    );
  }

  // Change selected gender
  changeGender(type) {
    check(type, String);
    if (type == "m" || type == "f") {
      this.state.gender = type;
      this.setState({
        gender: type,
      });
      this.updateFilters();
    }
  }

  brandsSelected(newBrands) {
    this.state.brands = newBrands;
    this.updateFilters();
  }

  priceRangeChanged(priceRanges) {
    this.state.priceRanges = priceRanges;
    this.updateFilters();
  }

  render() {
    return (
      <div className="filter-container">
        <div className="gender-button-container">
          <button
            onClick={() => this.changeGender("m")}
            className={"gender-button" +
              ((this.state.gender == "m") ? " gender-button-selected" : "")}>
              Men</button>
          <button
            onClick={() => this.changeGender("f")}
            style={styles.womenButton}
            className={"gender-button" +
              ((this.state.gender == "f") ? " gender-button-selected" : "")}>
              Women</button>
        </div>
        <PriceFilter onPriceChange={this.priceRangeChanged.bind(this)} />
      </div>
    );
  }
}

export default Filter;
