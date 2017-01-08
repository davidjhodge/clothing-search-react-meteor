import React, { Component, PropTypes } from 'react';

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
    margin: 8,
    borderRadius: 4,
    cursor: 'pointer',
    float: 'left',
    height: 322,
    width: 220,
  },
  productContents: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  imageContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    height: 194,
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: 14,
    paddingVertical: 8,
    overflow: 'hidden',
    height: 34,
    fontFamily: 'Lato',
  },
  price: {
    fontSize: 14,
    paddingTop: 8,
    height: 20,
    fontFamily: 'Lato',
  }
};

class Product extends Component {
  render() {
    return (
      <a href={this.props.outboundUrl} target="_blank">
        <div style={styles.card}>
          <div style={styles.productContents}>
            <div style={styles.imageContainer}>
              <img src={this.props.imageUrl} style={styles.image}/>
            </div>
            <span style={styles.title}>{this.props.title}</span>
            <span style={styles.price}>{this.props.price}</span>
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
