const http = require('http');
const path = require('path');

const config = require(path.join(__dirname, './config.json')).mailchimp;

/**
 * Add a new suscriber to mailchimp list.
 * @param  {string} firstName  the firstName of the customer.
 * @param  {string} lastName  the lastName of the customer.
 * @param  {string} language  the language of the customer.
 * @param  {string} email  the email of the customer.
 */

const MailchimpHelper = function addSuscriber(firstName, lastName, language, email) {
  const subscriber = JSON.stringify({
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName,
    },
    language,
  });

  const options = {
    host: config.host,
    path: `/3.0/lists/${config.listId}/members`,
    method: 'POST',
    headers: {
      Authorization: `randomUser ${config.apiKey}`,
      'Content-Type': 'application/json',
      'Content-Length': subscriber.length,
    },
  };

  const hreq = http.request(options, (hres) => {
    console.log(`STATUS CODE: ${hres.statusCode}`);
    hres.setEncoding('utf8');
    hres.on('error', e => console.log(`ERROR: ' ${e.message}`));
  });

  hreq.write(subscriber);
  hreq.end();
};

module.exports = MailchimpHelper;
