var mongoose = require('mongoose');
var db = require('../config');

var FamiliaritySchema = mongoose.Schema({
  StaffID: {type: String, default: '0'},
    // Hard coded StaffID to 1 for now.
  StudentID: {type: String}, //change to datetime for Spreadsheet
  AlgoParams: {
    bucket: {type: String, default: 'red'}
  }
});

var Familiarities = mongoose.model('Familiarities', FamiliaritySchema);

module.exports = {

  addFamiliarity: function (userId, cardId, algoData) {
    module.exports.populateDB([{
      StaffID: userId,
      StudentID: cardId,
      AlgoParams: algoData
    }], ((result) => console.log(result))
    );
  },

  addFamiliarities: function(familiarities) {  
    module.exports.populateDB(familiarities, 
      ((result) => console.log(result))
    );
  },

  getCardAlgoData: function (userId, cb) {
    module.exports.findCard({StaffID: userId}, cb);
  },

  // query Familiarities from highest to lowest score for user
  // where algoData.bucket is not green
  // into ordered array of cardIds, highest red score first
  getOrderedCardIds(userId, cb) {
  //query Familiarities for scores on all cards for the given user:
  //-> cardScores = {cardId: score, ...}, for the given user  
    module.exports.findCard(
      {StaffID: userId},
      function(result) {
        //result = result.sort((a, b) => b.AlgoParams.bucket - a.AlgoParams.bucket);
        var cardScores = [];
        result.forEach(function(cardInfo) {
          var cardScore = {};
          cardScore[cardInfo.StudentID] = cardInfo.AlgoParams.bucket;
          if (cardInfo.AlgoParams.bucket !== 'green') {
            cardScores.push(cardScore);
          }
        });
        cb(cardScores);
      }); 
      
  },

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
        cb(result);
      }
    });
  },
  findAll: function(cb) {
    Familiarities.find({}, function(error, result) { 

      if (error) {
        console.error(error);
      } else {
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
        cb(result);
      }
    });

  }
};


// let cb = ((result) => console.log(result));
// let newCards = [{StudentID: 'Jeff', AlgoParams: {bucket: 'green'}}, {StudentID: 'David'}, {StudentID: 'JG'}, {StudentID: 'Kay'}];
// module.exports.dropDB(cb);
// module.exports.populateDB(newCards, cb);
// module.exports.findAll(cb);
// module.exports.getOrderedCardIds(0, cb);
