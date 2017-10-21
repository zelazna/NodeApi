const chaiHttp = require('chai-http')
const chai = require('chai')
const fs = require('fs')

const app = require('../../../api/app')
const db = require('../../../db/collections')
const RedisTokenRepository = require('../../../db/redisTokenRepository')
const utils = require('../../utils')

const repository = new RedisTokenRepository()
const customers = db.customers

chai.use(chaiHttp)
const expect = chai.expect
let token

describe('CsvRouter', () => {
  before(() => {
    return customers.sync({ force: true })
  })

  beforeEach(() => {
    token = repository.setToken({ id: 1 })
  })

  after(() => {
    utils.cleanFolder('./uploads')
    return customers.drop()
  })

  describe('POST request on /csv', () => {
    it('should upload one customer', () => {
      return chai.request(app)
        .post('/csv')
        .set('X-AUTH-TOKEN', token)
        .attach('csv', fs.readFileSync('test/resources/table.csv'), 'test.csv')
        .then(res => {
          expect(res.type).to.eql('application/json')
          expect(res.status).to.eql(200)
        })
    })
    it('should return a 500 status', () => {
      return chai.request(app).get('/customers').set('X-AUTH-TOKEN', token).attach('csv', fs.readFileSync('test/resources/file.txt'), 'test.csv')
        .catch(res => {
          expect(res.type).to.eql('application/json')
          expect(res.status).to.eql(500)
        })
    })
  })
})
