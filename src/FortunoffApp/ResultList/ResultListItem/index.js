"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapResultListItem;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapResultListItem(WrappedComponent, key) {
  return _react.default.createElement("div", {
    key: key,
    className: "ResultListItem"
  }, WrappedComponent); // return class extends React.Component {
  //     render(){return (
  //         <div className="ResultListItem">
  //         </div>
  //     )}
  // }
}

//# sourceMappingURL=index.js.map