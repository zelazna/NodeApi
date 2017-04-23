const Sequelize = require('sequelize')
const redis = require('redis')
const bluebird = require('bluebird')

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

const redisClient = redis.createClient({url: process.env.REDIS_URL}).on('error', err => console.log('Error ' + err))
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

module.exports = {
  database,
  redisClient
}
