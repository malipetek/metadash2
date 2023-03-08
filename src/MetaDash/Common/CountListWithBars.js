// import React from 'react';
// import "./style/main.scss";
// import numeral from "numeral";

// export default class extends React.Component {

//     renderBar(width) {
//         if (!this.props.showBars) { return }
//         return (
//             <div className="pct-bar-container">
//                 <div style={{ "width": width }} className="pct-bar"></div>
//             </div>

//         )
//     }

//     render() {
//         const total = this.props.items.reduce((subtotal, nextItem) => subtotal + nextItem.count, 0);
//         const width = val => `${val * 100 / total}%`;

//         return (
//             <div className="count-list">
//                 {(this.props.allItems || [])
//                     .sort((a, b) => a.count < b.count ? 1 : -1)
//                     .filter(a => a.label && a.label.length > 0)
//                     .map((item, i) => {

//                         let barWidth = width(item.count);
//                         let className="list-item on"
//                         if (!(item.id in this.props.itemDict)){
//                             barWidth = 0;
//                             className="list-item off"
//                         } else {
//                         }

//                         return (
//                             <div onClick={() => (this.props.handleItemClick||(()=>{}))(item)} key={i}
//                                 className={className}>

//                                 <div className="off-icon">x</div>

//                                 <div className="list-item-name">
//                                     {item.label}
//                                 </div>

//                                 {this.renderBar(barWidth)}

//                                 <div className="list-item-value">
//                                     {numeral(item.count).format("0,0")}
//                                 </div>
//                             </div>
//                         )
//                     })}
//             </div>
//         )
//     }
// }
