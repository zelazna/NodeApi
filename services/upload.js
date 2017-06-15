const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.csv')
  },
  fileFilter: (req, file, cb) => {
    if (req.mimetype === 'text/csv') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
})

module.exports = multer({ storage })
