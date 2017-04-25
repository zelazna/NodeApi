const express = require('express')

const Users = require('../../db/collections').Users
const User = require('../../models/user')
const Encryptor = require('../../db/encryptor')
const RedisTokenRepository = require('../../db/redisTokenRepository')

class LoginRouter {
  constructor () {
    this.router = express.Router()
    this.init()
  }

  loginUser (req, res, next) {
    // @TODO FIND A WAY TO REFRACTOR
    const encryptor = new Encryptor()
    const redis = new RedisTokenRepository()
    const [login, password] = encryptor.getCredentials(req.headers.authorization)
    Users.findOne({ where: { login } })
      .then(data => {
        const user = new User(data)
        encryptor.compare(password, user.passwordHash)
          .then(result => result ? res.send({ token: redis.setToken(user) }) : res.send({ error: 'Wrong Credentials' }))
      })
      .catch(() => res.status(404).send({ message: 'User not found' }))
  }

  init () {
    this.router.get('/', this.loginUser)
  }
}

const LoginRoutes = new LoginRouter()
LoginRoutes.init()

module.exports = LoginRoutes.router
