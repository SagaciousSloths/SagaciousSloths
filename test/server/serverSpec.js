var request = require('request');
var expect = require('chai').expect;
var port = process.env.port || 3000;

describe('dashboard GET', function() {
  it('should respond to GET requests for /dashboard with a 200 status code', function(done) {
    request('http://127.0.0.1:' + port + '/dashboard', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send back parsable stringified JSON', function(done) {
    request('http://127.0.0.1:' + port + '/dashboard', function(error, response, body) {
      expect(JSON.parse.bind(this, body)).to.not.throw();
      done();
    });
  });

  it('should send back an object', function(done) {
    request('http://127.0.0.1:' + port + '/dashboard', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      done();
    });
  });

  it('should send an object containing objects', function(done) {
    request('http://127.0.0.1:' + port + '/dashboard', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      var keys = Object.keys(parsedBody);
      expect(parsedBody[keys[0]]).to.be.an('object');
      done();
    });
  });
});

describe('quiz GET', function() {
  it('should respond to GET requests for /quiz with a 200 status code', function(done) {
    request('http://127.0.0.1:' + port + '/quiz', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send back parsable stringified JSON', function(done) {
    request('http://127.0.0.1:' + port + '/quiz', function(error, response, body) {
      expect(JSON.parse.bind(this, body)).to.not.throw();
      done();
    });
  });

  it('should send back an array', function(done) {
    request('http://127.0.0.1:' + port + '/quiz', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('array');
      done();
    });
  });

  it('should send an array containing objects', function(done) {
    request('http://127.0.0.1:' + port + '/quiz', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('array');
      expect(parsedBody[0]).to.be.an('object');
      done();
    });
  });


  it('Should 404 when asked for a nonexistent endpoint', function(done) {
    request('http://127.0.0.1:' + port + '/iPreferAnki', function(error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});


  // it('should accept POST requests to /quiz', function(done) {
  //   var requestParams = {method: 'POST',
  //     uri: 'http://127.0.0.1:' + port + '/quiz',
  //     json: [{
  //       firstname: 'J-G',
  //       lastname: 'Demathieu',
  //     }]
  //   };

  //   request(requestParams, function(error, response, body) {
  //     expect(response.statusCode).to.equal(201);
  //     done();
  //   });
  // });

  // it('should respond with messages that were previously posted', function(done) {
  //   var requestParams = {method: 'POST',
  //     uri: 'http://127.0.0.1:' + port + '/quiz',
  //     json: [{
  //       firstname: 'J-G',
  //       lastname: 'Demathieu',
  //     }]
  //   };

  //   request(requestParams, function(error, response, body) {
  //     request('http://127.0.0.1:' + port + '/quiz', function(error, response, body) {
  //       var parsedBody = JSON.parse(body);
  //       expect(parsedBody[0].firstname).to.equal('J-G');
  //       expect(parsedBody[0].lastname).to.equal('Demathieu');
  //       done();
  //     });
  //   });
  // })
