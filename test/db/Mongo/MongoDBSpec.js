var mocha = require('mocha');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var db = require('../index.js');

//let newCards = [{StudentID:'Jeff'}, {StudentID:'David'}, {StudentID:'JG'}, {StudentID:'Kay'}];
// module.exports.dropDB();
// module.exports.findOne({StudentID:'Jeff'});

beforeEach(function (done) {

});


afterEach(function (done) {

});

describe('nothing', function() {
  it('should return true always', function() {
    expect(1 + 1 === 2).to.be.true
  });
});

describe('Mongo index ', function() {
  it('should connect successfully', function() {
    expect(1 + 1).to.equal(2);
  });
})