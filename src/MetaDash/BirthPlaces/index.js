import React from 'react';
import "./style/main.scss";
import { Cluster } from "../../Viz";
import { objectToArray } from "../Common";
import { normalizeString } from "../../Common";
import { HoverText } from "../../Inputs";

import Autosuggest from 'react-autosuggest';

export default class extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            searchTerm: "",
            suggestions: [],
            hoverText: " ",
        }

        this.cleanClusterData = this.cleanClusterData.bind(this);

        this.dropSelection = this.dropSelection.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);

        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.label = this.label.bind(this);
        this.cleanPlaceName = this.cleanPlaceName.bind(this);

        // this.renderHoverField = this.renderHoverField.bind(this);

        this.cleanClusterData();

    }

    cleanPlaceName(item){
        if (!item){ return ""}
        let city = item.label.split("|")[0].split(",")[0], 
        country = item.country;

        if(city === country){ return country}
        if (city && country){ return city + ", " + country}
        else if (city){ return city}
        else if (country){ return country}
        // return item.label.split("|")[0].split(",")[0] + ", " + item.country
    }
    label(){
        if (!this.props.selections || this.props.selections.length < 1){ return ""}

        return this.cleanPlaceName(this.props.selections[0]);
//        return this.props.selections[0].label.split("|")[0].split(",")[0] + ", " + this.props.selections[0].country
    }

    shouldComponentUpdate(nextProps, nextState) {
        const shouldUpdate = (nextProps !== this.props)
            || (nextState !== this.state);

        return (shouldUpdate);
    }


    // the data needs to be reformatted a little bit 
    // in order to work with a cluster pack layout.
    // we want to create a hierarchy of countries and cities
    cleanClusterData() {
        // if (this.state.cleanClusterData) { return this.state.cleanClusterData }
        let addedCountries = [];

        let clusterData = objectToArray(this.props.allBirthPlaces)
            .filter(
                // only keep places with a city and country, in theory
                place => place.label.split("|").filter(x => x && x.length > 0).length === 2
            )
            .map(item => {
                let ret = { ...item };
                // console.log("item",item, item.id in this.props.birthPlaces)
                if (!(item.id in this.props.birthPlaces)) {
                    // console.log("removing", item);
                    ret.count = 0
                }

                // const element = ret;

                // if (addedCountries.indexOf(country) < 0) { 
                //     addedCountries.push(country);
                //     const label = `${country}|root`,
                //         newItem = { label, id: label };
                //     countryItems.push(newItem)
                //  }

                return ret
            });

        // clusterData = clusterData.concat(countryItems);

        // add an item for each country
        clusterData.forEach(element => {
            const country = element.label.split("|")[1];
            if (addedCountries.indexOf(country) >= 0) { return }
            addedCountries.push(country);
            const label = `${country}|country`, // changed from "root" to "country"
                newItem = { label, id: label, country };
            clusterData.push(newItem)
        });

        clusterData.push({ label: "country|", id: "country|" })

        // this.setState({ cleanClusterData: clusterData });
        return clusterData;

    }

    getSuggestionValue(suggestion) {
//        return suggestion.label;
        return this.cleanPlaceName(suggestion);
    }

    getSuggestions = value => {
        const all = this.cleanClusterData();
        return all.filter(x => normalizeString(x.label).indexOf(normalizeString(value.replace(":","|"))) >= 0)
        // filter out roots
            .filter(x => x.label.indexOf("|root") < 0)
            .filter(x => x.label.indexOf("root|") < 0)
        // return [{label: value + " and a hot plate!"}]
    }

    onChange(event, { newValue }) {
        this.setState({
            searchTerm: newValue
        });
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });

    };

    onSuggestionsClearRequested = () => {
        this.setState({
            searchTerm: "",
            suggestions: []
        });
    };

    renderSuggestion(suggestion) {
        return (
            <div className="suggestion">
                {this.cleanPlaceName(suggestion)}
                {/* {suggestion.label.split("|")[0].split(",").join(", ")} */}
            </div>
        )
    }

    onSuggestionSelected(e, { suggestion }) {
        this.props.updateSelections([suggestion])
    }

    dropSelection() {
        this.props.updateSelections([])
    }

    onMouseOver(d) {
        this.setState({ hoverText: this.cleanPlaceName(d) })

        // this.setState({ hoverText: d.label.split("|")[0].split(",")[0] + ", " + d.country })
    }

    onMouseOut() {
        this.setState({ hoverText: " " })
    }

    // renderHoverField() {
    //     if (!this.props.selections || this.props.selections.length < 1) {

    //         return (
    //             <span>
    //                 {this.state.hoverText || " "}
    //             </span>
    //         )
    //     }
    //     return (
    //         <div 
    //         className="selected-item"
    //         onClick={this.dropSelection}
    //         >
    //             <div className="x-icon"></div>
    //             <div>{this.props.selections[0].label.split("|")[0].split(",")[0] + ", " + this.props.selections[0].country}</div>
    //         </div>
    //     )
    // }

    placeLabel(){

    }


    render() {

        const inputProps = {
            placeholder: 'Type a place name',
            value: this.state.searchTerm,
            onChange: this.onChange
        };

        return (
            <div className="BirthPlaces module-box">
                <h3 className="title">Birth places</h3>

                <Cluster
                    items={this.cleanClusterData()}
                    // items={this.cleanClusterData()}
                    // allItems={this.props.allBirthPlaces}
                    itemDict={this.props.birthPlaces}
                    selections={this.props.selections}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                    updateSelections={this.props.updateSelections}
                ></Cluster>

                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    onSuggestionSelected={this.onSuggestionSelected}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                ></Autosuggest>

                {/* <div className="hover-text">
                    {this.renderHoverField()}
                </div> */}
                <HoverText
                    dropCallback={this.dropSelection}
                    selections={this.props.selections}
                    hoverText={this.state.hoverText}
                    label={this.label()}
                ></HoverText>

            </div>
        );
    }
}