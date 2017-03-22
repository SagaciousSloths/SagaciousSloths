var express = require('express');
var cookieParser = require('cookie-parser');
var parser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var authentication = require('./authentication');


var router = require('./routes.js');

var app = express();
module.exports.app = app;

app.set('port', process.env.PORT || 3000);

app.use(cookieParser());
app.use(session({ 
  secret: 'DavidJeffJGKay',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../public/'));

authentication.useLocalPassportStrategy();


app.use('/', router);

app.use(express.static(__dirname + '/../client_react/'));

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
