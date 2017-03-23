var mongoUser = require(__dirname + '/../databases/mongo/models/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

hash = function (password) {
  return password;
};

exports.signup = function (req, res) {
  console.log('req.body in signup:', req.body);

  mongoUser.addUser ({username: req.body.username, password: hash(req.body.password)}, 
  	function(err, result) {
  		if (err) {
  			res.redirect('/login.html');
  		} else {
	  		res.redirect('/');
	  	}
  	});

};


exports.authenticate = function (req, res) {
  console.log('In authenticate, req body:', req.body);
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: __dirname + '/../public/login.html',
    // failureFlash: true
  }, function(req, res) {

  });	
};

