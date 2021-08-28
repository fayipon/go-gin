'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _matterJs = require('matter-js');

var _matterJs2 = _interopRequireDefault(_matterJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Body = (_temp = _class = function (_Component) {
  _inherits(Body, _Component);

  function Body(props, context) {
    _classCallCheck(this, Body);

    var _this = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));

    var args = props.args,
        children = props.children,
        shape = props.shape,
        options = _objectWithoutProperties(props, ['args', 'children', 'shape']); // eslint-disable-line no-unused-vars

    _this.body = _matterJs.Bodies[shape].apply(_matterJs.Bodies, _toConsumableArray(args).concat([options]));
    _matterJs.World.addBody(context.engine.world, _this.body);
    return _this;
  }

  _createClass(Body, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var args = nextProps.args,
          children = nextProps.children,
          shape = nextProps.shape,
          options = _objectWithoutProperties(nextProps, ['args', 'children', 'shape']); // eslint-disable-line no-unused-vars

      Object.keys(options).forEach(function (option) {
        if (option in _this2.body && _this2.props[option] !== nextProps[option]) {
          _matterJs2.default.Body.set(_this2.body, option, options[option]);
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _matterJs.World.remove(this.context.engine.world, this.body);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        body: this.body
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return Body;
}(_react.Component), _class.propTypes = {
  angle: _propTypes2.default.number,
  area: _propTypes2.default.string,
  args: _propTypes2.default.array,
  axes: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }),
  bounds: _propTypes2.default.shape({
    min: _propTypes2.default.shape({
      x: _propTypes2.default.number,
      y: _propTypes2.default.number
    }),
    max: _propTypes2.default.shape({
      x: _propTypes2.default.number,
      y: _propTypes2.default.number
    })
  }),
  children: _propTypes2.default.any,
  collisionFilter: _propTypes2.default.shape({
    category: _propTypes2.default.number,
    group: _propTypes2.default.number,
    mask: _propTypes2.default.number
  }),
  density: _propTypes2.default.number,
  force: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }),
  friction: _propTypes2.default.number,
  frictionAir: _propTypes2.default.number,
  frictionStatic: _propTypes2.default.number,
  id: _propTypes2.default.number,
  inertia: _propTypes2.default.number,
  inverseInertia: _propTypes2.default.number,
  inverseMass: _propTypes2.default.number,
  isSensor: _propTypes2.default.bool,
  isSleeping: _propTypes2.default.bool,
  isStatic: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  mass: _propTypes2.default.number,
  position: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }),
  restitution: _propTypes2.default.number,
  shape: _propTypes2.default.string,
  sleepThreshold: _propTypes2.default.number,
  slop: _propTypes2.default.number,
  slope: _propTypes2.default.number,
  timeScale: _propTypes2.default.number,
  torque: _propTypes2.default.number,
  vertices: _propTypes2.default.array
}, _class.defaultProps = {
  args: [0, 0, 100, 100],
  restitution: 0,
  friction: 1,
  frictionStatic: 0,
  shape: 'rectangle'
}, _class.contextTypes = {
  engine: _propTypes2.default.object
}, _class.childContextTypes = {
  body: _propTypes2.default.object
}, _temp);
exports.default = Body;