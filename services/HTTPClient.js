class HTTPClient {
  constructor(baseUrl, http) {
    this.baseUrl = baseUrl
    this.http = http
  }
  get(path) {
    return this._sendRequest('GET', path)
  }
  post(path, body) {
    return this._sendRequest('POST', path, body)
  }
  delete(path, body) {
    return this._sendRequest('DELETE', path, body)
  }
  patch(path, body) {
    return this._sendRequest('PATCH', path, body)
  }
  _sendRequest(method, path, body) {
    let options = {
      uri: this.baseUrl + path,
      method: method,
      body: body,
      json: true
    }
    return this.http(options)
  }
}

module.exports = HTTPClient
