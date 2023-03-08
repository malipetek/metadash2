import React from 'react';
import "./style/main.scss";
import numeral from "numeral";


export default class extends React.Component {
    render(){ 
        return (
            <div className="OverviewBillboard module-box">
                <div className="big-number-value">{numeral(this.props.testimonyCount).format("0,0")}</div>
                <div className="big-number-label">testimonies</div>
            </div>
        );
    }
}