const fs = require('fs')
const path = require('path')

// load environment variables.
const database = require('../../config/environment').database

const basename = path.basename(module.filename)
const db = {}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const collection = database.import(path.join(__dirname, file))
    db[collection.name] = collection
  })

Object.keys(db).forEach(collectionName => {
  if (db[collectionName].associate) {
    db[collectionName].associate(db)
  }
})

db.sequelize = database

module.exports = db
