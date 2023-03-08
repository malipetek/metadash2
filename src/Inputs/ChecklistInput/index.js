import React from 'react';
// import CheckboxInput from "../CheckboxInput";
// import GenericInput from "../GenericInput";

import Autosuggest from 'react-autosuggest';

export default class extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
            // items: props.items,
            suggestions: [],
            selections:[]
        }

        // react-autosuggest functions
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.renderSectionTitle = this.renderSectionTitle.bind(this);
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        const ret = inputLength === 0 ? [] : this.props.items.filter(item =>{
            return item.label.toLowerCase().slice(0, inputLength) === inputValue

        });
        return ret;
    };

    getSuggestionValue(suggestion) {
        return suggestion.value;
    }

    renderSuggestion(suggestion) {
        return (
            <div>
                {suggestion.label}
            </div>
        );
    }

    onChange = (event, { newValue , method}) => {

        var selections = this.state.selections.slice();
        if (method === "click" || method === "enter") { selections.push(newValue)}

        this.setState({
            value: newValue,
            selections: selections
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    
    renderSectionTitle(_) {
        return (null);
    }

    render() {
        const { suggestions, value } = this.state;
        const inputProps = {
            placeholder: 'Begin typing',
            value,
            onChange: this.onChange,
        };
        return (
            <div>
                <div>
                    {this.state.selections.map(item=>{
                        return (<div>{item}</div>)
                    })}
                </div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        );
    }

}
