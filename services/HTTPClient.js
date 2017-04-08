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
    return new Promise((resolve, reject) => {
      this.params = JSON.stringify(params)
      this.options = {
        hostname: this.baseUrl,
        path: path,
        method: method,
        headers: method === 'GET' ? null : this._setHeaders(headers, this.params)
      }
      this.req = http.request(this.options, res => {
        res.setEncoding('utf8')
        const body = []
        res.on('data', (chunk) => body.push(chunk))
        res.on('end', () => resolve(body.join('')))
      })
      this.req.on('error', err => reject(err))
      this.req.write(this.params)
      this.req.end()
    })
  }
  _setHeaders (headers) {
    let defaultHeaders = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(this.params)
    }
    if (headers) {
      for (var header in headers) {
        defaultHeaders[header] = headers[header]
      }
    }
    return defaultHeaders
  }
}

module.exports = HTTPCLient
