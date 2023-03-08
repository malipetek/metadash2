import React from 'react';
import "./style/main.scss";
import { ItemSelector, HoverText } from "../../Inputs";
import { TreeMap } from "../../Viz";
import { objectToArray } from "../Common";

export default class extends React.Component {

    constructor(props) {
        super(props);

        this.state = { hoverText: " " }
        this.setText = this.setText.bind(this);
        this.handleMouseIn = this.handleMouseIn.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.label = this.label.bind(this);

    }


    label() {
        if (!this.props.selections || this.props.selections.length < 1) { return "" }
        return this.props.selections[0].label;
    }



    setText(hoverText) {
        this.setState({ hoverText })
    }

    handleMouseIn(item) {
        this.setText(item.label)
    }

    handleClick(item) {

        if (this.props.selections
            && this.props.selections.length > 0
            && this.props.selections[0].id === item.id) {
            this.props.updateSelections([])
        } else {
            this.props.updateSelections([item])
        }

    }

    handleMouseOut() {
        this.setText(" ");
    }

    render() {

        return (
            <div className="Programs module-box">

                <h3 className="title">Affiliate programs</h3>

                <TreeMap
                    items={objectToArray(this.props.programs)}
                    itemDict={this.props.programs}

                    mouseInCallback={this.handleMouseIn}
                    mouseOutCallback={this.handleMouseOut}
                    selections={this.props.selections}
                    clickCallback={this.handleClick}
                ></TreeMap>

                {/* <div className="hover-text">
                    {this.state.hoverText}
                </div> */}
                <HoverText
                    selections={this.props.selections}
                    hoverText={this.state.hoverText}
                    dropCallback={() => { this.props.updateSelections([]) }}
                    label={this.label()}
                ></HoverText>

                <ItemSelector
                    updateSelections={this.props.updateSelections}
                    items={objectToArray(this.props.programs)}
                    selections={this.props.selections}
                    placeholder={"All affiliate programs"}
                ></ItemSelector>


                {/* <ItemSelection></ItemSelection> */}
                {/* <TagFilter {...this.props}></TagFilter> */}
            </div>
        );
    }
}