import React, { Component } from 'react';
import '../Filter.css';

class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allCategories: [],
      selections: [],
    };
  }

  // This executes after the component renders (is mounted)
  componentDidMount() {
    this.getCategories();
  }

  // componentWillReceiveProps() {
  //   this.updateCategoryFilters();
  // }

  getCategories() {
    Meteor.call('fetchCategories', (error, response) => {
      if (!error) {
        this.state.allCategories = response;
        this.updateCategoryFilters();
      }
    });
  }

  // Uses a hack (some iteration) to filter out categories of the other gender's style
  updateCategoryFilters() {
    gender = this.state.gender;
    // Set name of parent key to remove all items
    parentKey = "women";
    if (gender == "f") {
      parentKey = "m";
    }

    allCategories = this.state.allCategories;
    parentCategories = [];
    allCategories.forEach(function(category, index) {
      if (category.id == parentKey) {
        allCategories.splice(index, 1);
      }
      // Get all categories whose parent is "women"
      if (category.parentId == parentKey) {
        parentCategories.push(category.id);
        allCategories.splice(index, 1);
      }

      allCategories.forEach(function(category, index) {
        if (parentCategories.includes(category.parentId)) {
          allCategories.splice(index, 1);
        }
      });
    });

    if (allCategories.length > 0) {
      this.setState({
        categories: allCategories,
      });
    }
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

    this.state.selections = selections;

    // Update parent component
    this.props.onCategoryChange(this.state.selections);
  }

  render() {
    return (
      <div className="filter-section">
        <span className="filter-title">CATEGORIES</span>
        <form>
          <ul className="filter-list category-filters">
            {this.state.allCategories.map((category, index) => (
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
