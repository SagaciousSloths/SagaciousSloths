var mongoUser = require(__dirname + '/../databases/mongo/models/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.useLocalPassportStrategy = function () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      mongoUser.findOne({ username: username }, function (err, user) {
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
};

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



// exports = {
//   get: {
//   	signup: displaySignupPage,
//   }
//   post: {
//   	signup: processSignup,
//   }
// };