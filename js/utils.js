'use strict';

window.utils = (function () {
  var ESC_CODE = 27;
  var ENTER_CODE = 13;

  var randomArrayIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  return {
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_CODE;
    },
    isEnterEvent: function (evt) {
      return evt.keyCode === ENTER_CODE;
    },
    randomIndex: randomArrayIndex,
    chooseColor: function (colors) {
      return colors[randomArrayIndex(colors)];
    }
  };
})();
