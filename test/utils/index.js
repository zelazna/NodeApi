const fs = require('fs')
const path = require('path')

const currentDirectory = path.dirname(__filename)
const resourcesDirectory = path.join(currentDirectory, '..', 'resources')
const rootDirectory = path.join(currentDirectory, '../../')

const resourcePath = filePath => {
  return path.join(resourcesDirectory, filePath)
}

const loadJsonResource = filePath => {
  const data = fs.readFileSync(resourcePath(filePath), 'utf8')
  return JSON.parse(data)
}

const loadFile = filePath => {
  return fs.readFileSync(resourcePath(filePath), 'utf8')
}

const cleanFolder = folderPath => {
  fs.readdir(folderPath, (err, files) => {
    if (err) console.log(err)
    files.forEach(file => {
      fs.unlink(`${folderPath}/${file}`, err => {
        if (err) { console.log(err) }
      })
    })
  })
}

module.exports = {
  loadJsonResource,
  rootDirectory,
  loadFile,
  cleanFolder
}
