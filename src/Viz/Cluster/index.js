import "./style/main.scss";
import D3Component from "../D3Component";
// import numeral from "numeral";
import * as d3 from "d3";
// import { objectToArray } from '../../MetaDash/Common';

export default class extends D3Component {

    constructor(props) {
        super(props);

        this.initializeChart = this.initializeChart.bind(this);
        this.updateChart = this.updateChart.bind(this);
    }

    initializeChart() {
        const svg = d3.select(this.svg).html("");

        const //width = svg.node().getBoundingClientRect().width,
            height = this.props.height || svg.node().getBoundingClientRect().height;

        svg.attr("height", height + "px");
        // svg.attr("width", width + "px");

        // svg.on("resize", ()=>super.redrawChart.call(this));

    }

    componentDidUpdate(prevProps, prevState) {
        this.updateChart(prevProps, prevState);
    }

    updateChart(prevProps, prevState) {

        const svg = d3.select(this.svg)

        const width = svg.node().getBoundingClientRect().width,
            height = Math.min(width,
                this.props.height || svg.node().getBoundingClientRect().height
            );

        svg.attr("height", height + "px");


        const items = this.props.items;
        // change this to props.allItems if you want to preserve each node's circle element
        // which is cooler, but expensive
        // let allItems = this.props.items;

        //--------------HACK--------------
        // TODO - Fix this q-a-d hack to prevent redrawing if the data have not changed
        //        Get rid of this whole block....
        function allItemsMatch(arr1, arr2) {
            if (arr1.length !== arr2.length) { return false }
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i].id !== arr2[i].id) { return false }
                if (arr1[i].count !== arr2[i].count) { return false }
            }
            return true;
        }

        if (allItemsMatch(

            // this works, but do I really have to loop this each time?
            // objectToArray((prevProps || {}).itemDict || {}),
            // objectToArray(this.props.itemDict)

            // this seems to be working just as well without the two loops
            (prevProps || { items: [] }).items,
            this.props.items
        )) {
            // console.log("redraw prevented")

            // objectToArray(this.props.itemDict))) {
            return
        }
        // ... down to here.
        //----------END OF HACK-----------

        const root = d3.stratify()
            .id(d => d.label.split("|")[0])
            .parentId(d => d.label.split("|")[1])(items);

        var packLayout = d3.pack()
            .padding(0.725)
            .size([width, height]);

        root.sum(d => Number(d.count ? d.count : 0));

        const data = root.descendants()
            // .filter(d => d.data.label.indexOf("root") < 0)
            .filter(d => d.data.label.indexOf("|country") < 0)
            .filter(d => d.data.label.indexOf("country|") < 0)



        packLayout(root);
        svg.selectAll("circle.city")//.transition();

        // const t = d3.transition().duration(1100);
        this.allowInteraction = data.length;

        // let nodes = 

        // function realChange(newRadius, oldRadius) {
        //     return (newRadius > 0) && (oldRadius > 0);
        // };

        const r = d => d.r || 0;
        const x = d => d.x || 0;
        const y = d => d.y || 0;

        svg
            .selectAll('circle.city')
            .data(data)
            .join(
                enter => enter
                    .append('circle')
                    // .classed("city", d => d.data.label.indexOf("|country") < 0)
                    // .classed("country", d => d.data.label.indexOf(",") === 0)
        
                    .classed("city", true)
                    .on("mouseover", d => this.props.onMouseOver(d.data))
                    .on("mouseout", d => this.props.onMouseOut(d.data))
                    .on("click", d => {
                        if (this.props.selections
                            && this.props.selections.length === 1
                            && this.props.selections[0].id === d.data.id) {
                            this.props.updateSelections([])
                        } else {
                            this.props.updateSelections([d.data])
                        }
                    })
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('r', r),
                update => update
                    .attr("data-city", d => d.data.label)
                    .each(function (d, i) {

                        let handle = d3.select(this).style("opacity", "0.5");
                        const newRadius = r(d);
                        const currentRadius = d3.select(this).attr("r") || 0;

                        if (newRadius > 0 && currentRadius > 0 && currentRadius !== newRadius) {
                            // console.log("Animating")
                            handle = handle.transition().duration(1000 * Math.random());
                        } else {
                            //console.log("Skipping animation")
                        }

                        handle
                            .style("opacity", "1")
                            .attr('cx', x)
                            .attr('cy', y)
                            .attr('r', r);

                    }),
                // .call(update => {
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
                exit => exit.remove()
                // exit=>exit
                // .call(exit=>
                //     exit.transition().duration(1000)
                //     .attr('r', 0)
                // )
            )

        d3.select(window).on("resize.cluster", this.redrawChart.bind(this))


    }


    newMethod(handle, t) {
        handle = handle.transition(t);
        return handle;
    }
}