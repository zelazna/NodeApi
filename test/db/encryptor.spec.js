const Encryptor = require('../../db/encryptor')
var Buffer = require('safe-buffer').Buffer
const expect = require('chai').expect
let encryptor

describe('Encryptor class', () => {
  beforeEach(() => {
    encryptor = new Encryptor()
  })
  describe('Constructor', () => {
    it('should contain the correct values', () => {
      expect(encryptor.saltRounds).to.eql(parseInt(process.env.SALT_ROUNDS))
    })
  })
  describe('getCredentials', () => {
    it('should get the correct values', () => {
      const credentials = 'Basic ' + new Buffer('root:root').toString('base64')
      const result = encryptor.getCredentials(credentials)
      expect(result).to.eql(['root', 'root'])
    })
  })
  describe('encrypt', () => {
    it('should return a hash', () => {
      encryptor.encrypt('toto').then(data => {
        expect(data).to.be.a('string')
      })
    })
  })
  describe('decrypt', () => {
    it('should get the correct value after decrypted', () => {
      encryptor.encrypt('toto').then(data => {
        encryptor.decrypt(data).then(data => {
          expect(data).to.be.eql('toto')
        })
      })
    })
  })
})
