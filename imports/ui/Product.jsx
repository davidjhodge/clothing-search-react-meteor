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
    paddingHorizontal: 24,
    paddingBottom: 16,
    margin: 8,
    borderRadius: 4,
    cursor: 'pointer',
    float: 'left',
    height: 322,
    width: 220 - 32,
  },
  image: {
    height: 194,
    maxWidth: 172,
    resizeMode: 'contain',
    alignSelf: 'center',
    paddingBottom: 8,
  },
  title: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
    overflow: 'hidden',
    height: 33,
  },
  price: {
    fontSize: 14,
    paddingTop: 8,
    height: 20
  }
};

// background: #ffffff;
// text-align: center;
// color: #000000;
// /*display: inline-block;*/
// text-align: center;
// /*width: calc(25% - 2*32px);*/
// height: 322px;
// /*width: 220px;*/
// padding:16px;
// margin: 16px;
// border-radius: 4px;
// box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
// transition: all 0.3s cubic-bezier(.25,.8,.25,1);
// cursor: pointer;
// float: left;

class Product extends Component {
  render() {
    return (
      <a href={this.props.outboundUrl} target="_blank">
        <div style={styles.card}>
          <img src={this.props.imageUrl} style={styles.image}/>
          <span style={styles.title}>{this.props.title}</span>
          <span style={styles.price}>{this.props.price}</span>
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
