module.exports = {
  dashboard: {
    get: function (req, res) {
      res.json('hello');
    }
  },
  quiz: {
    get: function (req, res) {
      res.json('hello');
    },
    post: function (req, res) { //handle buttons ('yes', 'no', 'almost');
      res.sendStatus(201);
    }
  }
};
