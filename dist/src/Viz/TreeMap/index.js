"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style/main.scss");

var _D3Component2 = _interopRequireDefault(require("../D3Component"));

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
    _this.updateChart = _this.updateChart.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(_default, [{
    key: "initializeChart",
    value: function initializeChart() {
      var svg = d3.select(this.svg).html("");
      svg.selectAll("*").remove();
      var //width = svg.node().getBoundingClientRect().width,
      height = this.props.height || svg.node().getBoundingClientRect().height;
      svg.attr("height", height); // svg.on("resize", this.redrawChart)
    }
  }, {
    key: "updateChart",
    value: function updateChart() {
      var _this2 = this;

      var svg = d3.select(this.svg);
      var width = svg.node().getBoundingClientRect().width,
          height = this.props.height || svg.node().getBoundingClientRect().height;
      svg.attr("height", height);
      var h = d3.hierarchy({
        "children": this.props.items
      });
      var treemap = d3.treemap().size([width, height]).padding(2);
      treemap(h.sum(function (d) {
        return d.count;
      }).sort(function (a, b) {
        return a.height - b.height || b.count - a.count;
      })).descendants(); // function color() { return "gray" }

      var isHighlighted = function isHighlighted(item) {
        var itemData = item.data;

        if (!_this2.props.selections || _this2.props.selections.length < 1) {
          return false;
        }

        if (itemData.id === _this2.props.selections[0].id) {
          return true;
        }

        ;
        return false;
      };

      var t = svg.transition().duration(500).ease(d3.easeQuad);
      svg.selectAll("rect").data(h.leaves()).join(function (enter) {
        return enter.append("rect").classed("program", true).classed("highlighted", isHighlighted).attr("id", function (d) {
          return d.id;
        }).call(function (enter) {
          return enter.attr("x", function (d) {
            return d.x0;
          }).attr("y", function (d) {
            return d.y0;
          }).attr("width", function (d) {
            return d.x1 - d.x0;
          }).attr("height", function (d) {
            return d.y1 - d.y0;
          });
        });
      } // .on("click", d => {
      //     if (d.data.id in this.props.itemDict) {
      //         return this.props.clickCallback(d)
      //     }
      // })
      , function (update) {
        return update.classed("highlighted", isHighlighted).attr("id", function (d) {
          return d.id;
        }).call(function (update) {
          return update.transition(t).attr("x", function (d) {
            return d.x0;
          }).attr("y", function (d) {
            return d.y0;
          }).attr("width", function (d) {
            return d.x1 - d.x0;
          }).attr("height", function (d) {
            return d.y1 - d.y0;
          });
        });
      }, function (exit) {
        return exit.remove();
      }); // .on("click", d => {
      //     if (d.data.id in this.props.itemDict) {
      //         return this.props.clickCallback(d.data)
      //     }
      // })

      svg.selectAll("rect").on("mouseover", function (item) {
        return _this2.props.mouseInCallback(item.data);
      }).on("mouseout", function (item) {
        return _this2.props.mouseOutCallback(item.data);
      }).on("click", function (item) {
        return _this2.props.clickCallback(item.data);
      });
      d3.select(window).on("resize.treemap", this.redrawChart.bind(this));
    } // initializeChartOld() {
    //     const svg = d3.select(this.svg).html("");
    //     const width = svg.node().getBoundingClientRect().width,
    //         height = this.props.height || svg.node().getBoundingClientRect().height;
    //     svg.attr("height", height)
    //     const h = d3.hierarchy({ "children": this.props.items });
    //     var treemap = d3.treemap()
    //         .size([width, height])
    //         .padding(2);
    //     var nodes = treemap(h
    //         .sum(function (d) { return d.count; })
    //         .sort(function (a, b) { return a.height - b.height || b.count - a.count; })
    //     )
    //         .descendants();
    //     const isHighlighted = item => {
    //         const itemData = item.data;
    //         if (!this.props.selections || this.props.selections.length < 1) { return false }
    //         if (itemData.id === this.props.selections[0].id) { return true };
    //         return false
    //     }
    //     const t = svg.transition()
    //         .duration(1000)
    //         .ease(d3.easeCubic)
    //     var cell = svg.selectAll("rect.program")
    //         .data(h.leaves())
    //         .join(
    //             enter => enter
    //                 .append("rect")
    //                 .classed("highlighted", isHighlighted)
    //                 .attr("id", function (d) { return d.id; })
    //                 .attr("x", d => d.x0)
    //                 .attr("y", d => d.y0)
    //                 .attr("width", function (d) { return d.x1 - d.x0; })
    //                 .attr("height", function (d) { return d.y1 - d.y0; }),
    //         )
    //     svg.selectAll("rect")
    //         .on("mouseover", this.props.mouseInCallback || (() => { console.log("Default handler") }))
    //         .on("mouseout", this.props.mouseOutCallback || (() => { }))
    //         .on("click", item => {
    //             console.log("initial click");
    //             return this.props.clickCallback(item)
    //         });
    //     d3.select(window).on("resize", this.redrawChart)
    // }
    // updateChartOld() {
    //     const svg = d3.select(this.svg);
    //     svg.selectAll("rect")
    //         .classed("highlighted", d => {
    //             return d.data.id in this.props.itemDict
    //         })
    //         .on("click", d => {
    //             console.log("update click")
    //             if (d.data.id in this.props.itemDict) {
    //                 return this.props.clickCallback(d)
    //             }
    //         })
    // }

  }]);

  return _default;
}(_D3Component2.default);

exports.default = _default;

//# sourceMappingURL=index.js.map