import React, { Component } from 'react';
import '../Filter.css';

class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      selections: [],
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

  inputToggle(event) {
    var checkbox = event.target;
    categoryId = checkbox.value;
    // Add category if it does not exist. If it does exist, remove it
    index = this.state.selections.indexOf(categoryId);
    selections = this.state.selections;

    if (index > -1) {
      // Exists. Let's remove it
      selections.splice(index, 1);
    } else {
      selections.push(categoryId);
    }

    // Update state
    this.setState({
      selections: selections,
    });

    // Update parent component
    this.props.onCategoryChange(this.state.selections);
  }

  render() {
    return (
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
                    type="checkbox"
                    value={category.id}
                    onClick={this.inputToggle.bind(this)} />
                  {category.shortName}
                </label>
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}

export default CategoryList;
