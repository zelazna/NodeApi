#!/usr/bin/env node
const colors = require('colors')
const argv = require('minimist')(process.argv.slice(2))

const User = require('./models/user')
const Users = require('./db/collections').Users
const Encryptor = require('./db/encryptor')

const encryptor = new Encryptor()
const [userName, password] = argv['_']
const save = argv['save']

colors.setTheme({
  verbose: 'cyan',
  info: 'green',
  data: 'grey',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
})

if (save) {
  encryptor.encrypt(password)
    .then(hash => {
      const user = new User({
        login: userName,
        passwordHash: hash
      })
      Users.create(user)
        .then(result => {
          Object.keys(user).forEach((index, key) => {
            console.log(`${index.info} : ${result[index].data}`)
          })
          console.log('password has been saved !'.verbose)
          process.exit(0)
        }, err => {
          console.log(err.message.error)
          process.exit(0)
        })
    })
}
