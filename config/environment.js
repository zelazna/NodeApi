const Sequelize = require('sequelize')

const environment = process.env.NODE_ENV || 'DEVELOPMENT'

require(`./environments/${environment.toLowerCase()}`)

const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT,
    logging: false,
    port: process.env.DB_PORT
  }
)

module.exports.database = database

