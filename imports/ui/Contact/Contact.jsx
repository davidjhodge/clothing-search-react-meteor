import React, { Component } from 'react';
import { Button, PageHeader, FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { validateEmail } from '../../../utils/validate.js';
import './Contact.css';

/* This function is used to validate the user's email text input */

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: ""
    };
  }

  onSendClick() {
    // Check if email input is valid and if message has any content
    if (validateEmail(this.state.email) && this.state.message.length > 0) {
      Meteor.call('sendContactForm', this.state.email, this.state.message, (error,response) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Contact Form Email sent successfully");
        }
      });
    }
  }

  onEmailChanged(event) {
    this.state.email = event.target.value;
  }

  onMessageChanged(event) {
    this.state.message = event.target.value;
  }

  render() {
    return(
      <div className="contents-container">
        <FormGroup controlId="email">
          <FormControl
            type="email"
            placeholder="Email"
            onChange={this.onEmailChanged.bind(this)}
            className="email-form" />
        </FormGroup>
        <FormGroup controlId="message">
          <FormControl
            componentClass="textarea"
            type="message"
            placeholder="Message"
            onChange={this.onMessageChanged.bind(this)}
            className="message-form" />
        </FormGroup>
        <FormGroup>
          <Col sm={14}>
            <Button type="submit" onClick={this.onSendClick.bind(this)}>
              Send Message
            </Button>
          </Col>
        </FormGroup>
      </div>
    );
  }
}

export default Contact;
