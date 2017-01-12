import React, { Component, PropTypes } from 'react';
import './Product.css';

const styles = {
  card: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    textAlign: 'center',
    color: 'black',
    borderRadius: 4,
    cursor: 'pointer',
    float: 'left',
  },
  productContents: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    maxHeight: 194,
    paddingBottom: 8,
    justifyContent: 'center',
    backgroundSize: 'contain',
  },
  image: {
    // resizeMode: 'contain',
    alignSelf: 'center',
  },
};

class Product extends Component {
  render() {
    return (
      <a href={this.props.outboundUrl} target="_blank">
        <div style={styles.card} className="card">
          <div style={styles.productContents} className="productContents">
            <div style={styles.imageContainer} className="image-container">
              <img src={this.props.imageUrl} style={styles.image} className="image"/>
            </div>
            <span className="title">{this.props.title}</span>
            <span className="price">{this.props.price}</span>
          </div>
        </div>
      </a>
    );
  }
}

Product.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  outboundUrl: PropTypes.string.isRequired,
};

export default Product;
