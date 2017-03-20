var mongoose = require('mongoose');
var db = require('../config');

var FamiliaritySchema = mongoose.Schema({
  StaffID: {type: String, default: '0'},
    // Hard coded StaffID to 1 for now.
  StudentID: {type: String}, //change to datetime for Spreadsheet
  AlgoParams: {
    efactor: {type: Number, default: 2.5},
    repetition: {type: Number, default: 1},
    nextQuizDate: {type: Number, default: 0}
  }
});

var Familiarities = mongoose.model('Familiarities', FamiliaritySchema);

module.exports = {

  addFamiliarity: function (userId, cardId, algoData) {
    // console.log('in addFamiliarity, algoData:', algoData);
    module.exports.populateDB([{
      StaffID: userId,
      StudentID: cardId,
      AlgoParams: algoData
    }], ((result) => {
      //console.log('Result of addFamiliarity:', result);
    })
    );
  },

  addFamiliarities: function(familiarities) {  
    module.exports.populateDB(familiarities, 
      ((result) => console.log(result))
    );
  },

  getCardIds: function (userId, callback) {
    module.exports.findCard({StaffID: userId}, function(userCards) {
      // console.log('in getCardIds, userCards:', userCards);

      if (!userCards) {
        return {};
      }

      let cardIds = {};

      userCards.forEach(function(card) {
        // console.log('card', card, 'card.StudentID', card.StudentID, 'Algo params:', card.AlgoParams);
        cardIds[card.StudentID] = card.AlgoParams;
      });

      callback(cardIds);   
         
    });
  },

  // query Familiarities from highest to lowest score for user
  // where algoData.bucket is not green
  // into ordered array of cardIds, highest red score first
  getOrderedCardIds(userId, callback) {
  //query Familiarities for scores on all cards for the given user:
  //-> cardScores = {cardId: score, ...}, for the given user  
    module.exports.findCard(
      {StaffID: userId},
      function(orderedCards) {
        //card = card.sort((a, b) => b.AlgoParams.bucket - a.AlgoParams.bucket);

        console.log('ordered card ids in familiarities:', orderedCards);
        var orderedCardIds = orderedCards.map(function(card) {
          console.log('card:', card);
          return card.StudentID;
        });

        // var orderedCardIds = {};

        // card.forEach(function(cardInfo) {
        //   // var cardScore = {};
        //   // cardScore[cardInfo.StudentID] = cardInfo.AlgoParams.bucket;
        //   // if (cardInfo.AlgoParams.bucket !== 'green') {
        //   cardScores.push(cardInfo.StudentID);
        //   // }
        // });
        callback(orderedCardIds);
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
          // console.log(result);
          cb(result);
        }
      });
    });
  },
  resetDB: function(cb) {
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
// module.exports.resetDB(cb);
// module.exports.populateDB(newCards, cb);
// module.exports.findAll(cb);
// module.exports.getOrderedCardIds(0, cb);
