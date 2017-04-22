const express = require('express')

class DefaultRouter {
  constructor () {
    this.router = express.Router()
    this.init()
  }

  Index (req, res, next) {
    res.send({message: 'Welcome'})
  }

  init () {
    this.router.get('/', this.Index)
  }
}

const DefaultRoutes = new DefaultRouter()
DefaultRoutes.init()

module.exports = DefaultRoutes.router
