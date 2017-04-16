const chaiHttp = require('chai-http')
const chai = require('chai')

const app = require('../../../api/app')
const db = require('../../../db/collections')
const CustomerList = db.CustomerList

chai.use(chaiHttp)
const expect = chai.expect

describe('CustomersRouter', () => {
  before(() => {
    return CustomerList.sync({ force: true })
  })

  beforeEach(() => {
    const testObject = {
      firstName: 'firstname',
      id: 1,
      lastName: 'lastname',
      mail: 'uu.dd@gmail.com',
      nationalite: 'de',
      status: 'DONE'
    }
    return CustomerList.create(testObject)
  })

  afterEach(() => {
    return CustomerList.truncate()
  })

  after(() => {
    return CustomerList.drop()
  })

  describe('GET request on /customers', () => {
    it('should be json', () => {
      return chai.request(app).get('/customers')
        .then(res => {
          expect(res.type).to.eql('application/json')
        })
    })
    it('should return a 200 status', () => {
      return chai.request(app).get('/customers')
        .then(res => {
          expect(res.status).to.eql(200)
        })
    })
  })

  describe('GET request on /customers/:id', () => {
    it('should be a customer object', () => {
      return chai.request(app).get('/customers/1')
        .then(res => {
          const customer = JSON.parse(res.text).customer
          expect(customer).to.be.an('object')
          expect(customer.firstName).to.eql('firstname')
        })
    })
    it('should return a 404 code', () => {
      return chai.request(app).get('/customers/2').catch(err => {
        expect(err.status).to.eql(404)
        expect(err.message).to.eql('Not Found')
      })
    })
  })

  describe('POST request on /customers', () => {
    it('should create a new customer', () => {
      const obj = {
        firstName: 'constantin',
        lastName: 'guidon',
        mail: 'constantin.guidon@gmail.com',
        nationalite: 'fr',
        status: 'DONE',
        id: 5
      }
      return chai.request(app)
        .post('/customers')
        .send(obj)
        .then(res => {
          const customer = JSON.parse(res.text).customer
          expect(customer).to.be.an('object')
          expect(customer.firstName).to.eql('constantin')
        })
    })
  })

  describe('PUT request on /customers/:id', () => {
    const obj = {
      firstName: 'constantinUpdate',
      lastName: 'guidon',
      mail: 'constantin.guidon@gmail.com',
      nationalite: 'fr',
      status: 'DONE'
    }
    it('should send a 200 status', () => {
      return chai.request(app)
        .put('/customers/1')
        .send(obj)
        .then(res => {
          expect(res.status).to.be.eql(200)
          CustomerList.findById(1).then(customer => {
            expect(customer.dataValues.firstName).to.be.eql('constantinUpdate')
          })
        })
    })
    it('should return a 404 code', () => {
      return chai.request(app).put('/customers/2')
        .send(obj)
        .catch(err => {
          expect(err.status).to.eql(404)
          expect(err.message).to.eql('Not Found')
        })
    })
  })

  describe('DELETE request on /customers/:id', () => {
    it('should send a 200 status', () => {
      return chai.request(app)
        .delete('/customers/1')
        .then(res => {
          expect(res.status).to.be.eql(200)
          CustomerList.findById(1).then(customer => {
            expect(customer).to.be.null
          })
        })
    })
    it('should return a 404 code', () => {
      return chai.request(app).delete('/customers/2')
        .catch(err => {
          expect(err.status).to.eql(404)
          expect(err.message).to.eql('Not Found')
        })
    })
  })
})
