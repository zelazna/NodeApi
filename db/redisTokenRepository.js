const redis = require('../config/environment').redisClient
const uuidV4 = require('uuid/v4')

class RedisTokenRepository {
  constructor (ttl = 86400) {
    this.redis = redis
    this.ttl = ttl
  }
  getToken (userName) {
    return this.redis.getAsync(userName).then(res => {
      console.log(res)
    })
  }
  setToken (userName) {
    const token = this._generateSessionId()
    return this.redis.setAsync(userName, token, 'EX', this.ttl)
      .then(result => console.log(result))
  }
  _generateSessionId () {
    return uuidV4()
  }
}

module.exports = RedisTokenRepository
