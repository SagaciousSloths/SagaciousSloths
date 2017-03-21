var mongo = require(__dirname + '/../databases/mongo/models/familiarities');

const dayInMilliSeconds = 86400000;  // 1000 * 60 * 60 * 24

/* 
algoData object:
  efactor: E-Factor value,
  interval: inter-repetition interval after the n-th repetition, in days,
  nextQuizDate: due date for next quiz,
*/

// TODO: general change: compute buckets in real time, when asked

var getNewParams = function () {
  var result = {
    efactor: 2.5, 
    repetition: 1, 
    nextQuizDate: Date.now(),
  };
  return result;
};

var updateEfactor = function (algoParams, q) {
  algoParams.efactor = Math.max( algoParams.efactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)), 1.3);
};



exports.addFamiliarity = function (userId, cardId) {
  var algoParams = getNewParams();
  mongo.addFamiliarity(userId, cardId, algoParams);  // don't need to wait for result

  console.log('in algo, returning params:', algoParams);
  return algoParams;
};


// Update algoParams after a quiz on a card
exports.updateFamiliarity = function (userId, cardId, quizResult) {

  mongo.getAlgoParams(userId, cardId, function(algoParams) {
    // Testing, to remove:
    if (!algoParams) {
      console.log('Card not found in Familiarities, for update. userId:', userId, 'cardId:', cardId);
      algoParams = getNewParams();
    } 

    let q;

    console.log('now is:', Date.now());

    if (quizResult === 'nope') {
      algoParams.nextQuizDate -= dayInMilliSeconds;  
      // Use days in the past as a way to increase priority in next drawing
      algoParams.repetition = 0;  // remember this card was not known
      updateEfactor(algoParams, 0.5);  // The only way to get efactor of 1.3 as mentioned in spec
      // is to reduce efactor on bad answers. (see SM2-Algorithm.md in this directory).
      // I assume the directive to not change E-Factor on bad responses only applies
      // to the initial intervals, while efactor still updates at every try.
      // Then the efactor comes into play after a few successful quizzes: if the card has 
      // a bad history for the user, the efactor will start at 1.3

      console.log('NOPE Card, setting algoParams:', algoParams);

    } else if (quizResult === 'almost') {
      algoParams.nextQuizDate = Date.now();  // assign to orange 'due now' bucket
      //Specs says don't change eFactor in this case
      algoParams.repetition = 0;  // remember this card was not known
      updateEfactor(algoParams, 0.5);  // see note for 'nope' case
      console.log('ALMOST Card, setting algoParams:', algoParams);

    } else if (quizResult === 'gotit') {
      if (algoParams.repetition === 0) {
        //algoParams.eFactor = 2.5;
        algoParams.repetition = 1;
        // don't change efactor here
      } else if (algoParams.repetition === 1) {
        algoParams.repetition = 6;
        // don't change efactor here
      } else {
        algoParams.repetition = algoParams.efactor * algoParams.repetition;
        updateEfactor(algoParams, 4.5);  // correct response after a little hesitation
      }
      algoParams.nextQuizDate = Date.now() + algoParams.repetition * dayInMilliSeconds;
      console.log('GOTIT Card, setting algoParams:', algoParams);
    }

    // TODO: update the database record for the user! 
    mongo.setAlgoParams(userId, cardId, algoParams, function(res) {
      console.log('In algo, after setting algo params, res from mongo:', res);
    });
  });
};



exports.getBucket = function (algoData) {
  color = '';
  var daysElapsed = (Date.now() - algoData.nextQuizDate) / dayInMilliSeconds;

  if ( daysElapsed >= 1) { 
    return 'red';
  } else if (daysElapsed >= 0 ) {
    return 'orange';
  } else {
    return 'green';
  }
};

exports.getQuizDateThreshhold = function() {
  // Date under which a card should be put in the quiz
  return Date.now();
};





/*--- dashboard Display
React:
 GET /dashboard    (with session ID)

Server:
  /dashboard routes to: 
  request-handler: getDeckScores
    calls mongo model: getUserScores:
       query Familiarities for scores on all cards for the given user:
        -> cardScores = {cardId: score, ...}, for the given user 

    calls google: getAllCards:
      query Google for all (card id, deck name)
      result structure = {deckname: {red: score, orange: score, green: score}, ...}

    for each line of the Google table returned
      call bucketing method of algorithm to increment 
        the appropriate red/orange/green value for result[deckname]
        based on cardScores[cardId]
      if the cardId is not found in Familiarities:
        get score from algorithm (red)
        call mongo: addFamiliarity(userId, cardId, score)

  return: result to React


--- Request for a specific deck quiz
React:
 GET /quiz/:deckname
 
Server:
  request-handler getDeckQuiz:
    calls algorithm for green score threshold
    calls mongo model: getOrderedCardIds 
      query Familiarities from highest to lowest score for user where score > green threshold
        into array of cardIds 
    
    calls google model: getDeckCards(deckname, orderedIdList)
      get [first name, last name, pic link] corresponding to
        these cardIds in order
      filter out cards that are not in the right deck

      returns: [[first name, last name, picture link], ...] 
       in order of decreasing importance (=priority) for quiz
 
  returns result from google model


--- After each card of quiz
React:
 POST /api/card with data: card Id + result (red/orange/green)

Server: 
 returns OK
 recomputes the algo value for user + card:

Algorithm:
 previous score = find(cardId, userId)
 new score = compute (previous score, current card quiz score)
 replace (cardId, userId, new score)



--- Add records to Familiarities
To reset the system:

When a staff member registers:
  Get all card records from Google
  For each card record
    call getStartScore from algorithm (redest?)
    Call addFamiliarity(userId, cardId, score)



*/