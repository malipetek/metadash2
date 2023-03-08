"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactAutosuggest = _interopRequireDefault(require("react-autosuggest"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default =
/*#__PURE__*/
function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default(props) {
    var _this;

    _classCallCheck(this, _default);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event, _ref) {
      var newValue = _ref.newValue,
          method = _ref.method;

      var selections = _this.state.selections.slice();

      if (method === "click" || method === "enter") {
        selections.push(newValue);
      }

      _this.setState({
        value: newValue,
        selections: selections
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSuggestionsFetchRequested", function (_ref2) {
      var value = _ref2.value;

      _this.setState({
        suggestions: _this.getSuggestions(value)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSuggestionsClearRequested", function () {
      _this.setState({
        suggestions: []
      });
    });

    _this.state = {
      value: '',
      // items: props.items,
      suggestions: [],
      selections: []
    }; // react-autosuggest functions

    _this.getSuggestions = _this.getSuggestions.bind(_assertThisInitialized(_this));
    _this.getSuggestionValue = _this.getSuggestionValue.bind(_assertThisInitialized(_this));
    _this.renderSuggestion = _this.renderSuggestion.bind(_assertThisInitialized(_this));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.onSuggestionsClearRequested = _this.onSuggestionsClearRequested.bind(_assertThisInitialized(_this));
    _this.onSuggestionsFetchRequested = _this.onSuggestionsFetchRequested.bind(_assertThisInitialized(_this));
    _this.renderSectionTitle = _this.renderSectionTitle.bind(_assertThisInitialized(_this));
    return _this;
  } // Teach Autosuggest how to calculate suggestions for any given input value.


  _createClass(_default, [{
    key: "getSuggestions",
    value: function getSuggestions(value) {
      var inputValue = value.trim().toLowerCase();
      var inputLength = inputValue.length;
      var ret = inputLength === 0 ? [] : this.props.items.filter(function (item) {
        return item.label.toLowerCase().slice(0, inputLength) === inputValue;
      });
      return ret;
    }
  }, {
    key: "getSuggestionValue",
    value: function getSuggestionValue(suggestion) {
      return suggestion.value;
    }
  }, {
    key: "renderSuggestion",
    value: function renderSuggestion(suggestion) {
      return _react.default.createElement("div", null, suggestion.label);
    }
  }, {
    key: "renderSectionTitle",
    value: function renderSectionTitle(_) {
      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          suggestions = _this$state.suggestions,
          value = _this$state.value;
      var inputProps = {
        placeholder: 'Begin typing',
        value: value,
        onChange: this.onChange
      };
      return _react.default.createElement("div", null, _react.default.createElement("div", null, this.state.selections.map(function (item) {
        return _react.default.createElement("div", null, item);
      })), _react.default.createElement(_reactAutosuggest.default, {
        suggestions: suggestions,
        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
        getSuggestionValue: this.getSuggestionValue,
        renderSuggestion: this.renderSuggestion,
        inputProps: inputProps
      }));
    }
  }]);

  return _default;
}(_react.default.Component);

exports.default = _default;

//# sourceMappingURL=index.js.map