const fs = require('fs')
const parse = require('csv-parse')
const path = require('path')

// FIXME import dont stop the script
const customers = require('../db/collections').customers
const fileName = ''
const inputFile = path.join('..', 'uploads', fileName)
const async = require('async')

const parser = parse({ columns: true, skip_empty_lines: true }, (err, data) => {
  async.eachSeries(data, function (line, callback) {
    customers.create(line).then(() => {
      callback()
    })
  })
})

fs.createReadStream(inputFile).pipe(parser)
