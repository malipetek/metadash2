import React from 'react';
import "./style/main.scss";
import CountListWithBars from "../CountListWithBars";
import { arrayToObject } from "../Common";

export default class extends React.Component {
    render() {

        const listProps = {
            ...this.props,
            handleItemClick: item => {
                // switch to item, or clear selections if you click on the selected item 
                if (this.props.selections.length === 0 || item.id !== this.props.selections[0].id) { this.props.updateSelections([item]) }
                else { this.props.updateSelections([]) }
            },
            showAll: true,
            selections: arrayToObject(this.props.selections),
            showBars: true
        };


        return (
            <div className="Languages module-box">
                <h3 className="title">Languages</h3>
                <CountListWithBars
                    {...listProps}
                ></CountListWithBars>
            </div>

        )

    }

}