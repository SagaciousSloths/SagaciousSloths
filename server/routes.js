var router = require('express').Router();
var authentication = require('./authentication');
var handlers = require('./request-handlers');
var googleSheet = require(__dirname + '/../databases/google/google-sheet');

router.post('/login', authentication.authenticate);

router.get('/dashboard', handlers.dashboard.get);

router.get('/quiz', handlers.quiz.get);

router.post('/api/card', handlers.api.card);

router.get('/api/reset', handlers.api.reset);

module.exports = router;
