const express = require('express')
const fs = require('fs')
const parse = require('csv-parse')
const async = require('async')
var multer = require('multer')

const customers = require('../../db/collections').customers
const auth = require('../middlewares').auth

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.csv')
  },
  fileFilter: (req, file, cb) => {
    if (req.mimetype === 'text/csv') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
})

const upload = multer({ storage })

class CsvRouter {
  constructor () {
    this.router = express.Router()
    this.middleware()
    this.init()
  }

  middleware () {
    this.router.use(auth)
  }

  uploadCsv (req, res) {
    let file = req.file.path
    const parser = parse({ columns: true, skip_empty_lines: true }, (err, data) => {
      if (err) {
        console.log(err)
        return res.status(500).send('something goes wrong')
      }
      async.eachSeries(data, (line, callback) => {
        customers.create(line).then(() => {
          callback()
        })
      })
      res.send({'message': `upload succeded, ${data.length} customers imported`})
    })

    fs.createReadStream(file).pipe(parser)
  }

  init () {
    this.router.post('/', upload.single('csv'), this.uploadCsv)
  }
}

const customersRoutes = new CsvRouter()
customersRoutes.init()

module.exports = customersRoutes.router
