const Client = require('../../db/redisTokenRepository')
const expect = require('chai').expect
const User = require('../../models/user')
let repository, user

describe('Redis token repository', () => {
  beforeEach(() => {
    repository = new Client(150)
    user = new User({
      id: 123,
      login: 'toto',
      passwordHash: 'kjhFGH445',
      nSalt: 'khjhk56'
    })
    return repository.redis.flushall()
  })
  describe('constructor', () => {
    it('should be instanciated with the proper values', () => {
      expect(repository.ttl).to.eql(150)
      expect(repository.redis).to.be.an('object')
    })
  })
  describe('set a token', () => {
    it('should set a token with a user', () => {
      const result = repository.setToken(user)
      expect(result).to.be.a('string')
    })
  })
  describe('get a token', () => {
    it('should get a token with a user', () => {
      const uuid = repository.setToken(user)
      repository.getToken(uuid).then(
        data => expect(data).to.eql('123')
      )
    })
  })
  describe('delete a token', () => {
    it('should delete a token with a user', () => {
      const uuid = repository.setToken(user)
      repository.deleteToken(uuid).then(
        data => expect(data).to.eql(1)
      )
    })
  })
})
