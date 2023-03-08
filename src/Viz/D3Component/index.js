import React from 'react';

export default class extends React.PureComponent {

    constructor(props) {
        super(props);

        this.svg = React.createRef();
        this.initializeChart = this.initializeChart.bind(this);
        this.updateChart = this.updateChart.bind(this);
        this.redrawChart = this.redrawChart.bind(this);
        this.setMargin = this.setMargin.bind(this);

        this.state = {
            currentWidth: -1,
            margin: props.margin || {
                top:0,
                left:0,
                right:0,
                bottom:0
            }
        }

        this.margin = props.margin || {
            top:0,
            left:0,
            right:0,
            bottom:0
        }

    }

    setMargin(newMargin){
        const margin = {...this.state.margin, ...newMargin};
        this.setState({ margin });

    }

    componentDidUpdate() { 
        this.updateChart(this.props.data);
    }

    componentDidMount() {
        this.initializeChart();
        this.updateChart();

    }

    render() {
        return <div className="Viz">
            <div></div>
            <svg ref={(elem) => { this.svg = elem; }}></svg>
        </div>;
    }

    redrawChart(){

        // prevent redraw if the width hasn't changed
        const newWidth = window.document.body.getBoundingClientRect().width;
        if (newWidth === this.state.currentWidth){ return };

        this.setState({currentWidth:newWidth});

        // only redraw at max once per second
        clearTimeout(this.timeout);
        this.timeout = setTimeout(()=>{
            this.initializeChart();
            this.updateChart();
    
        }, 1000)
    }

    // Override this 
    initializeChart() {
    }

    // Override this
    updateChart(data) {
    }

}