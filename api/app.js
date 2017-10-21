const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const routes = require('./routes')

const { customersRouter, loginRouter, defaultRouter, csvRouter } = routes

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
    this.express.use(helmet(), cors())
  }

  routes () {
    this.express.use('/', defaultRouter)
    this.express.use('/customers', customersRouter)
    this.express.use('/login', loginRouter)
    this.express.use('/csv', csvRouter)
  }
}

module.exports = new App().express
