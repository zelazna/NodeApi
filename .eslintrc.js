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
    "space-before-function-paren": ["error", "never"]
  }
};
