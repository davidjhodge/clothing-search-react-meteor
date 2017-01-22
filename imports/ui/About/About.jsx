import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';
import './About.css';

class About extends Component {
  render() {
    return (
      <div className="content-container">
        <div>
          <h1>
            Our mission is to bring the context behind clothing and style to the
            internet.
          </h1>
        </div>
        <div className="image-container">
          <img src="images/vision_header.jpg" />
        </div>
        <div>
          <h3>Humans understand context -- machines don't</h3>
          <br />
          <p>
            People understand the context around clothing. We know that jeans aren't
            for working out at the gym, that certain dress shirts go great
            with khaki pants, and that Aunt Mary will kill you if you wear tennis shoes
            to church.
          </p>
          <br />
          <p>
            Current search engines don't understand this context that exists around
            the clothing.
            You're faced with looking through the entire product catalog of J. Crew.
          </p>
          <br />
          <p>
            What if you could make search queries like
            <q>shirts to wear to the gym</q>
            , or
            <q>pants to wear to a party</q>
            &#63;
          </p>
          <br />
          <p>
            Advances in machine learning and computer vision now make these kinds
            of searches possible.
          </p>
          <br />
          <p>
            We're working around the clock to build a simpler way to search
            for clothing. If you'd like to know more, of if you have a question/suggestion,
            head over to the Contact page and drop us a line.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
