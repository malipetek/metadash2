"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 
 * return a sorted array that's ready for use in a bar chart
 * group items beyond maxItems together as "other"
 * format each item as {label:number, value:number}
 * 
 * @param {*} obj 
 * @param {*} maxItems 
 */
function _default(obj, maxItems, valueField) {
  var keys = Object.keys(obj);
  keys = keys.sort(function (key1, key2) {
    return obj[key1][valueField] < obj[key2][valueField] ? 1 : -1;
  });
  return keys.map(function (v, i, arr) {
    var k = arr[i];
    return _objectSpread({}, obj[k]);
  }).slice(0, maxItems || 5);
}

//# sourceMappingURL=preprocess.js.map