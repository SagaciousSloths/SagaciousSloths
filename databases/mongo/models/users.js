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
    // console.log('in findById id:', id);
    Users.findOne({_id: id}, function(err, userDoc) {
      callback(err, userDoc);
    });
  },
  findOne: function(id, callback) {
    // console.log('in findOne, ID:', id);
    Users.findOne({username: id.username}, function(err, userDoc) {
      callback(err, userDoc);
    });
  },
  addUser: function(newUser, callback) {
    let user = new Users(newUser);
    console.log('In mongoUser, add user:', user);
    user.save(function (err, result) {
      callback(err, result);
      // if (err) {
      //   return console.error(err);
      // } else {
      //   callback(result);
      // }
    });
  }
};
// let callback = (result) => console.log(result);
// module.exports.resetModel((result) => result);
// module.exports.addUser({username: 'JG', password: 'bluejay'}, callback);
// module.exports.findOne('Jeff', callback);
