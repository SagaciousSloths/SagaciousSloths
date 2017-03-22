var passport = require('passport');

exports.authenticate = function (req, res) {
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  });	
};
