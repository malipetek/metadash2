import React from 'react';
import "./style/main.scss";
// import TagFilter from "../../Inputs/TagFilter";
import CountListWithBars from "../CountListWithBars";

import { TextInput } from "../../Inputs";


export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
        }
        this.updateSelections = this.updateSelections.bind(this);
        this.updateSearchTerm = this.updateSearchTerm.bind(this);
        this.dropSelection = this.dropSelection.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);

    }

    dropSelection(item) {
        this.props.updateSelections(this.props.selections.filter(i => i.id !== item.id))
    }

    updateSearchTerm(searchTerm) {


        this.setState({
            searchTerm, 
        })


    }

    updateSelections() {

        // this.updateSearchTerm(this.state.searchTerm);
        this.updateSearchTerm("");
        this.props.updateSelections.apply(null, arguments);

    }

    handleItemClick(item) {
        // if you click an item that's already selected, unselect it.
        // otherwise, select it
        const selections = this.props.selectionsDict; //arrayToObject(this.props.selections);
        const selectionsWithoutCurrentItem = this.props.selections.filter(i => i.id !== item.id);

        if (item.id in selections) { this.updateSelections(selectionsWithoutCurrentItem) }
        else { this.updateSelections(selectionsWithoutCurrentItem.concat([item])) }

        // this.updateSelections(this.props.selections.filter(i=>i.id !== item.id).concat([item]))
    }

    render() {

        // 6-3-19 - updated to expect an array and a dictionary to prevent
        // the need to use arrayToObject(dict+arr+interviewers)
        const [items, itemDict] = this.props.filterItems(this.state.searchTerm);

        const listProps = {
            showBars: this.props.showBars,
            updateSelections: this.updateSelections,
            items,//: items,
            allItems: this.props.allInterviewers,
            showAll: false,
            itemDict,//: arrayToObject(items),
            handleItemClick: this.handleItemClick,
            selections: this.props.selectionsDict,//arrayToObject(this.props.selections)
            //allowMultipleSelections: true,
            // items: this.state.filteredItems
            // items: objectToArray(this.props.interviewers)
        }

        return (
            <div className="Interviewers module-box">
                <h3 className="title">Interviewers</h3>
                <div className="input-wrapper">
                    <TextInput
                        placeholder="Search by name"
                        callback={this.updateSearchTerm}
                        value={this.state.searchTerm}>
                        ></TextInput>
                </div>
                {/* <div>
                    <SelectionPool
                    callback={(this.dropSelection)}
                    items={this.props.selections}></SelectionPool>
                </div> */}
                <CountListWithBars {...listProps}></CountListWithBars>
            </div>);

    }
}