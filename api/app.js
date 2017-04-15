const express = require('express')
// const logger = require('morgan')
const bodyParser = require('body-parser')

const customersRouter = require('./routes/customersRouter')
const middlewares = require('./middlewares')

const { cors } = middlewares

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
    this.express.use(cors)
  }

  routes () {
    this.express.use('/customers', customersRouter)
  }
}

module.exports = new App().express
