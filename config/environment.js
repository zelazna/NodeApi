const Sequelize = require('sequelize')
const redis = require('redis')
const bluebird = require('bluebird')

const environment = process.env.NODE_ENV || 'DEVELOPMENT'

require(`./environments/${environment.toLowerCase()}`)

const match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
const database = new Sequelize(match[5], match[1], match[2], {
  dialect: 'postgres',
  protocol: 'postgres',
  port: match[4],
  host: match[3],
  logging: false,
  dialectOptions: {
    ssl: true
  }
})

const redisClient = redis.createClient({ url: process.env.REDIS_URL }).on('error', err => console.log('Error ' + err))
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

module.exports = {
  database,
  redisClient
}
