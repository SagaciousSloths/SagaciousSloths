var router = require('express').Router();
var authenticate = require('./authentication');
var handlers = require('./request-handlers');
var googleSheet = require(__dirname + '/../databases/google/google-sheet');

router.post('/login', authenticate.authenticate);

router.get('/dashboard', handlers.dashboard.get);

router.get('/quiz', handlers.quiz.get);

router.post('/api/card', handlers.api.card);

router.get('/api/reset', handlers.api.reset);

module.exports = router;
