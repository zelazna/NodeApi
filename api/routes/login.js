const express = require('express')

// const CustomersList = require('../../db/collections').CustomerList

class LoginRouter {
  constructor () {
    this.router = express.Router()
    this.init()
  }

  loginUser (req, res, next) {
    res.send({message: 'login'})
  }

  init () {
    this.router.get('/', this.loginUser)
  }
}

const LoginRoutes = new LoginRouter()
LoginRoutes.init()

module.exports = LoginRoutes.router
