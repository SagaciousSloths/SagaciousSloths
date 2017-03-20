var https = require('https');
'strict';

// Google sheet
const API_KEY = 'AIzaSyAg7N0a05JYqyZDYdT3gZIJiN1wGaZO6-w';
var url = 'https://sheets.googleapis.com/v4/spreadsheets/';
var spreadsheetId = '1T-tnJlfiqUyQZMEJe9W-d6OKg5vVchhjn_L7ffIXyyI';
// https://docs.google.com/spreadsheets/d/1T-tnJlfiqUyQZMEJe9W-d6OKg5vVchhjn_L7ffIXyyI/edit?usp=sharing

var query = '/values:batchGet?majorDimension=ROWS&ranges=B2%3AD5&valueRenderOption=FORMATTED_VALUE&key=';
var httpGet;

exports.quiz = {
  get: function (req, res) {
    console.log('In G. get');
    httpGet(function(parsedData) {
      // Use date as unique ID - change similar dates
      // console.log('Success, in quizzes func! Data:', parsedData);
      var students = parsedData.valueRanges[0].values;
      console.log('Student arrays sent back to client:', students);
      res.status(200).send(students);
    });
  },
};

exports.getAllCards = function () {};

// not needed: exports.getAllCardIds = function () {};

exports.getQuizCards = function (cardIds, deckname) {};


//----------- Helper functions ------------
httpGet = function (callback) {
  query = url + spreadsheetId + query + API_KEY;
  console.log('query', query);

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
        // console.log('parsedData = ', parsedData);
        callback(parsedData);

      } catch (e) {
        console.log(e.message);
      }
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });  
};



