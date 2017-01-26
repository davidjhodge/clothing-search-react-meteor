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
        <CategoryList onCategoryChange={this.categoriesSelected.bind(this)}
          gender={this.state.gender} />
        <PriceFilter onPriceChange={this.priceRangeChanged.bind(this)}
          gender={this.state.gender} />
        <BrandList onBrandSelection={this.brandsSelected.bind(this)}
          gender={this.state.gender}/>
      </div>
    );
  }
}

export default Filter;
