import React, { Component } from 'react';
import '../Filter.css';
import './PriceFilter.css';

class PriceFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceRanges: [],
      selections: [],
    };
  }

  componentDidMount() {
    this.getPrices();
  }

  getPrices() {
    Meteor.call('fetchPrices', (error, response) => {
      if (!error) {
        this.setState({
          priceRanges: response
        });
      }
    });
  }

  inputToggle(event) {
    var checkbox = event.target;
    priceRangeId = checkbox.value;
    // Add category if it does not exist. If it does exist, remove it
    index = this.state.selections.indexOf(priceRangeId);
    selections = this.state.selections;

    if (index > -1) {
      // Exists. Let's remove it
      selections.splice(index, 1);
    } else {
      selections.push(priceRangeId);
    }

    this.state.selections = selections;

    // Update parent component
    this.props.onPriceChange(this.state.selections);
  }

  render() {
    return (
      <div className="filter-section">
        <span className="filter-title">PRICE</span>
        <form>
          <ul className="filter-list">
            {this.state.priceRanges.map((priceRange, index) => (
              <li key={index}>
                <label className="filter-item">
                  <input
                    className="filter-checkbox"
                    name="category"
                    type="checkbox"
                    value={priceRange.id}
                    onClick={this.inputToggle.bind(this)} />
                    {priceRange.name}
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
