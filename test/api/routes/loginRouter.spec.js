const chaiHttp = require('chai-http')
const chai = require('chai')
chai.use(chaiHttp)

const db = require('../../../db/collections')
const users = db.users
const app = require('../../../api/app')
const Encryptor = require('../../../db/encryptor')
const User = require('../../../models/user')
const RedisTokenRepository = require('../../../db/redisTokenRepository')

const expect = chai.expect
const encryptor = new Encryptor()
const repository = new RedisTokenRepository()
let token

describe('LoginRouter', () => {
  before(() => {
    return users.sync({ force: true })
  })

  beforeEach(() => {
    token = repository.setToken({ id: 1 })
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
    it('should return a 403 status if no basic auth headers', () => {
      return chai.request(app).get('/login')
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

  describe('GET request on /login/session', () => {
    it('should send back a token', () => {
      return chai.request(app).get('/login/session').set('X-AUTH-TOKEN', token)
      .then(res => {
        expect(res.type).to.eql('application/json')
        expect(Object.keys(JSON.parse(res.text))).to.eql(['token'])
        expect(res.status).to.eql(200)
      })
    })
    it('should send back a token', () => {
      return chai.request(app).get('/login/session').set('X-AUTH-TOKEN', 'token')
      .catch(err => {
        expect(err).to.have.status(403)
      })
    })
  })
})
