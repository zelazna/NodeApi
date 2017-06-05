const express = require('express')

const users = require('../../db/collections').users
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
    if (!req.headers.authorization) {
      return res.status(403).send({ message: 'no authorization' })
    }
    const [login, password] = encryptor.getCredentials(req.headers.authorization)
    let user
    users.findOne({ where: { login } })
      .then(data => {
        user = new User(data)
        return encryptor.compare(password, user.passwordHash)
      })
      .then(result => {
        if (result) {
          res.send({ token: redis.setToken(user) })
        } else {
          res.status(403).send({ error: 'Wrong Credentials' })
        }
      })
      .catch(() => res.status(403).send({ message: 'User not found' }))
  }

  init () {
    this.router.get('/', this.loginUser)
  }
}

const LoginRoutes = new LoginRouter()
LoginRoutes.init()

module.exports = LoginRoutes.router
