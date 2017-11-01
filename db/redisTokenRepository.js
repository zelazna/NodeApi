const uuidV4 = require('uuid/v4')
const TokenRepository = require('./tokenRepository')

class RedisTokenRepository extends TokenRepository {
  setToken(user) {
    const token = this._generateSessionId()
    super.setToken(token, user.id)
    return token
  }

  _generateSessionId() {
    return uuidV4()
  }
}

module.exports = RedisTokenRepository
