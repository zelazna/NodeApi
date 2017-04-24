module.exports = class User {
  constructor ({id = undefined, login, passwordHash, nSalt} = {}) {
    this.id = id
    this.login = login
    this.passwordHash = passwordHash
  }
}
