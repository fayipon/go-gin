'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyListener = function () {
  function KeyListener() {
    _classCallCheck(this, KeyListener);

    this.LEFT = 37;
    this.RIGHT = 39;
    this.UP = 38;
    this.DOWN = 40;
    this.SPACE = 32;

    this.keys = {};

    this.down = this.down.bind(this);
    this.up = this.up.bind(this);
    this.isDown = this.isDown.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  _createClass(KeyListener, [{
    key: 'down',
    value: function down(event) {
      if (event.keyCode in this.keys) {
        event.preventDefault();
        this.keys[event.keyCode] = true;
      }
    }
  }, {
    key: 'up',
    value: function up(event) {
      if (event.keyCode in this.keys) {
        event.preventDefault();
        this.keys[event.keyCode] = false;
      }
    }
  }, {
    key: 'isDown',
    value: function isDown(keyCode) {
      return this.keys[keyCode] || false;
    }
  }, {
    key: 'subscribe',
    value: function subscribe(keys) {
      var _this = this;

      window.addEventListener('keydown', this.down);
      window.addEventListener('keyup', this.up);

      keys.forEach(function (key) {
        _this.keys[key] = false;
      });
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe() {
      window.removeEventListener('keydown', this.down);
      window.removeEventListener('keyup', this.up);
      this.keys = {};
    }
  }]);

  return KeyListener;
}();

exports.default = KeyListener;