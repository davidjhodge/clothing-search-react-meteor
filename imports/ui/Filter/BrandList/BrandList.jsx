import React, { Component } from 'react';
import '../Filter.css';

class BrandList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brands: [],
      selections: [],
      searchString: "",
      page: 0,
    };
  }

  componentDidMount() {
    this.getBrands(this.state.page);
  }

  getBrands(page) {
    Meteor.call('fetchBrands', page, (error, response) => {
      if (!error) {
        brands = [];
        if (this.state.brands.length > 0) {
          Array.prototype.push.apply(this.state.brands,response);
        } else {
          brands = response;
        }
        this.setState({
          brands: brands,
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
