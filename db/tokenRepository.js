const redis = require('../config/environment').redisClient

class TokenRepository {
  constructor(ttl) {
    this.redis = redis
    this.ttl = ttl || 86400
  }

  getToken(token) {
    return this.redis.getAsync(token)
  }

  setToken(token, value) {
    this.redis.set(token, value, 'EX', this.ttl)
  }

  deleteToken(token) {
    return this.redis.delAsync(token)
  }
}

module.exports = TokenRepository
