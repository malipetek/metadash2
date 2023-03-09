"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style/main.scss");

var _jakekaraMetadash = _interopRequireDefault(require("@bit/jakekara.metadash.d3-component"));

var _numeral = _interopRequireDefault(require("numeral"));

var d3 = _interopRequireWildcard(require("d3"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
function (_D3Component) {
  _inherits(_default, _D3Component);

  function _default(props) {
    var _this;

    _classCallCheck(this, _default);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, props));
    _this.initializeChart = _this.initializeChart.bind(_assertThisInitialized(_this));
    _this.updateChart = _this.updateChart.bind(_assertThisInitialized(_this)); // this.setRange = this.setRange.bind(this);

    return _this;
  }

  _createClass(_default, [{
    key: "initializeChart",
    value: function initializeChart() {
      var svg = d3.select(this.svg).html("");
      svg.selectAll("*").remove();
      this.xAxisG = svg.append("g").classed("axis", true).classed("x", true);
      this.yAxisG = svg.append("g").classed("axis", true).classed("y", true);
      this.barG = svg.append("g");
    }
  }, {
    key: "updateChart",
    value: function updateChart(data) {
      data = data || this.props.data;
      var svg = d3.select(this.svg); // get width and height

      var width = svg.node().getBoundingClientRect().width,
          height = this.props.height || svg.node().getBoundingClientRect().height; // svg.attr("height", height + "px")
      // .attr("width", width + "px");
      // const yearRange = d3.extent(this.props.data.map(x => x.label))

      var yearRange = [this.props.minYear, this.props.maxYear];
      var countRange = [0, d3.max(data.map(function (x) {
        return x.count;
      })) || 1]; // const margin = this.props.margin || {
      //     bottom: 30,
      //     top: 20,
      //     left: 20,
      //     right: 20
      // }

      var margin = this.state.margin; // add axes

      var xScale = d3.scaleBand().domain(d3.range.apply(d3, yearRange)).padding(0.5).rangeRound([margin.left, width - margin.right]);
      var tickSteps = width > 600 ? 10 : 40;
      var tickValues = d3.range(this.props.minYear, this.props.maxYear, tickSteps);
      var xAxis = d3.axisBottom(xScale).tickFormat(function (e) {
        return (0, _numeral.default)(e).format("0");
      }).tickValues(tickValues);
      this.xAxisG.attr("transform", "translate(".concat(0, ",", height - margin.bottom, ")")).call(xAxis);
      var yScale = d3.scaleLinear().domain(countRange).rangeRound([height - margin.bottom, margin.top]);
      var yAxis = d3.axisLeft(yScale).tickSizeOuter(0) // .tickSize(width - margin.left - margin.right)
      .ticks(height / 20).tickFormat(function (e) {
        return Math.floor(e) === e ? e : undefined;
      });
      var ty = d3.transition().duration(1000).ease(d3.easeQuadIn);
      this.yAxisG.attr("transform", "translate(".concat(margin.left, ",", 0, ")")).transition(ty).call(yAxis);

      var t = function t(i) {
        return svg.transition().duration(1000).ease(d3.easeCubic);
      };

      this.barG.selectAll(".bar").data(data).join(function (enter, i) {
        return enter.append("rect").attr("class", function (d) {
          return d.barClass;
        }).classed("bar", true).attr("data-enter-value", function (d) {
          return d.count;
        }).attr("data-label", function (d) {
          return d.label;
        }).attr("y", function (d) {
          return yScale(0);
        }).attr("width", xScale.bandwidth).attr("x", function (d) {
          return xScale(d.label);
        }).call(function (enter) {
          return enter.transition(null).attr("y", function (d) {
            return yScale(d.count || 0);
          }).attr("height", function (d) {
            return yScale(0) - yScale(d.count || 0);
          }).attr("width", xScale.bandwidth);
        });
      }, function (update) {
        return update.attr("data-update-value", function (d) {
          return d.count;
        }).attr("class", function (d) {
          return d.barClass;
        }).classed("bar", true).attr("x", function (d) {
          return xScale(d.label);
        }).call(function (update) {
          return update.transition(t(1000)).attr("y", function (d) {
            return yScale(d.count || 0);
          }).attr("height", function (d) {
            return yScale(0) - yScale(d.count || 0);
          });
        });
      }, function (exit) {
        return exit.attr("data-exit-value", function (d) {
          return d.count;
        }) // .attr("class",d=>d.barClass)
        .attr("x", function (d) {
          return xScale(d.label);
        }).call(function (exit) {
          return exit.transition(t(100)).attr("height", 0).attr("y", function () {
            return yScale(0);
          });
        });
      });
      d3.select(window).on("resize.histogram", this.redrawChart.bind(this)); // d3.select(window).on("resize", this.redrawChart)
    }
  }]);

  return _default;
}(_jakekaraMetadash.default);

exports.default = _default;

//# sourceMappingURL=index.js.map