module.exports = {
  "extends": "standard",
  "plugins": [
    "standard",
    "promise",
    "chai-friendly"
  ],
  "env": {
    "node": true,
    "mocha": true
  },
  "rules": {
    "no-unused-expressions": 0,
    "chai-friendly/no-unused-expressions": 2
  }
};
