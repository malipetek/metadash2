"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _default =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(_default, _React$PureComponent);

  function _default(props) {
    var _this;

    _classCallCheck(this, _default);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, props));
    _this.svg = _react.default.createRef();
    _this.initializeChart = _this.initializeChart.bind(_assertThisInitialized(_this));
    _this.updateChart = _this.updateChart.bind(_assertThisInitialized(_this));
    _this.redrawChart = _this.redrawChart.bind(_assertThisInitialized(_this));
    _this.setMargin = _this.setMargin.bind(_assertThisInitialized(_this));
    _this.state = {
      currentWidth: -1,
      margin: props.margin || {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    };
    _this.margin = props.margin || {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
    return _this;
  }

  _createClass(_default, [{
    key: "setMargin",
    value: function setMargin(newMargin) {
      var margin = _objectSpread({}, this.state.margin, {}, newMargin);

      this.setState({
        margin: margin
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateChart(this.props.data);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initializeChart();
      this.updateChart();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "Viz"
      }, _react.default.createElement("div", null), _react.default.createElement("svg", {
        ref: function ref(elem) {
          _this2.svg = elem;
        }
      }));
    }
  }, {
    key: "redrawChart",
    value: function redrawChart() {
      var _this3 = this;

      // prevent redraw if the width hasn't changed
      var newWidth = window.document.body.getBoundingClientRect().width;

      if (newWidth === this.state.currentWidth) {
        return;
      }

      ;
      this.setState({
        currentWidth: newWidth
      }); // only redraw at max once per second

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        _this3.initializeChart();

        _this3.updateChart();
      }, 1000);
    } // Override this 

  }, {
    key: "initializeChart",
    value: function initializeChart() {} // Override this

  }, {
    key: "updateChart",
    value: function updateChart(data) {}
  }]);

  return _default;
}(_react.default.PureComponent);

exports.default = _default;

//# sourceMappingURL=index.js.map