(function() {
  var Chronos, ChronosDOM, assert, cheerio, sinon;

  assert = require('assert');

  sinon = require('sinon');

  cheerio = require('cheerio');

  Chronos = require('../lib/chronos');

  ChronosDOM = require('../lib/chronos_dom');

  describe('ChronosDOM', function() {
    return it('updates DOM nodes', function(done) {
      var $;
      $ = cheerio.load('<div id="live">Posted <span></span></div>');
      Chronos["new"]('10 seconds ago').live($('#live span'), (function(time) {
        return time.timeAgo();
      }), '1 second');
      return setTimeout((function() {
        if ($('#live').text() === 'Posted 11 seconds ago') return done();
      }), 1000);
    });
  });

}).call(this);