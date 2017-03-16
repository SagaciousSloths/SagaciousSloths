var models = require('../models');

module.exports = {
  dashboard: {
    get: function (req, res) {
      models.dashboard.get(function(err, results) {
        if (err) {
          // handle error
        } else {
          res.json(results);
        }
      });
    },
  //   post: function (req, res) {
  //     models.dashboard.post(params, function(err, results) {
  //       if (err) {
  //         // handle error
  //       } else {
  //         res.sendStatus(201);
  //       }
  //     });
  //   }
  // },

  quiz: {
    get: function (req, res) {
      models.quiz.get(function(err, results) {
        if (err) {
          // handle error
        } else {
          res.json(results);
        }
      }); //buttons: yes, no, almost
    },
    post: function (req, res) {
      models.quiz.post(params, function(err, results) {
        if (err) {
          // handle error
        } else {
          res.sendStatus(201);
        }
      });
    }
  }
};
