import { Meteor } from 'meteor/meteor';

import '../imports/api/products.js';
import '../imports/api/contact.js';

Meteor.startup(() => {
  // code to run on server at startup
  process.env.MAIL_URL = 'smtp://postmaster%40sandbox061b9fcfb4bb4ba8935f2ee9f20083de.mailgun.org:8f4f796d558cff526f7eaa6cd9185c4c@smtp.mailgun.org:587'
});
