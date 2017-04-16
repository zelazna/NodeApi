module.exports = (err, req, res, next) => {
  res.status(500)
    .send({
      status: res.status,
      error: err
    })
}
