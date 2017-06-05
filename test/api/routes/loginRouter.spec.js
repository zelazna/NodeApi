const chaiHttp = require('chai-http')
const chai = require('chai')

const db = require('../../../db/collections')
const users = db.users
const app = require('../../../api/app')
const Encryptor = require('../../../db/encryptor')
const User = require('../../../models/user')
chai.use(chaiHttp)
const expect = chai.expect
const encryptor = new Encryptor()

describe('LoginRouter', () => {
  before(() => {
    return users.sync({ force: true })
  })

  beforeEach(() => {
    return encryptor.encrypt('root')
      .then(hash => {
        users.create(
          new User({
            login: 'root',
            passwordHash: hash
          }))
      })
  })

  afterEach(() => {
    return users.truncate()
  })

  after(() => {
    return users.drop()
  })

  describe('GET request on /login', () => {
    it('should send back a token', () => {
      return chai.request(app).get('/login').auth('root', 'root')
        .then(res => {
          expect(res.type).to.eql('application/json')
          expect(Object.keys(JSON.parse(res.text))).to.eql(['token'])
          expect(res.status).to.eql(200)
        })
    })
    it('should return a 403 status', () => {
      return chai.request(app).get('/login').auth('roott', 'root')
        .catch(err => {
          expect(err).to.have.status(403)
        })
    })
    it('should return a 403 status', () => {
      return chai.request(app).get('/login').auth('root', 'roottt')
        .catch(err => {
          expect(err).to.have.status(403)
        })
    })
  })
})
