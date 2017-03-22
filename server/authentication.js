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


exports.authenticate = function (req, res) {
  console.log('In authenticate, req body:', req.body);
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: __dirname + '/../public/login.html',
    // failureFlash: true
  }, function(req, res) {

  });	
};

passport.serializeUser(function(user, done) {
  console.log('!!!!!!!!!! serialize being called for user:', user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('!!!!!!!!!! de-serialize being called for id:', id);
  mongo.Users.findById(id, function(err, user) {
    done(err, user);
  });
});
