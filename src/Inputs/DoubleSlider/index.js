import React from 'react';
//import D3Component from "../../Viz/D3Component"
import D3Component from "../../Viz/D3Component";
import "./style/main.scss";
import * as d3 from "d3";

export default class extends D3Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     handles: [],
        //     range: [{ value: props.min }, { value: props.max }],
        //     labels: [{ value: props.min }, { value: props.max }]
        // }
        this.state ={
            margin: props.margin || {
                top:0,
                left:0,
                right:0,
                bottom:0
            },
            handles: [],
            range: [{ value: props.min }, { value: props.max }],
            labels: [{ value: props.min }, { value: props.max }]
        };

        this.scale = this.scale.bind(this);
        this.valueToX = this.valueToX.bind(this);
        this.xToValue = this.xToValue.bind(this);
        this.limitValue = this.limitValue.bind(this);
        this.limitX = this.limitX.bind(this);
        this.getHandleRange = this.getHandleRange.bind(this);
        this.updateLabels = this.updateLabels.bind(this);
        this.updateRange = this.updateRange.bind(this);
        this.updateTrackHighlight = this.updateTrackHighlight.bind(this);

        this.repositionHandles = this.repositionHandles.bind(this);

    }

    scale() {
        return d3.scaleLinear()
            .domain([this.props.min, this.props.max])
            // .range([this.margin.left, this.width - this.margin.right]);
            .range([this.state.margin.left, this.width - this.state.margin.right]);

    }

    valueToX(val) {
        return this.scale()(val) - this.handleWidth / 2;
    }

    xToValue(x) {
        return this.scale().invert(x + this.handleWidth / 2);
    }

    limitValue(value) {
        return Math.max(this.props.min, Math.min(this.props.max, value));
    }

    limitX(x) {
        return this.valueToX(this.limitValue(Math.round(this.xToValue(x))));
    }

    getHandleRange() {
        let range = [];
        d3.select(this.svg)
            .select(".handle-layer")
            .selectAll("image.handle-icon")
            .each(d => range.push(d))

        range = range.sort((a, b) => { return a.value < b.value ? -1 : 1 })
        return range;
    }

    updateLabels() {
        // this.setState({ labels: this.getHandleRange() });
        const handles = d3.select(this.svg).select(".handle-layer").selectAll(".handle");

        handles.each(function (d) {
            d3.select(this).select("text").text(d.value)
        })

    }

    updateRange() {
        let range = this.getHandleRange();
        this.props.updateSelections(range.map(x => x.value))
        // this.setState({ range })
    }

    updateTrackHighlight() {

        let xValues = [];

        d3.select(this.svg).selectAll(".handle")
            .each(function () {
                // console.log("Double slider handle iter", this)
                xValues.push(Number(d3.select(this).attr("x")));
            });

        d3.select(this.svg).select(".highlight")
            .attr("x", d3.min(xValues) + this.handleWidth / 2)
            .attr("width", d3.max(xValues) - d3.min(xValues))

    }

    updateChart() { }

    initializeChart() {

        this.render();

        let svg = d3.select(this.svg)
        svg.selectAll("*").remove();
        svg.html("")

        try {
            this.svg.current.innerHTML = "";
        } catch (e) { }

        svg = d3.select(this.svg)

        const
            bbox = svg.node().getBoundingClientRect(),
            width = bbox.width,
            height = bbox.height,
            handleHeight = this.props.handleHeight || 17.151,
            handleWidth = this.props.handleWidth || 13,
            trackHeight = this.props.trackHeight || 6;

        let yCenter = this.state.margin.top + (height - this.state.margin.bottom) / 2;

        this.width = width;
        this.height = height;
        this.handleWidth = handleWidth;
        // this.yCenter = yCenter;
        this.setState({ yCenter })
        this.handleHeight = handleHeight;

        // for really narrow windows, put the label
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
        let trackX = _ => this.state.margin.left,
        trackWidth = _ => width - this.state.margin.left - this.state.margin.right;

        // } else {
        //     this.setMargin({ left: 140 });
        //     // this.margin.left = 140;
        //     labelX = el => 145 + 10 - d3.select(el).node().getBBox().width - 2 * handleWidth
        //     labelY = el => yCenter + d3.select(el).node().getBBox().height * 0.25;
        //     trackX = _ => this.state.margin.left;
        //     trackWidth = _ => width - this.state.margin.left - this.state.margin.right;


        // }

        svg.attr("height", height + "px");

        // // add label and position it
        // svg.append("text")
        //     .classed("track-label", true)
        //     .text(this.props.label || "Double Slider")
        //     .attr("x", function () { return labelX(this) })
        //     .attr("y", function () { return labelY(this) });
        // // .attr("x", function () { return (lpad + 10) - d3.select(this).node().getBBox().width - 2 * handleWidth })
        // // .attr("y", function () { return yCenter + d3.select(this).node().getBBox().height * 0.25 })

        svg.append("rect")
            .classed("track", true)
            .attr("x", function () { return trackX(this) })
            .attr("width", function () { return trackWidth(this) })

            // .attr("x", this.state.margin.left)
            // .attr("width", width - this.state.margin.left - this.state.margin.right)
            .attr("y", yCenter - trackHeight / 2)
            .attr("height", trackHeight);

        // add selected track highlight
        svg.append("rect")
            .classed("highlight", true)
            .attr("y", yCenter - trackHeight / 2)
            .attr("height", trackHeight)

        function dragstarted(d) {
            d3.select(this).raise().classed("active", true)
        }

        const limitX = this.limitX,
            xToValue = this.xToValue,
            updateLabels = this.updateLabels;

        const updateTrackHighlight = this.updateTrackHighlight;

        function dragged(d) {
            d3.select(this).attr("x", limitX(d3.event.x));
            const yr = xToValue(limitX(d3.event.x))
            d3.select(this)
                .attr("transform", x => `translate(${limitX(d3.event.x)},${yCenter - handleHeight / 2})`)

            d3.select(this).attr("data-value", d.value = yr);
            // d3.select(this).select(".value-label").text(yr)
            updateLabels();
            updateTrackHighlight();
        }

        const updateRange = this.updateRange;

        function dragended(d) {
            d3.select(this).classed("active", false)
            updateRange();
        }

        const data = this.props.selections ? this.props.selections.map(x => { return { value: x } }) : [{ value: this.props.min }, { value: this.props.max }];

        const handleLayer = svg.append("g")
            .classed("handle-layer", true);

        const handleGroups = handleLayer
            .selectAll("g.handle")
            .data(data)
            .enter()
            .append("g")
            .classed("handle", true)
            .attr("x", x => this.valueToX(x.value))
            .attr("transform", x => `translate(${this.valueToX(x.value)},${yCenter - handleHeight / 2})`)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))


        updateTrackHighlight();
        const svgString = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxNy4xNTEiIHZpZXdCb3g9IjAgMCAxMyAxNy4xNTEiPjxwYXRoIGQ9Ik0yNDAsNDQwVjQyOWgxMnYxMWwtNiw1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzOS41IC00MjguNSkiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2FhYSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+";

        handleGroups.append("image")
            .classed("handle-icon", true)
            .attr("xlink:href", `data:image/svg+xml;base64,${svgString}`)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", handleWidth)
            .attr("height", handleHeight)

        handleGroups.append("text")
            .classed("value-label", true)
            .text(d => d.value)
            .attr("transform", function () {
                return `translate(${
                    handleWidth / 2 - d3.select(this).node().getBBox().width / 2
                    },${
                    yCenter
                    + handleHeight / 2
                    + 1})`
            })

        d3.select(window).on("resize.doubleslider" + this.props.label, this.redrawChart.bind(this))

    }

    // initializeChartOld() {

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

    repositionHandles(arr) {
        if (!arr) { arr = [this.props.min, this.props.max] }
        // if (arr.length !== 2) { return }

        const handleLayer = d3.select(this.svg).select(".handle-layer")
        handleLayer.selectAll(".handle")
            .data(arr.map(x => { return { value: x } }))
            .attr("x", x => this.valueToX(x.value))
            .attr("transform", x => `translate(${this.valueToX(x.value)},${this.state.yCenter - this.handleHeight / 2})`);

    }

    componentDidUpdate(oldProps, newData) {
        super.componentDidUpdate.call(this);

        function legitArray(arr) {
            if (!arr) { return [-1, -1] }
            return arr;
        }

        const oldArr = legitArray(oldProps.selections),
            newArr = legitArray(this.props.selections);

        function arrsMatch(arr1, arr2) {
            if (arr1.length !== arr2.length) { return false };
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) { return false }
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
        }


        // this.repositionHandles(this.props.selections);
        // this.updateLabels();
        // this.updateTrackHighlight();
    }


    render() {
        return (
            <div className="DoubleSlider">
                <div className="track-label">{this.props.label}</div>
                <div className="track-wrapper">
                    {D3Component.prototype.render.call(this)}
                </div>
                {/* <div className="label-container">
                    <div className="label min">{this.state.labels[0].value}</div>
                    <div className="label max">{this.state.labels[1].value}</div>
                </div> */}
            </div>)
    }
}