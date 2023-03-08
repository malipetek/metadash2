"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./style/main.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var yaleLogoImgData = "iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABGdBTUEAALGOGCHvlwAAA/5JREFUaAXtmP1x2kAQxeNM/o9KUCoIHVjugFQQpQKTChRXgFMBpALcgZQKIBWIDkwHzu+JO3tHn2CQR4P1Zp52b3dv7/ZWEhqunp6ePrwnfHxPxarWseBL7/jY4bHDF3YC4y19YQ2tlDN2uHIkF2YYO3xhDa2UM3a4ciQXZhg7fGENrZTzqWIZjiFiK9dQMoN38GRcDegfj4BqbmHkiCiw4XoDd/vhaVc9wynU/zxdjIgpo2uOch8KFSyUC3uosRWBr7qowzCEc1jGCsMEKqaJAb4YPkJBcgZlb5rTZbd7SU7IU1nHv6W3nNZPR3twsm+soUZXR9QFD91+91D21+KUua1r+oJ9kDaa+QFyBkMzblLnOAL4C27gYFEuWBv9UdrtojQuDycYYriFd3DQqCt4y47vza4jdLEJ6q5QPqi9dWDXuoK1RXVqZ/ba1OUpMRF8gBkcPJo+PFSsXmK+0BA9hktooe4qtqu7E2Ii+Bn+gxnUvHMiJJnW+Qr/wq0jwqDjlZ/i99DPjf2pSZxDP0GV17+zTZG54xrpoVwxbJqX+ECk9KY42SOYQuVcOSIKpFwn8Hn+s2KNRlewRcJAcwKoBdZuXJdngU/QJrx/Vlj2F81XHu+zMtmHFFfp1mf12MVpHzbXhLHyC5IhLObZyU36XLMMNHnhxhGybp4tTIvbmNzNlYih9Xk9kdMhQXq7lVMfgAxrYuy+F95vEzTpAcH+tFCL20dyAevm2Pi8JibF5pGg1OWQ3SNBqYvJXcCqwR85v0QOixxNLy3zlBcvF/sCi3DqhSNbE77hyJqcZ7DH5AhdHr2o6r7ZA+eXCL1+SMGKXcJbqOTCEqroOsie1TnOaLs2uX6jb8y4VT20YCWxBVq9dYGSM2QsnorQJFCxmRm3qscU3JqoxRngm0LdIdLPgei1SZq+tF6bz85TkSv4CL9DPfNf4BaeE+ExyfrqcM4m/EZu0DN4TmQki1xCPc9Lp3eKPjocsWroVt4hM6efU2xMshj94Eelj4LtG1QF94E/paR6dNow885jCranGPkEHTLEL3ooR+gHSJszNvYudUPA0gRF6GsoaREy0GHoHbJfy3+BtEh9sSxgGfrCka/4gjEyLAXqKy2BC5jCObRYM8ih7MqlLzXZPKTLVl5HthSWkWNIoc+xQn+eX05ix8QdjJRIOzdm/GhmS0+gFhb9ZlCLuBlS861dPoucgV3D65orXxnKNYU+rpB9/i+tW2gCBd2Cu0J7ucgXwDrfS9Thms+nGY05+yz48K2+YeQxL6033FZ/S40F93e2w8g8dngYfehvF2OH+zvbYWQeOzyMPvS3i7HD/Z3tMDKPHR5GH/rbxdjh/s52GJnfXYf/Ax099yeWp4N/AAAAAElFTkSuQmCC";

var YaleLogoImage = function YaleLogoImage() {
  return _react.default.createElement("image", {
    x: "0",
    y: "0",
    width: "42",
    height: "42",
    href: "data:image/jpeg;base64,".concat(yaleLogoImgData)
  });
};

var YaleLogoSVG = function YaleLogoSVG() {
  return _react.default.createElement("svg", {
    width: "41px",
    height: "19px",
    viewBox: "0 0 41 19",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, _react.default.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, _react.default.createElement("g", {
    transform: "translate(-26.000000, -31.000000)"
  }, _react.default.createElement("g", {
    transform: "translate(26.000000, 20.000000)"
  }, _react.default.createElement(YaleLogoImage, null)))));
};

var FortunoffTitleSVG = function FortunoffTitleSVG() {
  return _react.default.createElement("svg", {
    width: "218px",
    height: "40px",
    viewBox: "0 0 218 40",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, _react.default.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd",
    fontFamily: "YaleNew-Roman, YaleNew",
    fontSize: "19",
    fontWeight: "normal",
    "line-spacing": "24"
  }, _react.default.createElement("g", {
    transform: "translate(-121.000000, -23.000000)",
    fill: "#1098AB"
  }, _react.default.createElement("text", null, _react.default.createElement("tspan", {
    x: "121",
    y: "38"
  }, "Fortunoff Video Archive"), _react.default.createElement("tspan", {
    x: "121",
    y: "62"
  }, "for Holocaust Testimonies")))));
};

var _default =
/*#__PURE__*/
function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default() {
    _classCallCheck(this, _default);

    return _possibleConstructorReturn(this, _getPrototypeOf(_default).apply(this, arguments));
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("header", {
        className: "SiteBanner"
      }, _react.default.createElement("div", {
        className: "site-logo"
      }, _react.default.createElement("a", {
        alt: "Yale University Library",
        href: "https://web.library.yale.edu/"
      }, _react.default.createElement(YaleLogoSVG, null))), _react.default.createElement("div", {
        className: "site-title"
      }, _react.default.createElement("a", {
        alt: "Fortunoff Video Archive for Holocaust Testimonies",
        href: "https://fortunoff.library.yale.edu/"
      }, _react.default.createElement(FortunoffTitleSVG, null))));
    }
  }]);

  return _default;
}(_react.default.Component);

exports.default = _default;

//# sourceMappingURL=index.js.map