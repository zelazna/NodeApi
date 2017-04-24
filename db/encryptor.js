const crypto = require('crypto')
var Buffer = require('safe-buffer').Buffer

class Encryptor {
  constructor () {
    this.key = process.env.DATABASE_ENCRYPTION_KEY
    this.algorithm = 'aes-256-ctr'
  }

  getCredentials (base64Auth) {
    const credentials = base64Auth.split(' ')[1]
    return new Buffer(credentials, 'base64').toString('utf8').split(':')
  }

  encrypt (text) {
    var cipher = crypto.createCipher(this.algorithm, this.key)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
  }

  decrypt (text) {
    var decipher = crypto.createDecipher(this.algorithm, this.key)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return dec
  }
}

module.exports = Encryptor
