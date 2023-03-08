import React from 'react';
import GenericInput from "../GenericInput";
import "./main.scss";

export default class extends GenericInput {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
        this.toggleValue = this.toggleValue.bind(this);
    }

    toggleValue(){
        this.setState({value:!this.state.value});
    }

    render() {

        var className = "";
        if (this.state.value === true){ className="checked" }

        return (
            <div onClick={this.toggleValue} className={`CheckboxInput ${className}`}>
                <div>{this.props.label}</div>
            </div>
        );
    }

}
