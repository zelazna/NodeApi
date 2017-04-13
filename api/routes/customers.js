const express = require('express')
const Sequelize = require('sequelize')

const router = express.Router()
const collections = require('../../db/collections')
const middlewares = require('../middlewares')
const CustomersList = collections.CustomerList

const { cors } = middlewares

router.use(cors)

router.get('/customers', (req, res, next) => {
  let options = {
    order: [['createdAt', 'DESC']],
    limit: req.query.limit || process.env.QUERY_LIMIT
  }
  Sequelize.Promise.all([
    CustomersList.findAll(options)
  ]).then(results => {
    res.send(results[0])
  }, err => {
    next(err)
  })
})

router.get('/customers/:id', (req, res, next) => {
  Sequelize.Promise.props({
    customer: CustomersList.findById(req.params.id)
  })
    .then(result => {
      res.send(result.customer.dataValues)
    }, err => {
      next(err)
    })
})

router.post('/customers', (req, res, next) => {
  CustomersList.create(req.body)
    .then(customer => {
      res.send(customer)
    }, err => {
      next(err)
    })
})

router.put('/customers', (req, res, next) => {
  let options = {
    where: { id: req.body.id }
  }
  CustomersList.update(req.body, options)
    .then(result => {
      res.sendStatus(200)
    }, err => {
      next(err)
    })
})

router.delete('/customers', (req, res, next) => {
  CustomersList.findById(req.body.id)
    .then(customer => {
      customer.destroy()
      res.sendStatus(200)
    }, err => {
      next(err)
    })
})

module.exports = router
