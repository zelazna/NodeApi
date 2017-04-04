const fs = require('fs');
const path = require('path');

const currentDirectory = path.dirname(__filename);
const resourcesDirectory = path.join(currentDirectory, '..', 'resources');

function resourcePath(filePath) {
  return path.join(resourcesDirectory, filePath);
}

function loadJsonResource(filePath) {
  const file = resourcePath(filePath);
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}

module.exports = loadJsonResource;

