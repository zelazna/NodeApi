module.exports = class User {
  constructor ({login, passwordHash, nSalt}) {
    this.login = login
    this.passwordHash = passwordHash
    this.nSalt = nSalt
  }
}
