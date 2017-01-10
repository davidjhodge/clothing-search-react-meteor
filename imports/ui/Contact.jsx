import React, { Component } from 'react';
import { PageHeader, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';

class Contact extends Component {
  render() {
    return(
      <div>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>
      </div>
    );
  }
}

export default Contact;
