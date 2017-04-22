const express = require('express')

class DefaultRouter {
  constructor () {
    this.router = express.Router()
    this.init()
  }

  loginUser (req, res, next) {
    res.send({message: 'Welcome'})
  }

  init () {
    this.router.get('/', this.loginUser)
  }
}

const DefaultRoutes = new DefaultRouter()
DefaultRoutes.init()

module.exports = DefaultRoutes.router
