const express = require('express')

const Users = require('../../db/collections').Users
const User = require('../../models/user')
const Encryptor = require('../../db/encryptor')

class LoginRouter {
  constructor () {
    this.router = express.Router()
    this.init()
  }

  loginUser (req, res, next) {
    // @TODO FIND A WAY TO REFRACTOR
    const encryptor = new Encryptor()
    const [login, password] = encryptor.getCredentials(req.headers.authorization)
    Users.findOne({
      where: { login: login }
    })
      .then(data => {
        const user = new User(data)
        console.log(user)
      })
      .catch(() => res.status(404).send({ message: 'User Not Found' }))
  }

  init () {
    this.router.get('/', this.loginUser)
  }
}

const LoginRoutes = new LoginRouter()
LoginRoutes.init()

module.exports = LoginRoutes.router
