(function() {
  var Chronos, ChronosTime, assert;

  assert = require('assert');

  ChronosTime = require('../lib/chronos_time');

  Chronos = require('../lib/chronos');

  describe('ChronosTime', function() {
    describe('proxy functions from date object', function() {
      var time;
      time = Chronos["new"](2000, 2, 3, 4, 5, 6, 7);
      it('gets the year', function() {
        return assert.equal(time.year(), 2000);
      });
      it('gets the month', function() {
        return assert.equal(time.month(), 2);
      });
      it('gets the day', function() {
        return assert.equal(time.day(), 3);
      });
      it('gets the hour', function() {
        return assert.equal(time.hour(), 4);
      });
      it('gets the minute', function() {
        return assert.equal(time.minute(), 5);
      });
      it('gets the second', function() {
        return assert.equal(time.second(), 6);
      });
      return it('gets the millisecond', function() {
        return assert.equal(time.millisecond(), 7);
      });
    });
    return describe('arithmetic', function() {
      var time;
      time = Chronos["new"](1360559971051);
      it('adds time', function() {
        return assert.equal(time.plus('2 minutes').toMilliseconds(), 1360560091051);
      });
      return it('subtracts time', function() {
        return assert.equal(time.minus('5 days').toMilliseconds(), 1360127971051);
      });
    });
  });

}).call(this);