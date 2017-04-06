const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const routes = require('./routes')

const expressApp = express()

expressApp.use(logger('dev'))
expressApp.use(bodyParser.json())
expressApp.use(bodyParser.urlencoded({ extended: false }))
expressApp.use('/', routes)

module.exports = expressApp
