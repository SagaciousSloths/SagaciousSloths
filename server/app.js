var express = require('express');
var parser = require('body-parser');
var router = require('./routes.js');

var app = express();
module.exports.app = app;

app.set('port', 3000);
app.use(parser.json());

app.use('/', router);

// app.use(express.static(__dirname + '/../client'));

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

//node request
