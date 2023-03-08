import React from 'react';
import "./style/main.scss";
// import numeral from "numeral";


export default class extends React.Component {
    render() {
        let ret=(null);
        if (!this.props.selections || this.props.selections.length < 1) {

            ret = (
                <div className="unselected-item">
                    <div className="x-icon"></div>
                    <div>
                    {this.props.hoverText || " "}
                    </div>
                </div>                
            )
        } else {
            let htext = this.props.hoverText.trim().length > 0 ? this.props.hoverText : this.props.label || " ";
            ret = (
                <div 
                className="selected-item"
                onClick={this.props.dropCallback}
                >
                    <div className="x-icon"></div>
                    {/* <div>{this.props.label}</div> */}
                    <div>{htext}</div>
                </div>
            )
        }

        return <div className="HoverText">{ret}</div>

        
    }
}