const HttpClient = require('../../services/httpClient')
const expect = require('chai').expect
const sinon = require('sinon')
const http = require('http')
let client

beforeEach(() => {
  client = new HttpClient('http://localhost')
  sinon
    .stub(http, 'request')
    .yields(null, null, JSON.stringify({ login: "bulkan" }));
})

describe('HttpClient', () => {
  describe('#constructor()', () => {
    it('should have the correct values', () => {
      expect(client.baseUrl).to.equal('http://localhost')
    })
  })
  describe('#get()', () => {
    it('has to return a promise with expected data', (done) => {
      result = client.post('/customers', { data: 'content' })
      http.request.called.should.be.equal(true);
      result.should.not.be.empty;
      done()
    })
  })
})

