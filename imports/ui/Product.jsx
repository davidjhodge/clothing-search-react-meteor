import React, { Component, PropTypes } from 'react';

const styles = {
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 194,
    maxWidth: 172,
    resizeMode: 'contain',
    alignSelf: 'center',
  }
}

class Product extends Component {
  render() {
    return (
      <div style={styles.card}>
        <img src={this.props.imageUrl} style={styles.image}/>
        <span style={styles.title}>{this.props.title}</span>
        <span style={styles.price}>{this.props.price}</span>
      </div>
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
