const Buffer = require('safe-buffer').Buffer
const bcrypt = require('bcryptjs')

class Encryptor {
  constructor () {
    this.saltRounds = parseInt(process.env.SALT_ROUNDS) || 2
  }

  getCredentials (base64Auth) {
    const credentials = base64Auth.split(' ')[1]
    return new Buffer(credentials, 'base64').toString('utf8').split(':')
  }

  encrypt (password) {
    return bcrypt.hash(password, this.saltRounds)
  }

  compare (password, hash) {
    return bcrypt.compare(password, hash)
  }
}

module.exports = Encryptor
