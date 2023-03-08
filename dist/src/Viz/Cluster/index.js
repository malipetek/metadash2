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

// import { objectToArray } from '../../MetaDash/Common';
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
      var //width = svg.node().getBoundingClientRect().width,
      height = this.props.height || svg.node().getBoundingClientRect().height;
      svg.attr("height", height + "px"); // svg.attr("width", width + "px");
      // svg.on("resize", ()=>super.redrawChart.call(this));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      this.updateChart(prevProps, prevState);
    }
  }, {
    key: "updateChart",
    value: function updateChart(prevProps, prevState) {
      var _this2 = this;

      var svg = d3.select(this.svg);
      var width = svg.node().getBoundingClientRect().width,
          height = Math.min(width, this.props.height || svg.node().getBoundingClientRect().height);
      svg.attr("height", height + "px");
      var items = this.props.items; // change this to props.allItems if you want to preserve each node's circle element
      // which is cooler, but expensive
      // let allItems = this.props.items;
      //--------------HACK--------------
      // TODO - Fix this q-a-d hack to prevent redrawing if the data have not changed
      //        Get rid of this whole block....

      function allItemsMatch(arr1, arr2) {
        if (arr1.length !== arr2.length) {
          return false;
        }

        for (var i = 0; i < arr1.length; i++) {
          if (arr1[i].id !== arr2[i].id) {
            return false;
          }

          if (arr1[i].count !== arr2[i].count) {
            return false;
          }
        }

        return true;
      }

      if (allItemsMatch( // this works, but do I really have to loop this each time?
      // objectToArray((prevProps || {}).itemDict || {}),
      // objectToArray(this.props.itemDict)
      // this seems to be working just as well without the two loops
      (prevProps || {
        items: []
      }).items, this.props.items)) {
        // console.log("redraw prevented")
        // objectToArray(this.props.itemDict))) {
        return;
      } // ... down to here.
      //----------END OF HACK-----------


      var root = d3.stratify().id(function (d) {
        return d.label.split("|")[0];
      }).parentId(function (d) {
        return d.label.split("|")[1];
      })(items);
      var packLayout = d3.pack().padding(0.725).size([width, height]);
      root.sum(function (d) {
        return Number(d.count ? d.count : 0);
      });
      var data = root.descendants() // .filter(d => d.data.label.indexOf("root") < 0)
      .filter(function (d) {
        return d.data.label.indexOf("|country") < 0;
      }).filter(function (d) {
        return d.data.label.indexOf("country|") < 0;
      });
      packLayout(root);
      svg.selectAll("circle.city"); //.transition();
      // const t = d3.transition().duration(1100);

      this.allowInteraction = data.length; // let nodes = 
      // function realChange(newRadius, oldRadius) {
      //     return (newRadius > 0) && (oldRadius > 0);
      // };

      var r = function r(d) {
        return d.r || 0;
      };

      var x = function x(d) {
        return d.x || 0;
      };

      var y = function y(d) {
        return d.y || 0;
      };

      svg.selectAll('circle.city').data(data).join(function (enter) {
        return enter.append('circle') // .classed("city", d => d.data.label.indexOf("|country") < 0)
        // .classed("country", d => d.data.label.indexOf(",") === 0)
        .classed("city", true).on("mouseover", function (d) {
          return _this2.props.onMouseOver(d.data);
        }).on("mouseout", function (d) {
          return _this2.props.onMouseOut(d.data);
        }).on("click", function (d) {
          if (_this2.props.selections && _this2.props.selections.length === 1 && _this2.props.selections[0].id === d.data.id) {
            _this2.props.updateSelections([]);
          } else {
            _this2.props.updateSelections([d.data]);
          }
        }).attr('cx', x).attr('cy', y).attr('r', r);
      }, function (update) {
        return update.attr("data-city", function (d) {
          return d.data.label;
        }).each(function (d, i) {
          var handle = d3.select(this).style("opacity", "0.5");
          var newRadius = r(d);
          var currentRadius = d3.select(this).attr("r") || 0;

          if (newRadius > 0 && currentRadius > 0 && currentRadius !== newRadius) {
            // console.log("Animating")
            handle = handle.transition().duration(1000 * Math.random());
          } else {//console.log("Skipping animation")
          }

          handle.style("opacity", "1").attr('cx', x).attr('cy', y).attr('r', r);
        });
      }, // .call(update => {
      //     update
      //     .transition(t)
      //         .transition(function (d) {
      //             console.log("Should I transition?",d)
      //             // only transition if 
      //             if (r(d) <= 0) { return null }
      //             return realChange(r(d), d3.select(this).attr("r") || 0) ? t: null
      //         })
      //         .attr('cx', x)
      //         .attr('cy', y)
      //         .attr('r', r);
      // }),
      function (exit) {
        return exit.remove();
      } // exit=>exit
      // .call(exit=>
      //     exit.transition().duration(1000)
      //     .attr('r', 0)
      // )
      );
      d3.select(window).on("resize.cluster", this.redrawChart.bind(this));
    }
  }, {
    key: "newMethod",
    value: function newMethod(handle, t) {
      handle = handle.transition(t);
      return handle;
    }
  }]);

  return _default;
}(_D3Component2.default);

exports.default = _default;

//# sourceMappingURL=index.js.map