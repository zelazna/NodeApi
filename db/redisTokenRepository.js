const redis = require('../config/environment').redisClient
const uuidV4 = require('uuid/v4')

class RedisTokenRepository {
  constructor (ttl = 86400) {
    this.redis = redis
    this.ttl = ttl
  }
  getToken (token) {
    return this.redis.getAsync(token)
  }
  setToken (user) {
    const token = this._generateSessionId()
    this.redis.set(token, user.id, 'EX', this.ttl)
    return token
  }
  _generateSessionId () {
    return uuidV4()
  }
  deleteToken (token) {
    return this.redis.delAsync(token)
  }
}

module.exports = RedisTokenRepository
