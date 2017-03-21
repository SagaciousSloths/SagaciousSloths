var mongoose = require('mongoose');

// Form Mongo database with mongoose in index.js
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/memo');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose lives!');
});

module.exports = db;