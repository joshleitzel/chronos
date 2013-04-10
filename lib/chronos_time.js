
  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(['./time_string', './time_format', './chronos_dom', './time_span'], function(TimeString, TimeFormat, ChronosDom, TimeSpan) {
    var ChronosTime;
    return ChronosTime = (function() {

      function ChronosTime(dateObj) {
        this.dateObj = dateObj;
      }

      ChronosTime.prototype.toMilliseconds = function() {
        return this.dateObj.getTime();
      };

      ChronosTime.prototype.getDateObject = function() {
        return this.dateObj;
      };

      ChronosTime.prototype.plus = function(input) {
        return new ChronosTime(new Date(this.toMilliseconds() + new TimeString(input).toMilliseconds()));
      };

      ChronosTime.prototype.minus = function(input) {
        return new ChronosTime(new Date(this.toMilliseconds() - new TimeString(input).toMilliseconds()));
      };

      ChronosTime.prototype.timeUntil = function(time) {
        var chronosTime;
        chronosTime = (require('./chronos'))["new"](time, this);
        return new TimeSpan(chronosTime.toMilliseconds() - this.toMilliseconds());
      };

      ChronosTime.prototype.timeSince = function(time) {
        var chronosTime;
        chronosTime = (require('./chronos'))["new"](time, this);
        return new TimeSpan(this.toMilliseconds() - chronosTime.toMilliseconds());
      };

      ChronosTime.prototype.year = function() {
        return +this.dateObj.getFullYear();
      };

      ChronosTime.prototype.month = function() {
        return +this.dateObj.getMonth() + 1;
      };

      ChronosTime.prototype.day = function() {
        return +this.dateObj.getDate();
      };

      ChronosTime.prototype.hour = function() {
        return +this.dateObj.getHours();
      };

      ChronosTime.prototype.minute = function() {
        return +this.dateObj.getMinutes();
      };

      ChronosTime.prototype.second = function() {
        return +this.dateObj.getSeconds();
      };

      ChronosTime.prototype.millisecond = function() {
        return +this.dateObj.getMilliseconds();
      };

      ChronosTime.prototype.toString = function() {
        return this.dateObj.toString();
      };

      ChronosTime.prototype.isAfter = function(time) {
        var chronosTime;
        chronosTime = (require('./chronos'))["new"](time);
        return this.toMilliseconds() > chronosTime.toMilliseconds();
      };

      ChronosTime.prototype.isBefore = function(time) {
        return !this.isAfter(time);
      };

      ChronosTime.prototype.isPast = function() {
        return this.isBefore((require('./chronos'))["new"]());
      };

      ChronosTime.prototype.isFuture = function() {
        return !this.isPast();
      };

      ChronosTime.prototype.timeAgo = function() {
        return new TimeFormat(this.toMilliseconds()).format();
      };

      ChronosTime.prototype.timeFromNow = function() {
        return this.timeAgo();
      };

      ChronosTime.prototype.live = function(domId, callback, interval) {
        if (interval == null) interval = '5 seconds';
        return ChronosDom.live(domId, callback, this, interval);
      };

      return ChronosTime;

    })();
  });