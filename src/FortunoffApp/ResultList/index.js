import React from 'react';
import wrapResultListItem from "./ResultListItem";
import "./style/main.scss";
export default class extends React.Component {

    render() {
        return (<div className="ResultList">
            {this.props.items.map((item, idx)=>wrapResultListItem(item, idx))}
        </div>);
    }

}