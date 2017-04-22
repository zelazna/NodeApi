const User = require('../../models/user')
const expect = require('chai').expect

describe('User', () => {
  it('should have the correct values', () => {
    const testUser = new User({
      login: 'toto',
      passwordHash: 'fjsklffs65FU',
      nSalt: 'GUKJihz789'
    })
    expect(testUser.login).to.eql('toto')
    expect(testUser.passwordHash).to.eql('fjsklffs65FU')
    expect(testUser.nSalt).to.eql('GUKJihz789')
  })
})
