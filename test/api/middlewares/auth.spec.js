const expect = require('chai').expect

const auth = require('../../../api/middlewares/auth')
const RedisTokenRepository = require('../../../db/redisTokenRepository')
const repository = new RedisTokenRepository()

describe('auth middleware', () => {
  beforeEach(() => {
    return repository.redis.flushall()
  })
  describe('request handler creation', () => {
    it('should return a function()', () => {
      expect(auth).to.be.a('function')
    })

    it('should accept 3 arguments', () => {
      expect(auth.length).to.equal(3)
    })
  })

  describe('request handler calling', () => {
    it('should call next() on successful auth', (done) => {
      const nextSpy = () => done()
      const token = repository.setToken({ id: 1 })
      const req = { headers: { 'X-AUTH-TOKEN': token } }
      auth(req, {}, nextSpy)
    })
  })
})
