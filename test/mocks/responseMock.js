class ResponseMock {
  constructor () {
    this.calledWith = []
    this.sendedResponse = {}
  }
  header () {
    this.calledWith.push(...arguments)
  }
  send (obj) {
    this.sendedResponse = obj
  }
  status (code) {
    this.status = code
    return this
  }
}
module.exports = ResponseMock
