import { Meteor } from 'meteor/meteor';
import { validateEmail } from '../../utils/validate.js';

// Store mailgun credentials
var api_key = 'key-a5dec5115e4a3df1ea2d577be14ec998';
var domain = 'sandbox061b9fcfb4bb4ba8935f2ee9f20083de.mailgun.org';

Meteor.methods({
  'sendContactForm'(email,message) {
    // Validate inputs
    check(email, String);
    check(message, String);
    if (validateEmail(email) && message.length > 0) {
      // Valid inputs
      // Send email
      Email.send({to:'dhodge416@gmail.com', from: email, subject:'Website Form Submission', text: message});
    }
  },
});
