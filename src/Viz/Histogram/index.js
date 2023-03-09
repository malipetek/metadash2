// import React from 'react';
import "./style/main.scss";
//import D3Component from "../../Viz/D3Component";
import D3Component from "../D3Component";
import numeral from "numeral";
import * as d3 from "d3";

export default class extends D3Component {

    constructor(props) {
        super(props);

        this.initializeChart = this.initializeChart.bind(this);
        this.updateChart = this.updateChart.bind(this);
        // this.setRange = this.setRange.bind(this);
    }

    initializeChart() {
        const svg = d3.select(this.svg).html("");
        svg.selectAll("*").remove();

        this.xAxisG = svg.append("g")
            .classed("axis", true)
            .classed("x", true);

        this.yAxisG = svg.append("g")
            .classed("axis", true)
            .classed("y", true);

        this.barG = svg.append("g");

    }

    updateChart(data) {


        data = data || this.props.data;
        const svg = d3.select(this.svg);

        // get width and height
        const width = svg.node().getBoundingClientRect().width,
            height = this.props.height || svg.node().getBoundingClientRect().height;

        // svg.attr("height", height + "px")
        // .attr("width", width + "px");

        // const yearRange = d3.extent(this.props.data.map(x => x.label))
        const yearRange = [this.props.minYear, this.props.maxYear]
        const countRange = [0, d3.max(data.map(x => x.count)) || 1]

        // const margin = this.props.margin || {
        //     bottom: 30,
        //     top: 20,
        //     left: 20,
        //     right: 20
        // }
        const margin = this.state.margin;

        // add axes
        const xScale = d3.scaleBand()
            .domain(d3.range(...yearRange))
            .padding(0.5)
            .rangeRound([margin.left, width - margin.right])

        const tickSteps = width > 600 ? 10 : 40;
        const tickValues = d3.range(this.props.minYear, this.props.maxYear, tickSteps);


        const xAxis = d3.axisBottom(xScale)
            .tickFormat(e => numeral(e).format("0"))
            .tickValues(tickValues)

        this.xAxisG
            .attr("transform", `translate(${0},${height - margin.bottom})`)
            .call(xAxis)

        const yScale = d3.scaleLinear()
            .domain(countRange)
            .rangeRound([height - margin.bottom, margin.top])
        
        const yAxis = d3.axisLeft(yScale).tickSizeOuter(0)
            // .tickSize(width - margin.left - margin.right)
            .ticks(height / 20)
            .tickFormat(e => Math.floor(e) === e ? e : undefined);

        const ty = d3.transition().duration(1000).ease(d3.easeQuadIn);

        this.yAxisG
            .attr("transform", `translate(${margin.left},${0})`)
            .transition(ty)
            .call(yAxis)

        const t = i => svg.transition()
            .duration(1000)
            .ease(d3.easeCubic)

        this.barG.selectAll(".bar")
            .data(data)
            .join(
                (enter, i) => enter.append("rect")
                    .attr("class", d => d.barClass)
                    .classed("bar", true)
                    .attr("data-enter-value", d => d.count)
                    .attr("data-label", d => d.label)
                    .attr("y", d => yScale(0))
                    .attr("width", xScale.bandwidth)
                    .attr("x", d => xScale(d.label))
                    .call(enter => enter.transition(null)
                        .attr("y", d => yScale(d.count || 0))
                        .attr("height", d => yScale(0) - yScale(d.count || 0))
                        .attr("width", xScale.bandwidth)
                    ),
                update => update
                    .attr("data-update-value", d => d.count)
                    .attr("class", d => d.barClass)
                    .classed("bar", true)
                    .attr("x", d => xScale(d.label))
                    .call(update => update.transition(t(1000))
                        .attr("y", d => yScale(d.count || 0))
                        .attr("height", d => yScale(0) - yScale(d.count || 0))
                    ),
                exit => exit
                    .attr("data-exit-value", d => d.count)
                    // .attr("class",d=>d.barClass)
                    .attr("x", d => xScale(d.label))
                    .call(exit => exit.transition(t(100))
                        .attr("height", 0)
                        .attr("y", () => yScale(0))
                    )
            )

        d3.select(window).on("resize.histogram", this.redrawChart.bind(this))

        // d3.select(window).on("resize", this.redrawChart)
    }

}