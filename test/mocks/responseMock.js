class ResponseMock {
  constructor () {
    this.calledTimes = 0
    this.calledWith = []
  }
  header () {
    this.calledWith.push(...arguments)
  }
}
module.exports = ResponseMock
