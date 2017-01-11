import React, { Component } from 'react';
import { Button, PageHeader, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';

class Contact extends Component {
  render() {
    return(
      <div>
        <FormGroup controlId="email">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>
        <FormGroup controlId="content">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">
              Send
            </Button>
          </Col>
        </FormGroup>
      </div>
    );
  }
}

export default Contact;
