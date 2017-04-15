const chaiHttp = require('chai-http')
const chai = require('chai')

const app = require('../../../api/app')
const Sequelize = require('../../../db/collections')
const CustomersList = Sequelize.CustomerList

chai.use(chaiHttp)
const expect = chai.expect

describe('CustomersRouter', () => {
  before(() => {
    CustomersList.sync()
    const testObject = {
      'firstName': 'paginate',
      'id': 1,
      'lastName': 'yolo0à0à00sss',
      'mail': 'constantin.ddguidon@gmail.com',
      'nationalite': 'de',
      'status': 'DONE'
    }
    CustomersList.create(testObject)
  })

  after(() => {
    CustomersList.truncate()
  })

  describe('GET /customers', () => {
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

  describe('GET /customers/:id', () => {
    it('should a customer object', () => {
      return chai.request(app).get('/customers/1')
        .then(res => {
          const customer = JSON.parse(res.text).customer
          expect(customer).to.be.an('object')
          expect(customer.firstName).to.eql('paginate')
        })
    })
  })

  describe('POST /customers', () => {
    it('should create a new customer', () => {
      const obj = {
        'firstName': 'constantin',
        'lastName': 'guidon',
        'mail': 'constantin.guidon@gmail.com',
        'nationalite': 'fr',
        'status': 'DONE'
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
    it('should have 2 customers in the database', () => {
      CustomersList
        .findAndCountAll()
        .then(result => {
          expect(result.count).to.eql(2)
        })
    })
  })

  describe('PUT /customers/:id', () => {
    it('should send a 200 status', () => {
      const obj = {
        'firstName': 'constantinUpdate',
        'lastName': 'guidon',
        'mail': 'constantin.guidon@gmail.com',
        'nationalite': 'fr',
        'status': 'DONE'
      }
      return chai.request(app)
        .put('/customers/1')
        .send(obj)
        .then(res => {
          expect(res.status).to.be.eql(200)
        })
    })
    it('should update the object', () => {
      CustomersList.findById(1).then(customer => {
        expect(customer.dataValues.firstName).to.be.eql('constantinUpdate')
      })
    })
  })

  describe('DELETE /customers/:id', () => {
    it('should send a 200 status', () => {
      return chai.request(app)
        .delete('/customers/1')
        .then(res => {
          expect(res.status).to.be.eql(200)
        })
    })
    it('should have deleted the object', () => {
      CustomersList.findById(1).then(customer => {
        expect(customer).to.be.null
      })
    })
  })
})
