var handlers = require('./request-handlers.js');
var router = require('express').Router();
var googleSheet = require(__dirname + '/../databases/google/google-sheet');

router.get('/dashboard', handlers.dashboard.get);

router.get('/quiz', handlers.quiz.get);

router.post('/quiz', googleSheet.quiz.post);

router.get('/api/reset', handlers.api.reset);

module.exports = router;
