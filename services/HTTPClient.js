const http = require('https')

class HTTPCLient {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }
  get (path, params, headers) {
    return this._sendRequest('GET', path, params, headers)
  }
  post (path, params, headers) {
    return this._sendRequest('POST', path, params, headers)
  }
  delete (path, params, headers) {
    return this._sendRequest('DELETE', path, params, headers)
  }
  _sendRequest (method, path, params, headers) {
    this.params = JSON.stringify(params)
    this.options = {
      hostname: this.baseUrl,
      path: path,
      method: method,
      headers: headers || {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(this.params)
      }
    }
    this.req = http.request(this.options, res => {
      console.log(`STATUS CODE: ${res.statusCode}`)
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
      res.setEncoding('utf8')
      res.on('data', chunk => {
        console.log(`BODY: ${chunk}`)
      })
      res.on('end', () => {
        console.log('No more data in response.')
      })
      res.on('error', e => console.log(`ERROR: ' ${e.message}`))
    })
    this.req.write(params)
    this.req.end()
  }
}

module.exports = HTTPCLient
