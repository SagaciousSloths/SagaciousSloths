var mongoose = require('mongoose');
var db = require('../config');

var FamiliaritySchema = mongoose.Schema({
  StaffID: {type: String, default: '1'},
    // Hard coded StaffID to 1 for now.
  StudentID: {type: String}, //change to datetime for Spreadsheet
    // Add some random dummy data in Algorithm values
  AlgorithmParameters: {type: Array, default: [.618, -1, .009, 3.14159]}
});

var Familiarities = mongoose.model('Familiarities', FamiliaritySchema);

module.exports = {

  addFamiliarity: function (userId, cardId, algoData) {
    // For use when a card familiarity is not found for a user
  },

  addFamiliarities: function(familiarities) {  
    // Called when a user registers on site
    // familiarities: [{userId: val,cardId: val, algoData: {obj}}, ...]

  },

  

  getCardAlgoData: function (userId) {},

  // query Familiarities from highest to lowest score for user
  // where algoData.bucket is not green
  // into ordered array of cardIds, highest red score first
  getOrderedCardIds(userId) {},

  populateDB: function(newCards, cb) {
    let mongoDocCards = [];

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
          cb(result);
        }
      });
    });
  },
  dropDB: function(cb) {
    Familiarities.remove({}, function(error, result) { 
      if (error) {
        console.error(error);
      } else {
        console.log(result);
        cb(result);
      }
    });
  },
  findAll: function(cb) {
    Familiarities.find({}, function(error, result) { 

      if (error) {
        console.error(error);
      } else {
        console.log(result);
        cb(result);
      }
    });
  },
  //Build query to update cards ALGO data based on the StudentID and StaffID
  //insert document for card for student and teacher &or update to 
  findCard: function(query, cb) { //structure: {StudentID: 3-15-2017 12:30:01, StaffID:1}
    Familiarities.find(query, function(error, result) { 

      if (error) {
        console.error(error);
      } else {
        console.log(result);
        cb(result);
      }
    });
  }
};


// let cb = ((result) => result);
// let newCards = [{StudentID: 'Jeff'}, {StudentID: 'David'}, {StudentID: 'JG'}, {StudentID: 'Kay'}];
// module.exports.dropDB(cb);
// module.exports.populateDB(newCards, cb);
// module.exports.findAll(cb);
// module.exports.findCard({StudentID: 'Jeff'}, cb);
