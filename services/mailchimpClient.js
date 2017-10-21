const http = require('http')

/**
 * Add a new suscriber to mailchimp list.
 * @param  {string} firstName  the firstName of the customer.
 * @param  {string} lastName  the lastName of the customer.
 * @param  {string} language  the language of the customer.
 * @param  {string} email  the email of the customer.
 */

const MailchimpHelper = function addSuscriber (firstName, lastName, language, email) {
  const body = JSON.stringify({
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    },
    language
  })

  const options = {
    host: process.env.MAILCHIMP_HOST,
    path: `/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
    method: 'POST',
    headers: {
      Authorization: `randomUser ${process.env.MAILCHIMP_APIKEY}`,
      'Content-Type': 'application/json',
      'Content-Length': body.length
    }
  }

  const req = http.request(options, res => {
    console.log(`STATUS CODE: ${res.statusCode}`)
    res.setEncoding('utf8')
    res.on('error', e => console.log(`ERROR: ' ${e.message}`))
  })

  req.write(body)
  req.end()
}

module.exports = MailchimpHelper
