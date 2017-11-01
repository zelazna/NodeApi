const Sequelize = require('sequelize')
const redis = require('redis')
const bluebird = require('bluebird')

const environment = process.env.NODE_ENV || 'DEVELOPMENT'

require(`./environments/${environment.toLowerCase()}`)

const ssl = (process.env.DATABASE_SSL === 'true')

const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: process.env.DATABASE_DIALECT,
  protocol: process.env.DATABASE_DIALECT,
  logging: false,
  dialectOptions: {
    ssl: ssl
  },
  operatorsAliases: false
})

const redisClient = redis.createClient({ url: process.env.REDIS_URL }).on('error', err => console.log('Error ' + err))
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

module.exports = {
  database,
  redisClient
}
