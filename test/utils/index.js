const fs = require('fs')
const path = require('path')

const currentDirectory = path.dirname(__filename)
const resourcesDirectory = path.join(currentDirectory, '..', 'resources')
const rootDirectory = path.join(currentDirectory, '../../')

const resourcePath = filePath => {
  return path.join(resourcesDirectory, filePath)
}

const loadJsonResource = filePath => {
  const file = resourcePath(filePath)
  const data = fs.readFileSync(file, 'utf8')
  return JSON.parse(data)
}


module.exports = {
  loadJsonResource,
  rootDirectory
}
