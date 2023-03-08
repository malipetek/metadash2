// import React from 'react';
import "./style/main.scss";
import D3Component from "../D3Component";
import * as d3 from "d3";

export default class extends D3Component {

    constructor(props) {
        super(props);

        this.initializeChart = this.initializeChart.bind(this);
        this.updateChart = this.updateChart.bind(this);
    }

    initializeChart() {
        const svg = d3.select(this.svg).html("");
        svg.selectAll("*").remove();

        const //width = svg.node().getBoundingClientRect().width,
            height = this.props.height || svg.node().getBoundingClientRect().height;

        svg.attr("height", height);

        // svg.on("resize", this.redrawChart)

    }

    updateChart() {
        const svg = d3.select(this.svg);

        const width = svg.node().getBoundingClientRect().width,
            height = this.props.height || svg.node().getBoundingClientRect().height;

        svg.attr("height", height)
        const h = d3.hierarchy({ "children": this.props.items });

        var treemap = d3.treemap()
            .size([width, height])
            .padding(2);

        treemap(h
            .sum(function (d) { return d.count; })
            .sort(function (a, b) { return a.height - b.height || b.count - a.count; })
        ).descendants();

        // function color() { return "gray" }

        const isHighlighted = item => {
            const itemData = item.data;
            if (!this.props.selections || this.props.selections.length < 1) { return false }
            if (itemData.id === this.props.selections[0].id) { return true };
            return false
        }
        const t = svg.transition()
            .duration(500)
            .ease(d3.easeQuad)

        svg.selectAll("rect")
            .data(h.leaves())
            .join(
                enter => enter
                    .append("rect")
                    .classed("program", true)
                    .classed("highlighted", isHighlighted)
                    .attr("id", function (d) { return d.id; })
                    .call(enter => enter
                        .attr("x", d => d.x0)
                        .attr("y", d => d.y0)
                        .attr("width", function (d) { return d.x1 - d.x0; })
                        .attr("height", function (d) { return d.y1 - d.y0; })
                    )
                // .on("click", d => {
                //     if (d.data.id in this.props.itemDict) {
                //         return this.props.clickCallback(d)
                //     }
                // })
                ,
                update => update
                    .classed("highlighted", isHighlighted)
                    .attr("id", function (d) { return d.id; })

                    .call(update => update.transition(t)
                        .attr("x", d => d.x0)
                        .attr("y", d => d.y0)
                        .attr("width", function (d) { return d.x1 - d.x0; })
                        .attr("height", function (d) { return d.y1 - d.y0; })
                    ),
                exit => exit.remove()
            )
            // .on("click", d => {
            //     if (d.data.id in this.props.itemDict) {
            //         return this.props.clickCallback(d.data)
            //     }
            // })

        svg.selectAll("rect")
            .on("mouseover", item => this.props.mouseInCallback (item.data))
            .on("mouseout", item => this.props.mouseOutCallback (item.data))
            .on("click", item => this.props.clickCallback(item.data));


        d3.select(window).on("resize.treemap", this.redrawChart.bind(this))


    }

    // initializeChartOld() {
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

}