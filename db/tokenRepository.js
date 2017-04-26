const redis = require('../config/environment').redisClient

class TokenRepository {
  constructor (ttl) {
    this.redis = redis
    this.ttl = ttl
  }

  getToken (token) {
    return this.redis.getAsync(token)
  }

  setToken (token, value) {
    // @TODO FIX TTL
    this.redis.set(token, value)
  }

  deleteToken (token) {
    return this.redis.delAsync(token)
  }
}

module.exports = TokenRepository
