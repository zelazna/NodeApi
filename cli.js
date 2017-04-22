#!/usr/bin/env node
const crypto = require('crypto')
const colors = require('colors')
const argv = require('minimist')(process.argv.slice(2))

const User = require('./models/user')
const Users = require('./db/collections').Users
const [userName, password] = argv['_']
const save = argv['save']

colors.setTheme({
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
})

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length)   /** return required number of characters */
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = (password, salt) => {
  var hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
  hash.update(password)
  var value = hash.digest('hex')
  return {
    salt: salt,
    passwordHash: value
  }
}

const saltHashPassword = (userpassword) => {
  var salt = genRandomString(16) /** Gives us salt of length 16 */
  return sha512(userpassword, salt)
}

const result = saltHashPassword(password)

const user = new User({
  login: userName,
  passwordHash: result.passwordHash,
  nSalt: result.salt
})

if (save) {
  Users.create(user)
    .then(result => {
      if (!user) throw new Error('boloss')
      Object.keys(user).forEach((index, key) => {
        console.log(`${index.info} : ${result[index].data}`)
      })
      console.log('password has been saved !'.verbose)
      process.exit(0)
    }, err => {
      console.log(err.message.error)
      process.exit(0)
    })
}
