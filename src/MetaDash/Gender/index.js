import React from 'react';
import "./style/main.scss";
import numeral from "numeral";
import * as d3 from "d3";

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "Men": true,
            "Women": true,
            "Both": true
        }

        this.menRef = React.createRef();
        this.bothRef = React.createRef();
        this.womenRef = React.createRef();

        this.genderToggle = this.genderToggle.bind(this);
        this.animate = this.animate.bind(this);

    }

    genderToggle(gender) {

        let val = this.state[gender],
            newVal = !val,
            // newVal = true,
            otherVal = false;

    
        // prevent turning off all genders
        switch (gender) {
            case "Men":
                otherVal = this.state.Women || this.state.Both;
                break;
            case "Women":
                otherVal = this.state.Men || this.state.Both;
                break;
            case "Both":
                otherVal = this.state.Men || this.state.Women;
                break;
            default:
                throw new Error(`Error: Invalid gender ${gender}`)

        }

        if (!otherVal && !newVal) { return }

        const newState = { ...this.state }
        newState[gender] = newVal;
        this.setState(newState);

        let selections = [];
        if (newState.Men) selections.push("Men");
        if (newState.Women) selections.push("Women");
        if (newState.Both) selections.push("Both");

        this.props.updateSelections(selections);

    }

    animate() {
        // animate the width

        const vals = {
            men: this.props.men || 0,
            women: this.props.women || 0,
            both: this.props.both || 0
        },
            total = vals.men + vals.women + vals.both;

        const animate = (label, ref) =>
            d3.select(ref)
                .transition()
                .duration(1000)
                .ease(d3.easeSinOut)
                .style("width", () => (vals[label] * 100 / total) + "%");

        animate("both", this.bothRef)
        animate("men", this.menRef)
        animate("women", this.womenRef)

    }

    componentDidMount() { this.animate() }
    componentDidUpdate() { this.animate() }

    render() {
        const men = this.props.men || 0,
            women = this.props.women || 0,
            both = this.props.both || 0,
            total = men + both + women;

        const toggleState = label => this.state[label] ? "on" : "off";

        return (
            <div className="Gender module-box">
                <h3 className="title">Gender</h3>
                <div className="label-container">
                    <div className="big-label">{numeral(men / total).format("0%")}</div>
                    <div className="big-label">{numeral(both / total).format("0%")}</div>

                    <div className="big-label">{numeral(women / total).format("0%")}</div>

                    {/* <div className="big">{numeral(men).format("0,0")}</div>
                    <div className="big">{numeral(women).format("0,0")}</div> */}
                </div>
                <div className="split-bar-container">
                    <div
                        onClick={() => this.genderToggle("Men")}

                        ref={(elem) => { this.menRef = elem; }}
                        // style={{ width: `${men * 100 / total}%` }} 
                        className={`men gender-bar ${toggleState("Men")}`}></div>
                    <div
                        onClick={() => this.genderToggle("Both")}

                        ref={(elem) => { this.bothRef = elem; }}
                        // style={{ width: `${women * 100 / total}%` }} 
                        className={`both gender-bar ${toggleState("Both")}`}></div>
                    <div
                        onClick={() => this.genderToggle("Women")}

                        ref={(elem) => { this.womenRef = elem; }}
                        // style={{ width: `${women * 100 / total}%` }} 
                        className={`women gender-bar ${toggleState("Women")}`}></div>
                </div>
                <div className="label-container">
                    <div
                        className={"label-area men small-label " + toggleState("Men")}
                        onClick={() => this.genderToggle("Men")}
                    >
                        {/* <div className={"toggle-light"}></div> */}
                        <div>Men</div>
                        <div className="subtext">{numeral(men).format("0,0")}</div>

                    </div>
                    <div
                        className={"label-area both small-label " + toggleState("Both")}
                        onClick={() => this.genderToggle("Both")}
                    >
                        {/* <div className={"toggle-light"}></div> */}
                        <div>Multiple</div>
                        <div className="subtext">{numeral(both).format("0,0")}</div>

                    </div>

                    <div
                        onClick={() => this.genderToggle("Women")}
                        className={"label-area women small-label " + toggleState("Women")}
                    >
                        {/* <div className={"toggle-light"}></div> */}
                        <div>Women</div>
                        <div className="subtext">{numeral(women).format("0,0")}</div>

                    </div>
                </div>
            </div >
        );
    }
}