var https = require('https');
'strict';

// Google sheet
const API_KEY = 'AIzaSyAg7N0a05JYqyZDYdT3gZIJiN1wGaZO6-w';
var url = 'https://sheets.googleapis.com/v4/spreadsheets/';
var spreadsheetId = '1T-tnJlfiqUyQZMEJe9W-d6OKg5vVchhjn_L7ffIXyyI';
// https://docs.google.com/spreadsheets/d/1T-tnJlfiqUyQZMEJe9W-d6OKg5vVchhjn_L7ffIXyyI/edit?usp=sharing

var sheetRange = '/values:batchGet?majorDimension=ROWS&ranges=B2%3AE100&valueRenderOption=FORMATTED_VALUE&key=';

// exports.quiz = {
//   get: function (req, res) {
//     console.log('In G. get');
//     exports.getAllCards(function(parsedData) {
//       // Use date as unique ID - change similar dates
//       // console.log('Success, in quizzes func! Data:', parsedData);
//       var students = parsedData.valueRanges[0].values;
//       console.log('Student arrays sent back to client:', students);
//       res.status(200).send(students);
//     });
//   },
// };

exports.getAllCards = function (callback) {
  let query = url + spreadsheetId + sheetRange + API_KEY;
  // console.log('query', query);

  https.get(query, (res) => {
    const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.log(error.message);
      // consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
      try {
        let parsedData = JSON.parse(rawData);
        parsedData = parsedData.valueRanges[0].values;
        // console.log('parsedData = ', parsedData);

        var result = [];
        parsedData.forEach(function(elem) {
          var card = {};
          card.firstname = elem[0];
          card.lastname = elem[1];
          card.pictureUrl = elem[2];
          card.deck = elem[3];
          card.id = elem[0] + elem[1] + elem[2] + elem[3];

          if (card.firstname && card.lastname && card.pictureUrl && card.deck) {
            result.push(card);
          }
        });
        callback(result);

      } catch (e) {
        console.log(e.message);
      }
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });  
};

// not needed: exports.getAllCardIds = function () {};

exports.getQuizCards = function (orderedCardIds, deckname, callback) {
  exports.getAllCards(function(cards) {

    // console.log('All cards in sheets:', cards);

    // create keys for fast lookup
    var cardsObject = {};
    cards.forEach(function (card) {
      cardsObject[card.id] = card;
    });

    var quizCards = [];
      
    // console.log('@@@ cardsObject', cardsObject);
    // console.log('Deckname', deckname);

    orderedCardIds.forEach(function(cardId) {
      // console.log('cardId:', cardId);
      if (!cardsObject[cardId]) {
        console.error('Card with id:', cardId, 'not found in GoogleSheets');
      } else if (cardsObject[cardId].deck === deckname) {
        quizCards.push(cardsObject[cardId]);
      }
    });

    // the cards not in the list are ignored.
    // console.log('quiz cards:', quizCards);
    callback(quizCards);
    
  });
};





