var googleSheet = require(__dirname + '/../databases/google/google-sheet');
var mongo = require(__dirname + '/../databases/mongo/models/familiarities');
var mongoUsers = require(__dirname + '/../databases/mongo/models/users');
var algorithm = require('./repetition-algorithm');


  // NOTE: mongo structure:
  //   userId, cardId, algoData (an object) {bucket: 'red/orange/green'}



// GET /dashboard ----------------
var getDeckBucketCounts = function (req, res) {
  // Buckets are: 'red', 'orange' and 'green'

  // console.log('in get deck buckets, req:', req);

  var userId = req.user._id;

  mongo.getCardIds(userId, function(cardIds) {
    // cardIds = {
    //   'complex unique string1': {algoData},  // full algoData object
    //   'complex unique string2': {algoData},
    // };

    // console.log('received from Mongoose getCardIds:', cardIds);

    var cards = googleSheet.getAllCards(function(cards) {
      // cards = [ {
      //   id: 'complex unique string1',
      //   firstname: 'J-G',
      //   lastname: 'Demathieu',
      //   pictureUrl: 'http//jg...',
      //   deck: 'HRSF74'
      // },..];
      
      //console.log('cards:', cards);
      

      let results = {};

      cards.forEach(function(card) {

        // console.log('in foreach of getDeckBucketCounts, card:', card);
        if (!(card.id && card.firstname && card.lastname && card.pictureUrl && card.deck)) {
          // incomplete line, skip it!
          return;
        }

        let bucket;
        let algoData;

        if (!cardIds[card.id]) {
          // the user hasn't seen this card yet
          algoData = algorithm.addFamiliarity(userId, card.id);
        } else {
          // console.log('Familiar card!');
          algoData = cardIds[card.id];
        }
        bucket = algorithm.getBucket(algoData);

        if (!results[card.deck]) {
          results[card.deck] = {red: 0, orange: 0, green: 0};  // create the deck
        }

        results[card.deck][bucket]++;
      });

      console.log('Deck results:', results);

      res.status(200).send(results);
      // {deckname: {red: score, orange: score, green: score}, ...}
      
    });    
  });
};


// GET /quiz/:deckname -------------------
var getDeckQuiz = function (req, res) {

  var deckname = req.query.deck;  

  console.log('in get deck quiz, req.user:', req.user);

  var userId = req.user._id;
  // query Familiarities from highest to lowest score for user
  // where algoData.bucket is not green
  // into ordered array of cardIds, highest red score first
  // Initial implementation: return rows with red first, then orange,
  // ignoring green rows
  let threshold = algorithm.getQuizDateThreshhold();

  mongo.getOrderedCardIds(userId, threshold, function(orderedCardIds) {
    // console.log('ordered cardIds in getDeckQuiz:', orderedCardIds);
    // TESTING:
    // cardIds = ['complex unique string1', 'complex unique string2': '1'];
    // console.log('OrderedCardIds received from mongo:', orderedCardIds);

    googleSheet.getQuizCards(orderedCardIds, deckname, function(quizCards) {
      // TESTING:
      // quizCards = [ {
      //   id: 'complex unique string1',
      //   firstname: 'J-G',
      //   lastname: 'Demathieu',
      //   pictureUrl: 'https://lh6.googleusercontent.com/uDKlK4ZoXoRxEc1-JbdzeH4eTnA_eQetXUOwqphbfaUQgkut6TRpuAa73Os6CrYHKgIKodqh9vyx1VBdCJ0LINbhZ9L8LHM_eRD1=w2560-h1398-rw',
      //   deck: 'HRSF73'
      // }, {
      //   id: 'complex unique string2',
      //   firstname: 'David',
      //   lastname: 'Deng',
      //   pictureUrl: 'https://drive.google.com/open?id=0B7BE9TWkUdJXOE9TaWVGdjAtZ1hmR1ZHSFFUXzhjNzRuLWVz',
      //   deck: 'HRSF73'
      // }];

      // console.log('@@@@@@@@@ Sending to React the cards:', quizCards);

      res.status(200).send(quizCards);
      
    });    
  });
};


// POST /api/card
// data: {cardId: 'cardId', quizResult: 'gotIt/almost/nope'}
var updateUserCardFamiliarity = function (req, res) {

  // console.log('In updateUserCardFamiliarity, Req body is:', req.body);
  var userId = req.user._id;


  let cardId = req.body.cardId;
  let answer = req.body.answer;

  console.log('in handler, update card familiarity, update card id:', cardId, '  quiz res:', answer);

  algorithm.updateFamiliarity(userId, cardId, answer);

  res.status(201).send('Updated card-user data');
};


var resetMongo = function (req, res) {
  mongo.resetDB(function(FamiliaritiesResetResult) {
    console.log('FamiliaritiesResetResult: ', FamiliaritiesResetResult);
    res.status(200).send('Mongo Familiarities and Users tables reset');
  });
  mongoUsers.resetModel(function(UsersResetResult) {
    console.log('UsersResetResult: ', UsersResetResult);
  });
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
    reset: resetMongo,
    card: updateUserCardFamiliarity,
  }
};




