(function() {
  var Chronos, Timeout, assert, sinon;

  assert = require('assert');

  sinon = require('sinon');

  Chronos = require('../lib/chronos');

  Timeout = require('../lib/timeout');

  describe('Timeout', function() {
    it('should set a timeout', function(done) {
      var _this = this;
      return Chronos["in"]('1 second')["do"](function() {
        return done();
      });
    });
    it('should set a timeout with a failing condition', function(done) {
      var _this = this;
      return Chronos.unless(function() {
        return false;
      })["in"]('50 ms')["do"](function() {
        return done();
      });
    });
    return it('should set a timeout with a passing condition', function(done) {
      var spy,
        _this = this;
      spy = sinon.spy();
      Chronos.unless(function() {
        return true;
      })["in"]('50 ms')["do"](spy);
      return setTimeout((function() {
        if (!spy.called) return done();
      }), 60);
    });
  });

}).call(this);