var index = require('./index.js');
var router = require('express').Router();

router.get('/dashboard', index.dashboard.get);

router.get('/quiz', index.quiz.get);

router.post('/quiz', index.quiz.post);

module.exports = router;
