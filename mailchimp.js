var http = require('http');
var config = require('./config');
console.log(config.apiKey);
/**
 * Add a new suscriber to mailchimp list.
 * @param  {string} firstName  the firstName of the customer.
 * @param  {string} lastName  the lastName of the customer.
 * @param  {string} language  the language of the customer.
 * @param  {string} email  the email of the customer.
 */
var MailchimpHelper = function addSuscriber(firstName, lastName, language, email) {
    var subscriber = JSON.stringify({
        "email_address": email,
        "status": "subscribed",
        "merge_fields": {
            "FNAME": firstName,
            "LNAME": lastName
        },
        "language": language
    });

    var options = {
        host: 'us6.api.mailchimp.com',
        path: `/3.0/lists/${config.listId}/members`,
        method: 'POST',
        headers: {
            'Authorization': `randomUser ${config.apiKey}`,
            'Content-Type': 'application/json',
            'Content-Length': subscriber.length
        }
    };

    var hreq = http.request(options, function (hres) {
        console.log('STATUS CODE: ' + hres.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(hres.headers));
        hres.setEncoding('utf8');

        hres.on('data', function (chunk) {
            console.log('\n\n===========CHUNK===============')
            console.log(chunk);
        });

        // hres.on('end', function (res) {
        //     console.log('\n\n=========RESPONSE END===============');
        // });

        hres.on('error', function (e) {
            console.log('ERROR: ' + e.message);
        });
    });

    hreq.write(subscriber);
    hreq.end();
};

module.exports = MailchimpHelper;
