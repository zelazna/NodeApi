const expect = require('chai').expect
const sinon = require('sinon')

const cors = require('../../../api/middlewares/cors')
const RequestMock = require('../../mocks/responseMock')

describe('cors middleware', () => {
  describe('request handler creation', () => {
    it('should return a function()', () => {
      expect(cors).to.be.a.Function
    })

    it('should accept three arguments', () => {
      expect(cors.length).to.equal(3)
    })
  })

  describe('request handler calling', () => {
    it('should call next() once', () => {
      const nextSpy = sinon.spy()
      const res = new RequestMock()
      cors({}, res, nextSpy)
      expect(res.calledWith.length).to.equal(4)
      expect(nextSpy.calledOnce).to.be.true
    })
  })
})
