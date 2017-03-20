var googleSheet = require(__dirname + '/../databases/google/google-sheet');
var mongo = require(__dirname + '/../databases/mongo/models/familiarities');
var algorithm = require('./repetition-algorithm');


  // NOTE: mongo structure:
  //   userId, cardId, algoData (an object) {bucket: 'red/orange/green'}

// GET /api/reset -----------------
// Creates the initial Mongo Familiarities table
// based on a Google spreadsheet of names
var createFamiliarities = function(req, res) {
  // Future sprint: get current user ID and pass it as param to getUserScores
  var userId = 0;

  var cards = googleSheet.getAllCards();

  // TESTING:
  cards = [{
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

  // Array of objects:
  // [{userId: 0, cardId: 'complex unique string1', algoData: {TBD}},...]
  mongo.addFamiliarities(familiarities);

  // may have to reset the table
  res.status(200).send('Reset complete: familiarities table loaded.');
};

// GET /dashboard ----------------
var getDeckBucketCounts = function (req, res) {
  // Buckets are: 'red', 'orange' and 'green'

  // Future sprint: get current user ID and pass it as param to getUserScores
  var userId = 0;

  var cardAlgoData = mongo.getCardAlgoData(userId);

  // {cardId: algoData, ...}, for the given user

  // TESTING:
  cardAlgoData = {
    'complex unique string1': {bucket: 'red'},  // full algoData object
    'complex unique string2': {bucket: 'green'},
  };

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


// GET /quiz/:deckname -------------------
var getDeckQuiz = function (req, res) {

  // TODO: find out where the last part of the path is in req
  var deckname = 'HRSF73';  // for TESTING

  // Future sprint: get current user ID and pass it as param to getUserScores
  var userId = 0;

  // query Familiarities from highest to lowest score for user
  // where algoData.bucket is not green
  // into ordered array of cardIds, highest red score first
  // Initial implementation: return rows with red first, then orange,
  // ignoring green rows
  var cardIds = mongo.getOrderedCardIds(userId);

  // TESTING:
  cardIds = ['complex unique string1', 'complex unique string2'];

  var quizCards = googleSheet.getQuizCards(cardIds, deckname);

  // TESTING:
  quizCards = [ {
    id: 'complex unique string1',
    firstname: 'J-G',
    lastname: 'Demathieu',
    pictureUrl: 'https://lh6.googleusercontent.com/uDKlK4ZoXoRxEc1-JbdzeH4eTnA_eQetXUOwqphbfaUQgkut6TRpuAa73Os6CrYHKgIKodqh9vyx1VBdCJ0LINbhZ9L8LHM_eRD1=w2560-h1398-rw',
    deck: 'HRSF73'
  }, {
    id: 'complex unique string2',
    firstname: 'David',
    lastname: 'Deng',
    pictureUrl: 'https://drive.google.com/open?id=0B7BE9TWkUdJXOE9TaWVGdjAtZ1hmR1ZHSFFUXzhjNzRuLWVz',
    deck: 'HRSF73'
  }];

  res.status(200).send(quizCards);
};


//------ Exports -------------------------
module.exports = {
  dashboard: {
    get: getDeckBucketCounts,
  },
  quiz: {
    get: getDeckQuiz,
  },
  api: {
    reset: createFamiliarities,
  }
};
