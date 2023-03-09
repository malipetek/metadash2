import React from 'react';
import "./style/main.scss";
import numeral from "numeral";
import { getRecordingYear } from "../../Data";
// import {ResultList} from "@bit/jakekara.metadash.fortunoff-app"
import { ResultList } from "../../FortunoffApp";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            limit: 1,
            increment: 1

        }

        this.renderResult = this.renderResult.bind(this);
        this.trackScrolling = this.trackScrolling.bind(this);
        // this.maybeLoadMore = this.maybeLoadMore.bind(this);
        this.resultsRef = React.createRef();

        this.decideToIncrement = this.decideToIncrement.bind(this);

        // if (this.props.pymChild) {
        //     this.handlePymScroll = this.handlePymScroll.bind(this);
        //     this.props.pymChild.onMessage('viewport-iframe-position', this.handlePymScroll);
        // }
    }

    // maybeLoadMore(el){
    //     return this.state.limit < props.items.length && el.getBoundClientRect().bottom <= window.innerHeight - 100;
    // }


    renderResult(result, i) {

        // return class extends React.component {

        //     render() {


                return (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={result.link}
                        key={i}>
                        <div className="result-item-container">
                            <div
                                className={`result-item ${result.birth_years.length > 1 ? "multiple" : ""}`}>
                                <div className="testimony-name">
                                    {result.title}
                                </div>

                                <div className="birth-year">
                                    {
                                        (result.birth_years || [])
                                            .filter(yr => yr)
                                            .map(yr => (<li className="sub-item" key={`by-${i}`}>{yr}</li>))
                                            .concat(result.birth_place_cities
                                                .filter((_, i) => result.birth_place_cities[i] || result.birth_place_countries[i])
                                                .map((city, i) => (
                                                    <li className="sub-item" key={`bp-${i}`}>
                                                        {city}{city && result.birth_place_countries[i] ? ", " : ""}{result.birth_place_countries[i]}
                                                    </li>
                                                )
                                                )

                                            )
                                            .slice(-2) // don't show more than two items

                                    }

                                </div>
                                <div className="affiliate">
                                    {(result.programs || []).map((ref, i) => (<li className="sub-item" key={i}>{this.props.programs[ref].label}</li>))}
                                </div>
                                <div className="recording-year">
                                    {getRecordingYear(result)}
                                </div>

                                <div className="big-button-container">
                                    <div className="big-button">View</div>
                                </div>
                            </div>
                        </div>

                    </a>
                )

        //     }
        // }
    }

    handlePymScroll(parentInfo) {
        // this.props.pymChild.sendMessage(
        //     "console-log",
        //     parentInfo.split(" ").map(x => Number(x))
        // );
        // parentInfo contains in order
        // Viewport width and height.
        // Iframe top, left, bottom and right positions.

        const arr = parentInfo.split(" ").map(x => Number(x)),
            vheight = arr[1],
            ibottom = arr[4],
            distanceFromBottom = ibottom - vheight;

        this.decideToIncrement(distanceFromBottom);
    }

    decideToIncrement(distanceFromBottom) {
        // this.props.pymChild.sendMessage("console-log", distanceFromBottom);
        if (this.props.results.length > this.state.limit
            && distanceFromBottom < 100) {
            this.setState({ limit: this.state.limit + this.state.increment })
        }

    }

    trackScrolling() {
        const scrollBottom = window.pageYOffset + window.innerHeight;
        const distanceFromBottom = window.document.body.offsetHeight - scrollBottom;

        this.decideToIncrement(distanceFromBottom);

        // if (this.props.results.length > this.state.limit
        //     && distanceFromBottom < 100) {
        //     this.setState({ limit: this.state.limit + this.state.increment })
        // }
    }

    componentDidMount() {
        document.addEventListener("scroll", this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener("scroll", this.trackScrolling);
    }

    render() {
        return (
            <div
                className="Results">
                <div className="prose">
                    There are <span className="stat">{numeral(this.props.results.length).format("0,0")}</span> testimonies with matching criteria.
                </div>
                <div className="headers">
                    <div className="testimony-name">
                        Testimony title
                    </div>
                    <div className="birth-year">
                        Birth year / place
                        </div>
                    <div className="affiliate">
                        Affiliate
                    </div>
                    <div className="recording-year">
                        Recording year
                    </div>

                    <div className="big-button-container">
                        &nbsp;
                    </div>
                </div>
                <div
                    
                    ref={this.resultsRef}
                    className="results-container">
                    
                </div>
                {/* {this.props.results.slice(0, this.state.limit).map(this.renderResult)} */}
                <ResultList
                    items={this.props.results.slice(0, this.state.limit).map(this.renderResult)}
                ></ResultList>

            </div>
        );
    }
}