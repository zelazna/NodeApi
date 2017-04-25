module.exports = class User {
  constructor ({id = undefined, login, passwordHash} = {}) {
    this.id = id
    this.login = login
    this.passwordHash = passwordHash
  }
}
