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

var Familiarities = mongoose.model('Familiarities', FamiliaritySchema);

module.exports = {
  populateDB: function(newCards, cb) {
    let mongoDocCards = []
    newCards.forEach(function(card) {
      let newCard = new Familiarities(card);
      mongoDocCards.push(newCard);
    });

    mongoDocCards.forEach(function(studentStaffCard) {
      studentStaffCard.save(function (err, result) {
        if (err) {
          return console.error(err);
        } else {
          console.log(result);
          // cb(result);
        }
      });
    });
  },
  dropDB: function(cb) {
    Familiarities.remove({},function(error, result) { 
      if (error){
        console.error(error);
      } else {
        console.log(result);
        // cb(result);
      }
    });
  },
  findAll: function(cb) {
    Familiarities.find({}, function(error, result) { 
      if (error){
        console.error(error);
      } else {
        console.log(result);
        // cb(result);
      }
    });
  },
  findOne: function(query, cb) { //structure: {StudentID: 3-15-2017 12:30:01, StaffID:1}
    Familiarities.find(query, function(error, result) { 
      if (error){
        console.error(error);
      } else {
        console.log(result);
        // cb(result);
      }
    });
  }
  //Build query to update cards ALGO data based on the StudentID and StaffID
  //insert document for card for student and teacher &or update to 
}
let newCards = [{StudentID:'Jeff'}, {StudentID:'David'}, {StudentID:'JG'}, {StudentID:'Kay'}];
module.exports.dropDB();
module.exports.populateDB(newCards);
module.exports.findOne({StudentID:'Jeff'});
module.exports.findAll()