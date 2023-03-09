"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TextInput = _interopRequireDefault(require("../TextInput"));

var _SelectionPool = _interopRequireDefault(require("../SelectionPool"));

var _TagPool = _interopRequireDefault(require("./TagPool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
    _this.state = {
      searchTerm: ''
    };
    _this.updateSearchTerm = _this.updateSearchTerm.bind(_assertThisInitialized(_this));
    _this.addSelection = _this.addSelection.bind(_assertThisInitialized(_this));
    _this.dropSelectionByID = _this.dropSelectionByID.bind(_assertThisInitialized(_this));
    _this.dropSelection = _this.dropSelection.bind(_assertThisInitialized(_this));
    _this.updateSelections = _this.updateSelections.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(_default, [{
    key: "updateSelections",
    value: function updateSelections(newSelections) {
      this.props.updateSelections(newSelections);
      this.setState({
        searchTerm: ""
      });
    }
  }, {
    key: "updateSearchTerm",
    value: function updateSearchTerm(t) {
      this.setState({
        searchTerm: t
      });
    }
  }, {
    key: "addSelection",
    value: function addSelection(selectionItem) {
      // don't add a duplicate
      var newSelections = _toConsumableArray(this.props.selections);

      if (newSelections.filter(function (a) {
        return a.id === selectionItem.id;
      }).length > 0) {
        return;
      }

      newSelections = [].concat(_toConsumableArray(newSelections), [selectionItem]);
      this.updateSelections(newSelections, this.state.searchTerm);
    }
  }, {
    key: "dropSelectionByID",
    value: function dropSelectionByID(dropID) {
      var newSelections = _toConsumableArray(this.props.selections);

      newSelections = newSelections.filter(function (a) {
        var ret = String(a.id) !== String(dropID);
        return ret;
      });
      this.updateSelections(newSelections, this.state.searchTerm);
    }
  }, {
    key: "dropSelection",
    value: function dropSelection(item) {
      this.dropSelectionByID(item.id);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // return (null);
      //const items = this.props.getItems(this.props.selections, this.state.searchTerm.split(""))
      var items = this.props.filterItems(this.state.searchTerm.split(" ")).filter(function (i) {
        return i.id in _this2.props.allItems;
      });
      return _react.default.createElement("div", {
        className: "TagFilter"
      }, _react.default.createElement("div", {
        className: "top-area"
      }, _react.default.createElement("div", {
        className: "type-area"
      }, _react.default.createElement("div", {
        className: "title-area"
      }, this.props.title), _react.default.createElement(_TextInput.default, {
        callback: this.updateSearchTerm,
        placeholder: this.props.placeholder,
        value: this.state.searchTerm
      })), _react.default.createElement(_SelectionPool.default, {
        callback: this.dropSelection,
        items: this.props.selections
      })), _react.default.createElement(_TagPool.default, {
        callback: this.addSelection,
        items: items || [] // items={this.state.poolItems || []}

      }));
    }
  }]);

  return _default;
}(_react.default.Component);

exports.default = _default;

//# sourceMappingURL=index.js.map