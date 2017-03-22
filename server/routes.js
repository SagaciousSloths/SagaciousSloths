var express = require('express');
var router = require('express').Router();
var authentication = require('./authentication');
var passport = require('passport');

var handlers = require('./request-handlers');
var googleSheet = require(__dirname + '/../databases/google/google-sheet');

// TODO: implement a clean login page at /login
// router.get('/login', express.static(__dirname + '/../public/login.html'));

router.get('/', require('connect-ensure-login').ensureLoggedIn(),
  express.static(__dirname + '/../client_react/'));

router.post('/signup', authentication.signup);

router.post('/login',
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login.html',
    // failureFlash: true
  }), function(req, res) {
    res.redirect('/');
  });

router.get('/dashboard', handlers.dashboard.get);

router.get('/quiz', handlers.quiz.get);

router.get('/logout',
  function(req, res) {
    req.logout();
    res.redirect('/login.html');
  });


router.post('/api/card', handlers.api.card);

router.get('/api/reset', handlers.api.reset);

module.exports = router;
