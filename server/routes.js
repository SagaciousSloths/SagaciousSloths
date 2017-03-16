var handlers = require('./request-handlers.js');
var router = require('express').Router();
var googleSheet = require(__dirname + '/../databases/google/google-sheet');

router.get('/dashboard', handlers.dashboard.get);

router.get('/quiz', googleSheet.quiz.get);

router.post('/quiz', googleSheet.quiz.post);

module.exports = router;
