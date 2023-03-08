import React from 'react'
import "./style/main.scss"

export default class extends React.Component {

    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.callback(this.props.item);
    }

    render(){
        return (
            <div onClick={this.handleClick} data-value={this.props.item.value} className="TagItem">{this.props.item.label}</div>
        )
    }

}