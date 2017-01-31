import React, { Component } from 'react';
import CategoryList from './CategoryList/CategoryList.jsx';
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
      categories: [],
      priceRanges: [],
      brands: [],
      gender: "m",
    };
  }

  updateFilters() {
    this.props.onFilterChange(
      this.state.categories,
      this.state.priceRanges,
      this.state.brands
    );
  }

  // Change selected gender
  changeGender(type) {
    check(type, String);
    if (type == "m" || type == "f") {
      this.setState({
        gender: type,
      });
    }
  }

  categoriesSelected(newCategories) {
    this.state.categories = newCategories;
    this.updateFilters();
  }

  brandsSelected(newBrands) {
    this.state.brands = newBrands;
    this.updateFilters();
  }

  priceRangeChanged(priceRanges) {
    // TODO handle multiple price range selections
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
        <CategoryList onCategoryChange={this.categoriesSelected.bind(this)}
          gender={this.state.gender} />
        <PriceFilter onPriceChange={this.priceRangeChanged.bind(this)} />
        <BrandList onBrandSelection={this.brandsSelected.bind(this)}
          gender={this.state.gender}/>
      </div>
    );
  }
}

export default Filter;
