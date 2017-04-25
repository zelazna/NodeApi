module.exports = (req, res, next) => {
  console.log('auth')
  console.log(req.headers.authorization)
  next()
}
