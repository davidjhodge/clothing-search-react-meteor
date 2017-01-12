import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import './About.css';

class About extends Component {
  render() {
    return (
      <div>
        <PageHeader>
          The Future of Clothing Search
        </PageHeader>
        <p>
          Browsing the internet for clothes you'd actually wear is difficult.
        </p>
        <p>
          Why&#63; Because humans understand the context around clothing
          and current search engines don&#39;t.
        </p>
        <p>
          The occaision
          What you're wearing it with
        </p>
        <p>
          What if you could make search queries like
          <q>shirts to wear to the gym</q>
          , or
          <q>pants to wear to a party</q>
          &#63;
        </p>
        <p>
          Advances in machine learning and computer vision now make these kinds
          of searches possible.
        </p>
        <p>
          Our mission is to bring the context behind clothing and style to the
          internet. It&#39;s time that apparel to be more than products in a catalog.
        </p>
      </div>
    );
  }
}
// <img className="headerImage" src={'/images/about_compressed.jpg'}></img>

export default About;
