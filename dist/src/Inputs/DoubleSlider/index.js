"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _jakekaraMetadash = _interopRequireDefault(require("@bit/jakekara.metadash.d3-component"));

require("./style/main.scss");

var d3 = _interopRequireWildcard(require("d3"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _default =
/*#__PURE__*/
function (_D3Component) {
  _inherits(_default, _D3Component);

  function _default(props) {
    var _this;

    _classCallCheck(this, _default);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, props)); // this.state = {
    //     handles: [],
    //     range: [{ value: props.min }, { value: props.max }],
    //     labels: [{ value: props.min }, { value: props.max }]
    // }

    _this.state = {
      margin: props.margin || {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      handles: [],
      range: [{
        value: props.min
      }, {
        value: props.max
      }],
      labels: [{
        value: props.min
      }, {
        value: props.max
      }]
    };
    _this.scale = _this.scale.bind(_assertThisInitialized(_this));
    _this.valueToX = _this.valueToX.bind(_assertThisInitialized(_this));
    _this.xToValue = _this.xToValue.bind(_assertThisInitialized(_this));
    _this.limitValue = _this.limitValue.bind(_assertThisInitialized(_this));
    _this.limitX = _this.limitX.bind(_assertThisInitialized(_this));
    _this.getHandleRange = _this.getHandleRange.bind(_assertThisInitialized(_this));
    _this.updateLabels = _this.updateLabels.bind(_assertThisInitialized(_this));
    _this.updateRange = _this.updateRange.bind(_assertThisInitialized(_this));
    _this.updateTrackHighlight = _this.updateTrackHighlight.bind(_assertThisInitialized(_this));
    _this.repositionHandles = _this.repositionHandles.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(_default, [{
    key: "scale",
    value: function scale() {
      return d3.scaleLinear().domain([this.props.min, this.props.max]) // .range([this.margin.left, this.width - this.margin.right]);
      .range([this.state.margin.left, this.width - this.state.margin.right]);
    }
  }, {
    key: "valueToX",
    value: function valueToX(val) {
      return this.scale()(val) - this.handleWidth / 2;
    }
  }, {
    key: "xToValue",
    value: function xToValue(x) {
      return this.scale().invert(x + this.handleWidth / 2);
    }
  }, {
    key: "limitValue",
    value: function limitValue(value) {
      return Math.max(this.props.min, Math.min(this.props.max, value));
    }
  }, {
    key: "limitX",
    value: function limitX(x) {
      return this.valueToX(this.limitValue(Math.round(this.xToValue(x))));
    }
  }, {
    key: "getHandleRange",
    value: function getHandleRange() {
      var range = [];
      d3.select(this.svg).select(".handle-layer").selectAll("image.handle-icon").each(function (d) {
        return range.push(d);
      });
      range = range.sort(function (a, b) {
        return a.value < b.value ? -1 : 1;
      });
      return range;
    }
  }, {
    key: "updateLabels",
    value: function updateLabels() {
      // this.setState({ labels: this.getHandleRange() });
      var handles = d3.select(this.svg).select(".handle-layer").selectAll(".handle");
      handles.each(function (d) {
        d3.select(this).select("text").text(d.value);
      });
    }
  }, {
    key: "updateRange",
    value: function updateRange() {
      var range = this.getHandleRange();
      this.props.updateSelections(range.map(function (x) {
        return x.value;
      })); // this.setState({ range })
    }
  }, {
    key: "updateTrackHighlight",
    value: function updateTrackHighlight() {
      var xValues = [];
      d3.select(this.svg).selectAll(".handle").each(function () {
        // console.log("Double slider handle iter", this)
        xValues.push(Number(d3.select(this).attr("x")));
      });
      d3.select(this.svg).select(".highlight").attr("x", d3.min(xValues) + this.handleWidth / 2).attr("width", d3.max(xValues) - d3.min(xValues));
    }
  }, {
    key: "updateChart",
    value: function updateChart() {}
  }, {
    key: "initializeChart",
    value: function initializeChart() {
      var _this2 = this;

      this.render();
      var svg = d3.select(this.svg);
      svg.selectAll("*").remove();
      svg.html("");

      try {
        this.svg.current.innerHTML = "";
      } catch (e) {}

      svg = d3.select(this.svg);
      var bbox = svg.node().getBoundingClientRect(),
          width = bbox.width,
          height = bbox.height,
          handleHeight = this.props.handleHeight || 17.151,
          handleWidth = this.props.handleWidth || 13,
          trackHeight = this.props.trackHeight || 6;
      var yCenter = this.state.margin.top + (height - this.state.margin.bottom) / 2;
      this.width = width;
      this.height = height;
      this.handleWidth = handleWidth; // this.yCenter = yCenter;

      this.setState({
        yCenter: yCenter
      });
      this.handleHeight = handleHeight; // for really narrow windows, put the label
      // top and center
      // let labelX, labelY, 
      // trackX, trackWidth;
      // // if (width < 300) {
      // labelX = el => width / 2 - d3.select(el).node().getBBox().width / 2;
      // // labelY = _ => 0;//yCenter + d3.select(el).node().getBBox().height * 0.25;
      // // labelY = el => yCenter + d3.select(el).node().getBBox().height * 0.25;
      // labelY = el => {
      //     this.setMargin({ top: d3.select(el).node().getBBox().height })
      //     // this.margin.top = d3.select(el).node().getBBox().height;
      //     // yCenter += 4;
      //     // this.setState({yCenter});
      //     return d3.select(el).node().getBBox().height;
      // }

      var trackX = function trackX(_) {
        return _this2.state.margin.left;
      },
          trackWidth = function trackWidth(_) {
        return width - _this2.state.margin.left - _this2.state.margin.right;
      }; // } else {
      //     this.setMargin({ left: 140 });
      //     // this.margin.left = 140;
      //     labelX = el => 145 + 10 - d3.select(el).node().getBBox().width - 2 * handleWidth
      //     labelY = el => yCenter + d3.select(el).node().getBBox().height * 0.25;
      //     trackX = _ => this.state.margin.left;
      //     trackWidth = _ => width - this.state.margin.left - this.state.margin.right;
      // }


      svg.attr("height", height + "px"); // // add label and position it
      // svg.append("text")
      //     .classed("track-label", true)
      //     .text(this.props.label || "Double Slider")
      //     .attr("x", function () { return labelX(this) })
      //     .attr("y", function () { return labelY(this) });
      // // .attr("x", function () { return (lpad + 10) - d3.select(this).node().getBBox().width - 2 * handleWidth })
      // // .attr("y", function () { return yCenter + d3.select(this).node().getBBox().height * 0.25 })

      svg.append("rect").classed("track", true).attr("x", function () {
        return trackX(this);
      }).attr("width", function () {
        return trackWidth(this);
      }) // .attr("x", this.state.margin.left)
      // .attr("width", width - this.state.margin.left - this.state.margin.right)
      .attr("y", yCenter - trackHeight / 2).attr("height", trackHeight); // add selected track highlight

      svg.append("rect").classed("highlight", true).attr("y", yCenter - trackHeight / 2).attr("height", trackHeight);

      function dragstarted(d) {
        d3.select(this).raise().classed("active", true);
      }

      var limitX = this.limitX,
          xToValue = this.xToValue,
          updateLabels = this.updateLabels;
      var updateTrackHighlight = this.updateTrackHighlight;

      function dragged(d) {
        d3.select(this).attr("x", limitX(d3.event.x));
        var yr = xToValue(limitX(d3.event.x));
        d3.select(this).attr("transform", function (x) {
          return "translate(".concat(limitX(d3.event.x), ",").concat(yCenter - handleHeight / 2, ")");
        });
        d3.select(this).attr("data-value", d.value = yr); // d3.select(this).select(".value-label").text(yr)

        updateLabels();
        updateTrackHighlight();
      }

      var updateRange = this.updateRange;

      function dragended(d) {
        d3.select(this).classed("active", false);
        updateRange();
      }

      var data = this.props.selections ? this.props.selections.map(function (x) {
        return {
          value: x
        };
      }) : [{
        value: this.props.min
      }, {
        value: this.props.max
      }];
      var handleLayer = svg.append("g").classed("handle-layer", true);
      var handleGroups = handleLayer.selectAll("g.handle").data(data).enter().append("g").classed("handle", true).attr("x", function (x) {
        return _this2.valueToX(x.value);
      }).attr("transform", function (x) {
        return "translate(".concat(_this2.valueToX(x.value), ",").concat(yCenter - handleHeight / 2, ")");
      }).call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));
      updateTrackHighlight();
      var svgString = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxNy4xNTEiIHZpZXdCb3g9IjAgMCAxMyAxNy4xNTEiPjxwYXRoIGQ9Ik0yNDAsNDQwVjQyOWgxMnYxMWwtNiw1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzOS41IC00MjguNSkiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2FhYSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+";
      handleGroups.append("image").classed("handle-icon", true).attr("xlink:href", "data:image/svg+xml;base64,".concat(svgString)).attr("x", 0).attr("y", 0).attr("width", handleWidth).attr("height", handleHeight);
      handleGroups.append("text").classed("value-label", true).text(function (d) {
        return d.value;
      }).attr("transform", function () {
        return "translate(".concat(handleWidth / 2 - d3.select(this).node().getBBox().width / 2, ",").concat(yCenter + handleHeight / 2 + 1, ")");
      });
      d3.select(window).on("resize.doubleslider" + this.props.label, this.redrawChart.bind(this));
    } // initializeChartOld() {
    //     const svg = d3.select(this.svg).html(""),
    //         bbox = svg.node().getBoundingClientRect(),
    //         width = bbox.width,
    //         height = bbox.height,
    //         handleHeight = this.props.handleHeight || 17.151,
    //         handleWidth = this.props.handleWidth || 13,
    //         trackHeight = this.props.trackHeight || 6,
    //         yCenter = this.margin.top + (height - this.margin.bottom) / 2;
    //     this.width = width;
    //     this.height = height;
    //     this.handleWidth = handleWidth;
    //     this.yCenter = yCenter;
    //     this.handleHeight = handleHeight;
    //     svg.attr("height", height + "px");
    //     const label = svg.append("text")
    //         .text(this.props.label || "Double Slider")
    //         .attr("x", function () { return 120 - d3.select(this).node().getBBox().width - 2 * handleWidth })
    //     label.attr("y", function () {
    //         return yCenter
    //             + d3.select(this).node().getBBox().height * 0.25
    //     })
    //     this.margin.left = 120;
    //     // this.margin.left = label.node().getBBox().width
    //     //     + label.node().getBBox().x
    //     //     + handleWidth;
    //     svg.append("rect")
    //         .classed("track", true)
    //         .attr("x", this.margin.left)
    //         .attr("width", width - this.margin.left - this.margin.right)
    //         .attr("y", yCenter - trackHeight / 2)
    //         .attr("height", trackHeight);
    //     // add selected tract
    //     const trackHighlight = svg.append("rect")
    //         .classed("highlight", true)
    //         .attr("y", yCenter - trackHeight / 2)
    //         .attr("height", trackHeight)
    //     function dragstarted(d) {
    //         d3.select(this).raise().classed("active", true)
    //             .transition().duration(250)//.ease(d3.easeQuadIn)
    //         // .attr("transform","skewX(10)")
    //         // .attr("height",handleHeight * 0.7)
    //         // .attr("y", yCenter - handleHeight * 0.7 / 2)
    //         // .attr("width",handleWidth * 0.7);
    //     }
    //     const limitX = this.limitX,
    //         xToValue = this.xToValue,
    //         // valueToX = this.valueToX,
    //         updateLabels = this.updateLabels;
    //     // range = this.state.range;
    //     const updateTrackHighlight = this.updateTrackHighlight;
    //     function dragged(d) {
    //         d3.select(this).attr("x", limitX(d3.event.x));
    //         const yr = xToValue(limitX(d3.event.x))
    //         d3.select(this)
    //             .attr("transform", x => `translate(${limitX(d3.event.x)},${yCenter - handleHeight / 2})`)
    //         d3.select(this).attr("data-value", d.value = yr);
    //         d3.select(this).select(".value-label").text(yr)
    //         updateLabels();
    //         // 
    //         // let xValues = [];
    //         // svg.selectAll(".handle")
    //         //     .each(function () {
    //         //         xValues.push(Number(d3.select(this).attr("x")));
    //         //     });
    //         // trackHighlight
    //         //     .attr("x", d3.min(xValues) + handleWidth / 2)
    //         //     .attr("width", d3.max(xValues) - d3.min(xValues))
    //         updateTrackHighlight();
    //     }
    //     const updateRange = this.updateRange;
    //     function dragended(d) {
    //         d3.select(this).classed("active", false)
    //         updateRange();
    //     }
    //     const handleLayer = svg.append("g")
    //         .classed("handle-layer", true);
    //     const data = this.props.selections ? this.props.selections.map(x => { return { value: x } }) : [{ value: this.props.min }, { value: this.props.max }];
    //     const handleGroups = handleLayer
    //         .selectAll("g.handle")
    //         .data(data)
    //         .enter()
    //         .append("g")
    //         .classed("handle", true)
    //         .attr("x", x => this.valueToX(x.value))
    //         .attr("transform", x => `translate(${this.valueToX(x.value)},${yCenter - handleHeight / 2})`)
    //         .call(d3.drag()
    //             .on("start", dragstarted)
    //             .on("drag", dragged)
    //             .on("end", dragended))
    //     const svgString = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxNy4xNTEiIHZpZXdCb3g9IjAgMCAxMyAxNy4xNTEiPjxwYXRoIGQ9Ik0yNDAsNDQwVjQyOWgxMnYxMWwtNiw1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzOS41IC00MjguNSkiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2FhYSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+";
    //     handleGroups.append("image")
    //         .classed("handle-icon", true)
    //         .attr("xlink:href", `data:image/svg+xml;base64,${svgString}`)
    //         .attr("x", 0)
    //         .attr("y", 0)
    //         .attr("width", handleWidth)
    //         .attr("height", handleHeight)
    //     // .attr("xlink:href", { sliderHandleIcon })
    //     // handleGroups.append("rect")
    //     //     .attr("width", handleWidth)
    //     //     .attr("height", handleHeight)
    //     // .attr("transform", x => `translate(${this.valueToX(x.value)},0)`)
    //     // .attr("y", yCenter - handleHeight / 2)
    //     // .attr("x", x => this.valueToX(x.value))
    //     // .attr("y", yCenter - handleHeight / 2)
    //     handleGroups.append("text")
    //         .classed("value-label", true)
    //         .text(d => d.value)
    //         .attr("transform", function () {
    //             return `translate(${
    //                 handleWidth / 2 - d3.select(this).node().getBBox().width / 2
    //                 },${
    //                 yCenter
    //                 + handleHeight / 2
    //                 + 1})`
    //         })
    //     d3.select(window).on("resize.doubleslider" + this.props.label, this.redrawChart.bind(this))
    //     // this.setState({ handles });
    // }
    // updateChartOld() { }

  }, {
    key: "repositionHandles",
    value: function repositionHandles(arr) {
      var _this3 = this;

      if (!arr) {
        arr = [this.props.min, this.props.max];
      } // if (arr.length !== 2) { return }


      var handleLayer = d3.select(this.svg).select(".handle-layer");
      handleLayer.selectAll(".handle").data(arr.map(function (x) {
        return {
          value: x
        };
      })).attr("x", function (x) {
        return _this3.valueToX(x.value);
      }).attr("transform", function (x) {
        return "translate(".concat(_this3.valueToX(x.value), ",").concat(_this3.state.yCenter - _this3.handleHeight / 2, ")");
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps, newData) {
      _get(_getPrototypeOf(_default.prototype), "componentDidUpdate", this).call(this);

      function legitArray(arr) {
        if (!arr) {
          return [-1, -1];
        }

        return arr;
      }

      var oldArr = legitArray(oldProps.selections),
          newArr = legitArray(this.props.selections);

      function arrsMatch(arr1, arr2) {
        if (arr1.length !== arr2.length) {
          return false;
        }

        ;

        for (var i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
            return false;
          }
        }

        return true;
      }

      if (!arrsMatch(oldArr, newArr)) {
        if (!this.props.selections) {
          // reset detected
          this.repositionHandles(this.props.selections);
          this.updateLabels();
          this.updateTrackHighlight();
        }
      } // this.repositionHandles(this.props.selections);
      // this.updateLabels();
      // this.updateTrackHighlight();

    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "DoubleSlider"
      }, _react.default.createElement("div", {
        className: "track-label"
      }, this.props.label), _react.default.createElement("div", {
        className: "track-wrapper"
      }, _jakekaraMetadash.default.prototype.render.call(this)));
    }
  }]);

  return _default;
}(_jakekaraMetadash.default);

exports.default = _default;

//# sourceMappingURL=index.js.map