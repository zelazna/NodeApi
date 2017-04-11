const HttpClient = require('../../services/httpClient')
const expect = require('chai').expect
const sinon = require('sinon')
let client, http, options = {
  uri: 'http://localhost/customers',
  json: true,
  body: { test: 'test' }
}

beforeEach(() => {
  http = sinon.spy();
  client = new HttpClient('http://localhost', http)
})

describe('HttpClient', () => {

  describe('#constructor()', () => {
    it('should have the correct values', () => {
      expect(client.baseUrl).to.equal('http://localhost')
      expect(client.http).to.equal(http)
    })
  })

  describe('#get()', () => {
    it('should call _sendRequest with the right params', () => {
      client.get('/customers')
      options.method = 'GET'
      options.body = undefined
      expect(http.calledWith(options)).to.be.true;
    })
  })

  describe('#delete()', () => {
    it('should call _sendRequest with the right params', () => {
      client.delete('/customers', options.body)
      options.method = 'DELETE'
      expect(http.calledWith(options)).to.be.true;

    })
  })

  describe('#post()', () => {
    it('should call _sendRequest with the right params', () => {
      client.post('/customers', options.body)
      options.method = 'POST'
      expect(http.calledWith(options)).to.be.true;
    })
  })

  describe('#patch()', () => {
    it('should call _sendRequest with the right params', () => {
      client.patch('/customers', options.body)
      options.method = 'PATCH'
      expect(http.calledWith(options)).to.be.true;
    })
  })
})

