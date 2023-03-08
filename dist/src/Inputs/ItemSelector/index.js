"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./style/main.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
    _this.handleSelection = _this.handleSelection.bind(_assertThisInitialized(_this));
    _this.clearSelection = _this.clearSelection.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(_default, [{
    key: "handleSelection",
    value: function handleSelection(item) {
      this.props.updateSelections(this.props.items.filter(function (i) {
        return i.id === item.target.value;
      }));
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      this.props.updateSelections([]);
    }
  }, {
    key: "render",
    value: function render() {
      var selected = this.props.selections && this.props.selections.length === 1 ? this.props.selections[0] : {
        id: "ALL"
      }; // const clearButtonText = selected.id === "ALL" ? "" : "╳"

      var subClass = selected.id === "ALL" ? "arrow" : "x"; // const active = selected.id !== "ALL"

      var buttonClass = "clear-button";
      buttonClass = "dropdown-icon " + subClass;

      if (selected.id !== "ALL") {
        buttonClass += " enabled";
      }

      return _react.default.createElement("div", {
        className: "ItemSelector"
      }, _react.default.createElement("select", {
        className: subClass + " dropdown-icon",
        defaultValue: selected.ID,
        onChange: this.handleSelection
      }, _react.default.createElement("option", {
        onClick: this.clearSelection,
        value: "all"
      }, this.props.placeholder || "All items"), this.props.items.map(function (item, i) {
        var optionProps = {
          // selected: selected.id === item.id,
          value: item.id
        };
        return _react.default.createElement("option", _extends({
          key: i
        }, optionProps), item.label);
      })), _react.default.createElement("div", {
        className: "button " + buttonClass,
        onClick: this.clearSelection
      }));
    }
  }]);

  return _default;
}(_react.default.Component);

exports.default = _default;

//# sourceMappingURL=index.js.map