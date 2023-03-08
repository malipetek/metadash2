import React from 'react';
import SelectionPoolItem from "./SelectionPooltem";
import "./style/main.scss";

export default class extends React.Component {

    render() {
        return (
            <div className="SelectionPool">
                {(this.props.items || []).map((item,i) => {
                    return (<SelectionPoolItem key={i} callback={this.props.callback} item={item}></SelectionPoolItem>);
                })}
            </div>
            )
        }
}