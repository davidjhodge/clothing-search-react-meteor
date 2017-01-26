import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import '../Filter.css';

class BrandList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brands: [],
      selections: [],
      searchString: "",
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

  searchTextChanged(text) {
    this.state.searchString = text;
  }

  inputToggle(event) {
    var checkbox = event.target;
    brandId = checkbox.value;
    // Add category if it does not exist. If it does exist, remove it
    index = this.state.selections.indexOf(brandId);
    selections = this.state.selections;

    if (index > -1) {
      // Exists. Let's remove it
      selections.splice(index, 1);
    } else {
      selections.push(brandId);
    }

    this.state.selections = selections;

    // Update parent component
    this.props.onBrandSelection(this.state.selections);
  }

  render() {
    return (
      <div className="filter-section">
        <span className="filter-title">BRANDS</span>
        <Typeahead
          placeholder="Search brands..."
          onInputChange={this.searchTextChanged.bind(this)}
          onChange={this.props.onBrandSelection}
          options={this.state.brands.map(function(brand) { return brand.name; })}
          emptyLabel="" />
        <form>
          <ul className="filter-list">
            {this.state.brands.map((brand, index) => (
              <li key={index}>
                <label className="filter-item">
                  <input
                    className="filter-checkbox"
                    name="category"
                    type="checkbox"
                    value={brand.id}
                    onClick={this.inputToggle.bind(this)} />
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
