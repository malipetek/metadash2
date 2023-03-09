"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TagPoolItem = _interopRequireDefault(require("./TagPoolItem"));

require("./style/main.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default(props) {
    var _this;

    _classCallCheck(this, _default);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, props));
    _this.trackScrolling = _this.trackScrolling.bind(_assertThisInitialized(_this));
    _this.poolRef = _react.default.createRef();
    _this.state = {
      itemCount: 100,
      increment: 50
    };
    return _this;
  }

  _createClass(_default, [{
    key: "trackScrolling",
    value: function trackScrolling() {
      // this adds lazy loading in 100-item increments
      if (this.state.itemCount >= this.props.items) {
        return;
      }

      var scrollTop = this.poolRef.current.scrollTop,
          scrollBottom = scrollTop + this.poolRef.current.getBoundingClientRect().height,
          totalHeight = this.poolRef.current.getBoundingClientRect().height,
          //   startPct = scrollTop / totalHeight,
      endPct = scrollBottom / totalHeight;

      if (endPct * 100 > 80) {
        var itemCount = this.state.itemCount + this.state.increment;
        this.setState({
          itemCount: itemCount
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.poolRef.current.addEventListener("scroll", this.trackScrolling);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.poolRef.current.removeEventListener("scroll", this.trackScrolling);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        ref: this.poolRef,
        className: "TagPool"
      }, (this.props.items.slice(0, this.state.itemCount) || []).map(function (item, i) {
        return _react.default.createElement(_TagPoolItem.default, {
          callback: _this2.props.callback || function () {},
          key: i,
          item: item
        });
      }));
    }
  }]);

  return _default;
}(_react.default.Component);

exports.default = _default;

//# sourceMappingURL=index.js.map