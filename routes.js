'use strict';

var express = require('express');
var router = express.Router();
var models = require('./models');
var Sequelize = require('sequelize');

router.get('/', function (req, res, next) {
    var options = {
        order: [['createdAt', 'DESC']]
    };
    Sequelize.Promise.all([
        models.CustomerList.findAll(options),
        models.Spreadsheet.findAll(options)
    ]).then(function (results) {
        res.render('index', {
            orders: results[0],
            spreadsheets: results[1]
        });
    }, function (err) {
        next(err);
    });
});

router.get('/create', function (req, res, next) {
    res.render('upsert');
});

router.get('/edit/:id', function (req, res, next) {
    models.CustomerList.findById(req.params.id).then(function (order) {
        if (order) {
            res.render('upsert', {
                order: order
            });
        } else {
            next(new Error('CustomerList not found: ' + req.params.id));
        }
    });
});

router.get('/delete/:id', function (req, res, next) {
    models.CustomerList.findById(req.params.id)
        .then(function (order) {
            if (!order) {
                throw new Error('Order not found: ' + req.params.id);
            }
            return order.destroy();
        })
        .then(function () {
            res.redirect('/');
        }, function (err) {
            next(err);
        });
});

router.post('/upsert', function (req, res, next) {
    models.CustomerList.upsert(req.body).then(function () {
        res.redirect('/');
    }, function (err) {
        next(err);
    });
});

// Route for creating spreadsheet.

var SheetsHelper = require('./sheets');
var MailchimpHelper = require('./mailchimp');

router.post('/spreadsheets', function (req, res, next) {
    var auth = req.get('Authorization');
    if (!auth) {
        return next(Error('Authorization required.'));
    }
    var accessToken = auth.split(' ')[1];
    var helper = new SheetsHelper(accessToken);
    var title = 'CustomerList (' + new Date().getFullYear() + ')';
    helper.createSpreadsheet(title, function (err, spreadsheet) {
        if (err) {
            return next(err);
        }
        var model = {
            id: spreadsheet.spreadsheetId,
            sheetId: spreadsheet.sheets[0].properties.sheetId,
            name: spreadsheet.properties.title
        };
        models.Spreadsheet.create(model).then(function () {
            return res.json(model);
        });
    });
});

// Route for syncing spreadsheet.

router.post('/spreadsheets/:id/sync', function (req, res, next) {
    var auth = req.get('Authorization');
    if (!auth) {
        return next(Error('Authorization required.'));
    }
    var accessToken = auth.split(' ')[1];
    var helper = new SheetsHelper(accessToken);
    Sequelize.Promise.all([
        models.Spreadsheet.findById(req.params.id),
        models.CustomerList.findAll()
    ]).then(function (results) {
        var spreadsheet = results[0];
        var orders = results[1];
        for (var i = 0; i < orders.length; i++) {
            var data = orders[i].dataValues;
            // update mailchimp list
            if (data.status == 'PENDING') {
                MailchimpHelper(data.firstName, data.lastName, data.nationalite, data.mail);
                data.status = 'DONE';
                models.CustomerList.upsert(data)
            }
        }
        helper.sync(spreadsheet.id, spreadsheet.sheetId, orders, function (err) {
            if (err) {
                return next(err);
            }
            return res.json(orders.length);
        });
    });
});

//@todo make it work
// Route for deleting spreadsheet.

router.post('/spreadsheets/:id/delete', function (req, res, next) {
    var auth = req.get('Authorization');
    if (!auth) {
        return next(Error('Authorization required.'));
    }
    var accessToken = auth.split(' ')[1];
    var helper = new SheetsHelper(accessToken);
    Sequelize.Promise.all([
        models.Spreadsheet.findById(req.params.id),
    ]).then(function (results) {
        var spreadsheet = results[0];
        helper.delete(spreadsheet.id, spreadsheet.sheetId, function (err) {
            if (err) {
                return next(err);
            }
        });
    });
});

module.exports = router;
