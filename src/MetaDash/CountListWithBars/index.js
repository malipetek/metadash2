import React from 'react';
import "./style/main.scss";
import numeral from "numeral";

export default class extends React.Component {

    constructor(props){
        super(props);
        this.trackScrolling = this.trackScrolling.bind(this);
        this.poolRef = React.createRef();

        this.state = {
            itemCount:100,
            increment: 10
        }
    }

    trackScrolling(){

        // this adds lazy loading in 100-item increments
        if (this.state.itemCount >= this.props.items){ return }

        const scrollTop = this.poolRef.current.scrollTop,
              scrollBottom = scrollTop + this.poolRef.current.getBoundingClientRect().height,
              totalHeight = this.poolRef.current.scrollHeight //getBoundingClientRect().height,
              //startPct = scrollTop / totalHeight,
            //   endPct = scrollBottom / totalHeight
            ;

        // console.log("height",totalHeight, this.poolRef.current.getBoundingClientRect().height)

        // if ((endPct * 100) > 99){
        if ((totalHeight - scrollBottom) <= 80){
            // console.log("height", scrollBottom, totalHeight)

            const itemCount = this.state.itemCount + this.state.increment;
            this.setState({itemCount});
        }

    }

    componentDidMount() {
        this.poolRef.current.addEventListener("scroll", this.trackScrolling);
    }

    componentWillUnmount() {
        this.poolRef.current.removeEventListener("scroll", this.trackScrolling);
    }


    renderBar(width) {
        if (!this.props.showBars) { return }
        return (
            <div className="pct-bar-container">
                <div style={{ "width": width }} className="pct-bar"></div>
            </div>

        )
    }

    render() {

        const total = this.props.items.reduce((subtotal, nextItem) => subtotal + nextItem.count, 0);
        const width = val => `${val * 100 / total}%`

        const items = this.props.showAll ? this.props.allItems : this.props.items;
        return (
            <div 
            ref={this.poolRef}
            className="count-list">
                {(items || [])
                    .sort((a, b) => a.count < b.count ? 1 : -1)
                    .slice(0,this.state.itemCount)
                    // .filter(a => a.label && a.label.length > 0)
                    .map((item, i) => {

                        // skip the filter loop
                        if (!(item.label && item.label.length > 0)){ return (null)}

                        let itemCount,
                            barWidth,
                            className


                        if (item.id in this.props.itemDict) {
                            className = "list-item";
                            itemCount = numeral(this.props.itemDict[item.id].count).format("0,0");
                            barWidth = width(this.props.itemDict[item.id].count);

                        } else {
                            className = "list-item disabled";
                            barWidth = 0;
                            itemCount = "--"
                        }

                        if (item.id in this.props.selections) {
                            className = "list-item selected";
                        }


                        return (
                            <div onClick={() => (this.props.handleItemClick || (() => { }))(item)} key={i}
                                className={className}>

                                <div className="x-circle-icon"></div>

                                <div className="list-item-name">
                                    {item.label}
                                </div>

                                {this.renderBar(barWidth)}

                                <div className="list-item-value">
                                    {itemCount}
                                </div>
                            </div>
                        )
                    })}
            </div>
        )
    }
}
