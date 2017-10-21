
/**
 * @class HttpClient
 */
class HttpClient {

  /**
   * Creates an instance of HttpClient.
   * @param {any} baseUrl 
   * @param {any} http the httpClient 
   */
  constructor(baseUrl, http) {
    this.baseUrl = baseUrl
    this.http = http
  }

  /**
   * @param {string} path 
   * @returns {Object} a promise object
   */
  get(path) {
    return this._sendRequest('GET', path)
  }

  /**
   * @param {string} path 
   * @param {Object} body 
   * @returns {Object} a promise object
   */
  post(path, body) {
    return this._sendRequest('POST', path, body)
  }

  /**
   * @param {string} path 
   * @param {Object} body 
   * @returns {Object} a promise object
   */
  delete(path, body) {
    return this._sendRequest('DELETE', path, body)
  }

  /**
   * @param {string} path 
   * @param {Object} body 
   * @returns {Object} a promise object
   */
  patch(path, body) {
    return this._sendRequest('PATCH', path, body)
  }

  /**
   * @param {string} method 
   * @param {string} path 
   * @param {Object} body 
   * @returns {Object} a promise object
   */
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

module.exports = HttpClient
