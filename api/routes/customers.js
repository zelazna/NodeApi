const express = require('express')
const Sequelize = require('sequelize')

const router = express.Router()
const collections = require('../../db/collections')
const middlewares = require('../middlewares')

const { cors } = middlewares

router.use(cors)

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
  Sequelize.Promise.props({
    customer: collections.CustomerList.findOne({
      where: req.params
    })
  }).then(result => {
    res.send(result.customer.dataValues)
  }, err => {
    next(err)
  })
})

router.post('/customers', (req, res, next) => {
  collections.CustomerList.create(req.body)
    .then(customer => {
      res.send(customer)
    }, err => {
      next(err)
    })
})

router.put('/customers', (req, res, next) => {
  collections.CustomerList.upsert(req.body)
    .then(customer => {
      res.send(customer)
    }, err => {
      next(err)
    })
})

router.delete('/customers', (req, res, next) => {
  collections.CustomerList.findById(req.body.id)
    .then(customer => {
      customer.destroy()
    }, err => {
      next(err)
    })
})

module.exports = router
