const path = require('path')

const currentDirectory = path.dirname(__filename)
const rootDirectory = path.join(currentDirectory, '../../')

require('dotenv').config({ path: `${rootDirectory}.env` })
