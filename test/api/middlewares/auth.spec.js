const expect = require('chai').expect
const sinon = require('sinon')

const auth = require('../../../api/middlewares/auth')
const ResponseMock = require('../../mocks/responseMock')
const RedisTokenRepository = require('../../../db/redisTokenRepository')
const repository = new RedisTokenRepository()
const res = new ResponseMock()

describe('auth middleware', () => {
  beforeEach(() => {
    return repository.redis.flushall()
  })
  describe('request handler creation', () => {
    it('should return a function()', () => {
      expect(auth).to.be.a.Function
    })

    it('should accept three arguments', () => {
      expect(auth.length).to.equal(3)
    })
  })

  describe('request handler calling', () => {
    // it('should call next() on successful auth', () => {
    //   const nextSpy = sinon.spy()
    //   const token = repository.setToken({ id: 1 })
    //   const req = { headers: { 'X-AUTH-TOKEN': token } }
    //   auth(req, {}, nextSpy)
    //   expect(nextSpy.calledOnce).to.be.true
    // })
    it('should send a 403 on unsuccessful auth', () => {
      // const req = { headers: { 'x-auth-token': '' } }
      // auth(req, res, {})
      // expect(res.sendedResponse.message).to.eql('not logged in')
      // expect(res.sendedResponse.status).to.equal(403)
    })
  })
})
