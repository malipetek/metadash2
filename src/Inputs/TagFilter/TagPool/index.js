import React from 'react';
import TagPoolItem from "./TagPoolItem";
import "./style/main.scss"

export default class extends React.Component{

    constructor(props){
        super(props);
        this.trackScrolling = this.trackScrolling.bind(this);
        this.poolRef = React.createRef();

        this.state = {
            itemCount:100,
            increment: 50
        }
    }

    trackScrolling(){

        // this adds lazy loading in 100-item increments
        if (this.state.itemCount >= this.props.items){ return }

        const scrollTop = this.poolRef.current.scrollTop,
              scrollBottom = scrollTop + this.poolRef.current.getBoundingClientRect().height,
              totalHeight = this.poolRef.current.getBoundingClientRect().height,
            //   startPct = scrollTop / totalHeight,
              endPct = scrollBottom / totalHeight;

        if (endPct * 100 > 80){
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


    render(){
        return (
            <div 
            ref={this.poolRef}
            className="TagPool">
                {(this.props.items.slice(0, this.state.itemCount) || []).map((item, i)=>{
                    return (
                    <TagPoolItem 
                    callback={this.props.callback || function(){}} 
                    key={i} 
                    item={item}></TagPoolItem>
                    )
                })}
            </div>
        )
    }
}