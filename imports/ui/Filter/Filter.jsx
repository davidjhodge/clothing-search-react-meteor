import React, { Component } from 'react';
import CategoryList from './CategoryList/CategoryList.jsx';
import BrandList from './BrandList/BrandList.jsx';
import PriceFilter from './PriceFilter/PriceFilter.jsx';
import './Filter.css';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      brands: [],
      prices: {},
    };
  }

  updateFilters() {
    this.props.onFilterChange(
      this.state.categories,
      this.state.prices,
      this.state.brands
    );
  }

  categoriesSelected(newCategories) {
    this.state.categories = newCategories;
    this.updateFilters();
  }

  brandsSelected(newBrands) {
    this.state.brands = newBrands;
    this.updateFilters();
  }

  priceRangeChanged(min, max) {
    // TODO handle multiple price range selections
    this.state.prices = {
      "min": min,
      "max": max,
    };
    this.updateFilters();
    console.log("Min: " + min + ", Max: " + max);
  }

  render() {
    return (
      <div className="filter-container">
        <CategoryList onCategoryChange={this.categoriesSelected.bind(this)} />
        <PriceFilter onPriceChange={this.priceRangeChanged.bind(this)} />
        <BrandList onBrandSelection={this.brandsSelected.bind(this)} />
      </div>
    );
  }
}

export default Filter;
