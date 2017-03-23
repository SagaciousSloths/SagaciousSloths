var express = require('express');
var cookieParser = require('cookie-parser');
var parser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var authentication = require('./authentication');
var LocalStrategy = require('passport-local').Strategy;
var mongoUsers = require(__dirname + '/../databases/mongo/models/users');



var router = require('./routes.js');

var app = express();
module.exports.app = app;

app.set('port', process.env.PORT || 3000);

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// ----------- Authentication & cookies ---------------
passport.use(new LocalStrategy(
function(username, password, done) {
  mongoUsers.findOne({ username: username }, function (err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}
));	
  
passport.serializeUser(function(user, done) {
  // console.log('!!!!!!!!!! serialize being called for user:', user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // console.log('!!!!!!!!!! de-serialize being called for id:', id);
  mongoUsers.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(cookieParser());

app.use(session({ 
  secret: 'DavidJeffJGKay',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// ---------- Other uses


app.use(express.static(__dirname + '/../public/'));

app.use('/', router);

app.use(express.static(__dirname + '/../client_react/'));

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
