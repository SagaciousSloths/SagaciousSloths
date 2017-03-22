var mongoose = require('mongoose');
var db = require('../config');

var UserSchema = mongoose.Schema({
  username: {type: String, unique: true},
  password: {type: String}
});

var Users = mongoose.model('Users', UserSchema);

module.exports = {
  resetModel: function(cb) {
    Users.remove({}, function(error, result) { 
      if (error) {
        console.error('Error resetting the Users model:', error);
      } else {
        cb(result);
      }
    });
  },
  findById: function(id, callback) {
    console.log('in findById - TO IMPLEMENT! id:', id);
    callback();
  },
  findOne: function(id, callback) {
    console.log('in findOne - TO IMPLEMENT! ID:', id);
    callback();
  }
};
