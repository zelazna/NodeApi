const expect = require('chai').expect
const sinon = require('sinon')

const errorhandler = require('../../../api/middlewares/errorhandler')
const RequestMock = require('../../mocks/responseMock')

describe('errorhandler middleware', () => {
  describe('request handler creation', () => {
    it('should return a function()', () => {
      expect(errorhandler).to.be.a.Function
    })

    it('should accept four arguments', () => {
      expect(errorhandler.length).to.equal(4)
    })
  })

  describe('request handler calling', () => {
    it('should have the correct values', () => {
      const res = new RequestMock()
      const error = { status: 500, error: new Error('internal server error') }
      errorhandler(error, {}, res, {})
      expect(res.sendedResponse.error).to.equal(error)
      expect(res.sendedResponse.status).to.equal(500)
    })
    it('should call next if headers are already sent', () => {
      const nextSpy = sinon.spy()
      const res = new RequestMock()
      res.headersSent = true
      errorhandler({}, {}, res, nextSpy)
      expect(nextSpy.calledOnce).to.be.true
    })
  })
})
