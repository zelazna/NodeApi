var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(function(err, req, res, next) {
  console.log('test');
  res.status(500).send("custom error handler called");
});

app.use(function(req, res, next) {
  console.log('test');
  res.status(404).send("custom not found handler called");
});

var server = app.listen(3000, function () {
  console.log('Example app started');
});
