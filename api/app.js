const express = require('express')
// const logger = require('morgan')
const bodyParser = require('body-parser')

const routes = require('./routes')
const middlewares = require('./middlewares')

const { cors, errorhandler } = middlewares
const { customersRouter, loginRouter, defaultRouter } = routes

class App {
  constructor () {
    this.express = express()
    this.middleware()
    this.routes()
  }

  middleware () {
    // this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
    this.express.use(cors, errorhandler)
  }

  routes () {
    this.express.use('/', defaultRouter)
    this.express.use('/customers', customersRouter)
    this.express.use('/login', loginRouter)
  }
}

module.exports = new App().express
