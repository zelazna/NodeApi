var Buffer = require('safe-buffer').Buffer
const crypto = require('crypto')

const algorithm = 'aes-256-ctr'
const password = 'd6F3Efeq'

const getCredentials = (base64Auth) => {
  const credentials = base64Auth.split(' ')[1]
  return new Buffer(credentials, 'base64').toString('utf8').split(':')
}
const encrypt = text => {
  var cipher = crypto.createCipher(algorithm, password)
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

const decrypt = text => {
  var decipher = crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

module.exports = {
  getCredentials,
  encrypt,
  decrypt
}
