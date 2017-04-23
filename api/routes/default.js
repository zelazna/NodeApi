const express = require('express')

class DefaultRouter {
  constructor () {
    this.router = express.Router()
    this.init()
  }

  index (req, res, next) {
    res.send({message: 'Welcome'})
  }

  init () {
    this.router.get('/', this.index)
  }
}

const DefaultRoutes = new DefaultRouter()
DefaultRoutes.init()

module.exports = DefaultRoutes.router
