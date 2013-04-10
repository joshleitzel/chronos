(function() {

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(['./time_string'], function(TimeString) {
    var RelativeTimeString;
    return RelativeTimeString = (function() {

      __extends(RelativeTimeString, TimeString);

      function RelativeTimeString(phrase, context) {
        var components;
        components = phrase.split(' ');
        this.direction = components[2] === 'ago' ? 'past' : 'future';
        this.context = context;
        RelativeTimeString.__super__.constructor.call(this, phrase);
      }

      RelativeTimeString.prototype.toMilliseconds = function() {
        var milliseconds;
        milliseconds = RelativeTimeString.__super__.toMilliseconds.apply(this, arguments);
        if (this.direction === 'past') {
          return this.context.toMilliseconds() - milliseconds;
        } else {
          return this.context.toMilliseconds() + milliseconds;
        }
      };

      return RelativeTimeString;

    })();
  });

}).call(this);