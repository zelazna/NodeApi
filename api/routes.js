const express = require('express');
const Sequelize = require('sequelize');

const router = express.Router();
const collections = require('../db/collections');

router.post('/', (req, res, next) => {
  const options = {
    order: [['createdAt', 'DESC']],
  };
  Sequelize.Promise.all([
    collections.CustomerList.findAll(options),
  ]).then(results => {
    res.send(results[0]);
  }, err => {
    next(err);
  });
});

router.patch('/', (req, res, next) => {
  collections.CustomerList.upsert(req.body)
    .then(() => {
      res.send('ok');
    }, err => {
      next(err);
    });
});

router.delete('/', (req, res, next) => {
  collections.CustomerList.findById(req.body.id)
    .then(customer => {
      customer.destroy();
      res.send('ok');
    }, err => {
      next(err);
    })
});

module.exports = router;
