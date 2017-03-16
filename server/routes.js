var controller = require('./controllers');
var router = require('express').Router();

router.get('/dashboard', controller.dashboard.get);

router.post('/dashboard', controller.dashboard.post);

router.get('/quiz', controller.quiz.get);

router.post('/quiz', controller.quiz.post);

module.exports = router;
