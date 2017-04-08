const express = require('express')
const Sequelize = require('sequelize')

const router = express.Router()
const collections = require('../db/collections')

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('/customers', (req, res, next) => {
  const options = {
    order: [['createdAt', 'DESC']],
    limit: req.query.limit || process.env.QUERY_LIMIT
  }
  Sequelize.Promise.all([
    collections.CustomerList.findAll(options)
  ]).then(results => {
    res.send(results[0])
  }, err => {
    next(err)
  })
})

router.get('/customers/:id', (req, res, next) => {
  const options = {
    order: [['createdAt', 'DESC']],
    limit: req.query.limit || process.env.QUERY_LIMIT
  }
  options.where = req.params
  Sequelize.Promise.all([
    collections.CustomerList.findAll(options)
  ]).then(results => {
    res.send(results[0])
  }, err => {
    next(err)
  })
})

router.post('/customers', (req, res, next) => {
  collections.CustomerList.create(req.body)
    .then(() => {
      res.send('ok')
    }, err => {
      next(err)
    })
})

router.put('/customers', (req, res, next) => {
  collections.CustomerList.upsert(req.body)
    .then(() => {
      res.send('ok')
    }, err => {
      next(err)
    })
})

router.delete('/customers', (req, res, next) => {
  collections.CustomerList.findById(req.body.id)
    .then(customer => {
      customer.destroy()
      res.send('ok')
    }, err => {
      next(err)
    })
})

module.exports = router
