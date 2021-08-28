'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TileMap = (_temp = _class = function (_Component) {
  _inherits(TileMap, _Component);

  function TileMap() {
    _classCallCheck(this, TileMap);

    return _possibleConstructorReturn(this, (TileMap.__proto__ || Object.getPrototypeOf(TileMap)).apply(this, arguments));
  }

  _createClass(TileMap, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      return this.context.scale !== nextContext.scale;
    }
  }, {
    key: 'generateMap',
    value: function generateMap() {
      var _this2 = this;

      var _props = this.props,
          columns = _props.columns,
          layers = _props.layers,
          rows = _props.rows;


      var mappedLayers = [];

      layers.forEach(function (l, index) {
        var layer = [];
        for (var r = 0; r < rows; r++) {
          for (var c = 0; c < columns; c++) {
            var gridIndex = r * columns + c;
            if (l[gridIndex] !== 0) {
              layer.push(_react2.default.createElement(
                'div',
                {
                  key: 'tile-' + index + '-' + r + '-' + c,
                  style: _this2.getImageWrapperStyles(r, c)
                },
                _this2.props.renderTile(_this2.getTileData(r, c, l[gridIndex]), _this2.props.src, _this2.getImageStyles(l[gridIndex]))
              ));
            }
          }
        }
        mappedLayers.push(layer);
      });

      return mappedLayers;
    }
  }, {
    key: 'getTileData',
    value: function getTileData(row, column, index) {
      var tileSize = this.props.tileSize;


      var size = tileSize;
      var left = column * size;
      var top = row * size;

      return {
        index: index,
        size: tileSize,
        left: left,
        top: top
      };
    }
  }, {
    key: 'getImageStyles',
    value: function getImageStyles(imageIndex) {
      var scale = this.context.scale;
      var tileSize = this.props.tileSize;


      var size = Math.round(scale * tileSize);
      var left = (imageIndex - 1) * size;

      return {
        position: 'absolute',
        imageRendering: 'pixelated',
        display: 'block',
        height: '100%',
        transform: 'translate(-' + left + 'px, 0px)'
      };
    }
  }, {
    key: 'getImageWrapperStyles',
    value: function getImageWrapperStyles(row, column) {
      var scale = this.context.scale;
      var tileSize = this.props.tileSize;


      var size = Math.round(scale * tileSize);
      var left = column * size;
      var top = row * size;

      return {
        height: size,
        width: size,
        overflow: 'hidden',
        position: 'absolute',
        transform: 'translate(' + left + 'px, ' + top + 'px)'
      };
    }
  }, {
    key: 'getLayerStyles',
    value: function getLayerStyles() {
      return {
        position: 'absolute',
        top: 0,
        left: 0
      };
    }
  }, {
    key: 'getWrapperStyles',
    value: function getWrapperStyles() {
      return {
        position: 'absolute',
        top: 0,
        left: 0
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var layers = this.generateMap();
      return _react2.default.createElement(
        'div',
        { style: _extends({}, this.getWrapperStyles(), this.props.style) },
        layers.map(function (layer, index) {
          return _react2.default.createElement(
            'div',
            { key: 'layer-' + index, style: _this3.getLayerStyles() },
            layer
          );
        })
      );
    }
  }]);

  return TileMap;
}(_react.Component), _class.propTypes = {
  columns: _propTypes2.default.number,
  layers: _propTypes2.default.array,
  renderTile: _propTypes2.default.func,
  rows: _propTypes2.default.number,
  scale: _propTypes2.default.number,
  src: _propTypes2.default.string,
  style: _propTypes2.default.object,
  tileSize: _propTypes2.default.number
}, _class.defaultProps = {
  columns: 16,
  layers: [],
  renderTile: function renderTile(tile, src, styles) {
    return _react2.default.createElement('img', { style: styles, src: src });
  },
  rows: 9,
  src: '',
  tileSize: 64
}, _class.contextTypes = {
  scale: _propTypes2.default.number
}, _temp);
exports.default = TileMap;