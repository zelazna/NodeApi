const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const customersRoutes = require('./routes/customers')

class App {
  constructor () {
    this.express = express()
    this.middleware()
    this.routes()
  }

  middleware () {
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  routes () {
    this.express.use('/', customersRoutes)
  }
}

module.exports = new App().express
