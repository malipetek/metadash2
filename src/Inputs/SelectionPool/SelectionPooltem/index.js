import React from 'react';
import "./style/main.scss";

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.callback(this.props.item);
    }

    render() {
        return (
            <div onClick={this.handleClick} className="SelectionPoolItem">
                <div>{this.props.item.label}</div> <div className="button"></div>
            </div>
        )
    }
}