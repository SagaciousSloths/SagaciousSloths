var googleSheet = require(__dirname + '/../databases/google/google-sheet');
var mongo = require(__dirname + '/../databases/mongo/models/familiarities');
var algorithm = require('./repetition-algorithm');


  // NOTE: mongo structure:
  //   userId, cardId, algoData (an object) 

var createFamiliarities = function() {

  // Future sprint: get current user ID and pass it as param to getUserScores
  var userId = 0;

  var cards = googleSheet.getAllCards();

  // TESTING:
  cards = [ {
    id: 'complex unique string1', 
    firstname: 'J-G',
    lastname: 'Demathieu',
    pictureUrl: 'http//jg...',
    deck: 'HRSF74'
  }, {
    id: 'complex unique string2',
    firstname: 'David',
    lastname: 'Deng',
    pictureUrl: 'http//david...',
    deck: 'HRSF73'
  }];

  var algoData = algorithm.addCard(); 

  var familiarities = cards.map(function(card) {
    return {
      userId: userId,
      cardId: card.id,
      algoData: algoData
    };  
  });
  
  // [{userId: 0, cardId: 'complex unique string1', algoData: {TBD}},...]
  mongo.addFamiliarities(familiarities);

};

var getDeckBucketCounts = function (req, res) {
  // Buckets are: 'red', 'orange' and 'green'
  
  // Future sprint: get current user ID and pass it as param to getUserScores
  var userId = 0;

  var cardAlgoData = mongo.getCardAlgoData(userId);  

  // {cardId: algoData, ...}, for the given user 

  // TESTING:
  cardAlgoData = {
    'complex unique string1': {bucket: 'red'},
    'complex unique string2': {bucket: 'green'},
  };

  var cards = googleSheet.getAllCardIds();

  // TESTING:
  cards = [ {
    id: 'complex unique string1', 
    firstname: 'J-G',
    lastname: 'Demathieu',
    pictureUrl: 'http//jg...',
    deck: 'HRSF74'
  }, {
    id: 'complex unique string2',
    firstname: 'David',
    lastname: 'Deng',
    pictureUrl: 'http//david...',
    deck: 'HRSF73'
  }];

  let results = {};

  cards.forEach(function(card) {
    let bucket;
    if (!cardAlgoData[card.id]) {
      // the user hasn't seen this card yet
      var algoData = algorithm.addCard();  // the initial score of any new card
      mongo.addFamiliarity(userId, cardId, algoData);
      bucket = algoData.bucket;
    } else {
      bucket = cardAlgoData[card.id].bucket;
    }

    if (!results[card.deck]) {
      results[card.deck] = {red: 0, orange: 0, green: 0};  // create the deck
    }

    results[card.deck][bucket]++; 
  });

  console.log('Deck results:', results);
   
  res.status(200).send(results);
  // {deckname: {red: score, orange: score, green: score}, ...}
}; 


module.exports = {
  dashboard: {
    get: getDeckBucketCounts,
  }
};
