import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { validateEmail } from '../../../utils/validate.js';
import './Contact.css';

/* This function is used to validate the user's email text input */

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      messageSuccess: false, // On a successfully sent message
      isLoading: false,

    };
  }

  onSendClick() {
    // Check if email input is valid and if message has any content
    if (validateEmail(this.state.email) && this.state.message.length > 0) {
      this.setState({ isLoading: true });
      Meteor.call('sendContactForm', this.state.email, this.state.message, (error,response) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Contact Form Email sent successfully");
          this.setState({
            messageSuccess: true
          });
        }
        this.setState({ isLoading: false });
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
          <button
            className="uk-button uk-button-default send-button"
            hidden={this.state.messageSuccess}
            disabled={this.state.isLoading}
            onClick={this.onSendClick.bind(this)}>
            Send Message
          </button>
          <span
            className="send-loading"
            hidden={!this.state.isLoading}>
            Sending...</span>
        </FormGroup>
        <div id="span-container" hidden={!this.state.messageSuccess}>
          <span
            className="contact-message-completion">
            Thanks for reaching out! We'll get back to you as soon as we can.
          </span>
        </div>
      </div>
    );
  }
}

export default Contact;
