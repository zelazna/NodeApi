const express = require('express')
const Sequelize = require('sequelize')

const CustomersList = require('../../db/collections').CustomerList

class CustomersRouter {
  constructor () {
    this.router = express.Router()
    this.init()
  }

  getAll (req, res, next) {
    let options = {
      order: [['createdAt', 'DESC']],
      limit: req.query.limit || process.env.QUERY_LIMIT
    }
    Sequelize.Promise.all([
      CustomersList.findAll(options)
    ]).then(results => {
      const customers = results[0]
      res.status(200)
        .send({
          customers,
          status: res.status
        })
    }, err => {
      next(err)
    })
  }

  getOne (req, res, next) {
    Sequelize.Promise.props({
      customer: CustomersList.findById(req.params.id)
    })
      .then(result => {
        if (result.customer) {
          const customer = result.customer.dataValues
          res.status(200)
            .send({
              customer,
              status: res.status
            })
        } else {
          res.status(404)
            .send({
              message: 'No customer found with the given id.',
              status: res.status
            })
        }
      })
  }

  createOne (req, res, next) {
    CustomersList.create(req.body)
      .then(customer => {
        res.status(201)
          .send({
            customer,
            status: res.status
          })
      }, err => {
        next(err)
      })
  }

  updateOne (req, res, next) {
    let options = {
      where: { id: req.params.id }
    }
    CustomersList.update(req.body, options)
      .then(result => {
        res.sendStatus(200)
      }, err => {
        next(err)
      })
  }

  deleteOne (req, res, next) {
    CustomersList.findById(req.params.id)
      .then(customer => {
        if (customer) {
          customer.destroy()
          res.sendStatus(200)
        } else {
          res.status(404)
            .send({
              message: 'No customer found with the given id.',
              status: res.status
            })
        }
      })
  }

  init () {
    this.router.get('/', this.getAll)
    this.router.get('/:id', this.getOne)
    this.router.post('/', this.createOne)
    this.router.put('/:id', this.updateOne)
    this.router.delete('/:id', this.deleteOne)
  }
}

const customersRoutes = new CustomersRouter()
customersRoutes.init()

module.exports = customersRoutes.router
