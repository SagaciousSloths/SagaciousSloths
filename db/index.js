var mongoose = require('mongoose');

// Form Mongo database with mongoose in index.js
mongoose.connect('mongodb://localhost/memo');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose lives!');
});

// Only need Familiarity for this sprint.
// FAMILIARITY: _id, StaffID, StudentID, Algorithm parameters
var FamiliaritySchema = mongoose.Schema({
    StaffID: {type: String, default: '1'},
    // Hard coded StaffID to 1 for now.
    StudentID: {type: String}, //change to datetime for Spreadsheet
    // Add some random dummy data in Algorithm values
    AlgorithmParameters: {type: Array, default: [.618, -1, .009, 3.14159]}
});

FamiliaritySchema.methods.example = function () {
  var greeting = this.StudentID
    ? "Welcome back to the card for " + this.StudentID
    : "This card doesn't have a studentID";
  console.log(greeting);
}

var Familiarities = mongoose.model('Familiarities', FamiliaritySchema);
var silence = new Familiarities({ StaffID:1, StudentID: 'Silence' });

var fluffy = new Familiarities({ StaffID:1, StudentID: 'fluffy' });
fluffy.example();

console.log(silence.StaffID);
console.log(silence.StudentID);

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.example();
});

Familiarities.find({}, function(error, result) { 
  if (error){
    console.error(error);
  } else {
    console.log(result);
  }
});


module.exports = {
  populateDB: function(cb) {
    Familiarities.forEach(function(studentStaffCard) {
      studentStaffCard.save(function (err, res) {
        if (err) {
          return console.error(err);
        } else {
          console.log(res);
          cb(res);
        }
      })
    })
  },
  dropDB: function(cb) {
    Familiarities.remove({},function(error, result) { 
      if (error){
        console.error(error);
      } else {
        console.log(result);
        cb(result);
      }
    });
  },
  findAll: function(cb) {
    Familiarities.find({}, function(error, result) { 
      if (error){
        console.error(error);
      } else {
        console.log(result);
        cb(result);
      }
    });
  },
  findOne: function(query, cb) { //structure: {StudentID: 3-15-2017 12:30:01, StaffID:1}
    Familiarities.find(query, function(error, result) { 
      if (error){
        console.error(error);
      } else {
        console.log(result);
        cb(result);
      }
    });
  }
  // Take in StudentID and StaffID from David (or JG). 
  // So build query to update cards ALGO data based on the StudentID and StaffID
  //insert document for card for student and teacher &or update to 
}

// Build Schemas required for 1 Quiz MVP: 
// All Required MongoDBs: Staff & Familiarities (Student_Staff Junction).
