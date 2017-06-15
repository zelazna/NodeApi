var path = require('path')

module.exports = {
  httpClient: require(path.resolve(__dirname, './httpClient.js')),
  upload: require(path.resolve(__dirname, './upload.js')),
  mailChimpClient: require(path.resolve(__dirname, './mailChimpClient.js'))
}
