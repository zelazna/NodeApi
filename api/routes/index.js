const customersRouter = require('./customers')
const loginRouter = require('./login')
const defaultRouter = require('./default')
const csvRouter = require('./importcsv')

module.exports = {
  customersRouter,
  loginRouter,
  defaultRouter,
  csvRouter
}
