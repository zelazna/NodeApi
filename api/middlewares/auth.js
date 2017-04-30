const RedisTokenRepository = require('../../db/redisTokenRepository')
const repository = new RedisTokenRepository()

module.exports = (req, res, next) => {
  const token = req.headers['x-auth-token'] || ''
  repository.getToken(token)
    .then(data => {
      if (data) {
        next()
      } else {
        res.status(403).send({ message: 'not logged in' })
      }
    })
    .catch(err => next(err))
}
