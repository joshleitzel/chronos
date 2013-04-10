
  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(['./chronos_time', './chronos_error', './relative_time_string'], function(ChronosTime, ChronosError, RelativeTimeString) {
    var DateLanguageParser, DateMillisecondsParser, DateNumericParser, DateObjectParser, TimeParser, _isNumeric, _isString;
    _isString = function(input) {
      return Object.prototype.toString.call(input) === '[object String]';
    };
    _isNumeric = function(input) {
      return /^\d+$/.test(input);
    };
    DateLanguageParser = (function() {

      function DateLanguageParser(languageString, context) {
        var parsedDate, relativeTimeString;
        try {
          context = context ? [context] : [];
          relativeTimeString = new RelativeTimeString(languageString, new TimeParser(context));
          return new TimeParser([relativeTimeString.toMilliseconds()]);
        } catch (error) {
          parsedDate = Date.parse(languageString);
          if (isNaN(parsedDate)) {
            throw new ChronosError("Unparseable language string: " + languageString);
          } else {
            return new TimeParser([parsedDate]);
          }
        }
      }

      return DateLanguageParser;

    })();
    DateObjectParser = (function() {

      function DateObjectParser(dateObj) {
        return new ChronosTime(dateObj);
      }

      return DateObjectParser;

    })();
    DateMillisecondsParser = (function() {

      function DateMillisecondsParser(milliseconds) {
        return new DateObjectParser(new Date(milliseconds));
      }

      return DateMillisecondsParser;

    })();
    DateNumericParser = (function() {

      function DateNumericParser(args) {
        var dateObj;
        dateObj = new Date(args[0], args[1] - 1 || 0, args[2] || 1, args[3] || 0, args[4] || 0, args[5] || 0, args[6] || 0);
        return new DateObjectParser(dateObj);
      }

      return DateNumericParser;

    })();
    return TimeParser = (function() {

      function TimeParser(args) {
        if (args.length === 0) {
          return DateObjectParser(new Date());
        } else if (args.length === 1) {
          if (_isNumeric(args[0]) && ("" + args[0]).length === 4) {
            return new DateNumericParser([args[0]]);
          } else if (_isNumeric(args[0])) {
            return new DateMillisecondsParser(args[0]);
          } else if (args[0] instanceof Date) {
            return new DateObjectParser(args[0]);
          } else {
            return new DateLanguageParser(args[0]);
          }
        } else if (args.length === 2) {
          if (_isNumeric(args[0]) && ("" + args[0]).length === 4) {
            return new DateNumericParser([args[0], args[1]]);
          } else {
            if (_isString(args[0])) {
              return new DateLanguageParser(args[0], args[1]);
            } else {
              throw new ChronosError("Invalid arguments: " + args);
            }
          }
        } else {
          return new DateNumericParser(args);
        }
      }

      return TimeParser;

    })();
  });