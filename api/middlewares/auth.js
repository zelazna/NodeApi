const RedisTokenRepository = require('../../db/redisTokenRepository')
const repository = new RedisTokenRepository(60 * 60 * 24)

module.exports = (req, res, next) => {
  const token = req.headers['x-auth-token'] || ''
  repository.getToken(token)
    .then(data => {
      if (data) {
        next()
      } else {
        res.status(403).send({ message: 'not authorized' })
      }
    })
    .catch(err => next(err))
}
