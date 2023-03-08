import React from 'react';
import "./style/main.scss";

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
    }

    handleSelection(item) {
        this.props.updateSelections(this.props.items.filter(i => i.id === item.target.value))
    }

    clearSelection() {
        this.props.updateSelections([])
    }

    render() {

        const selected = this.props.selections && this.props.selections.length === 1 ? this.props.selections[0] : { id: "ALL" };
        // const clearButtonText = selected.id === "ALL" ? "" : "╳"
        const subClass = selected.id === "ALL" ? "arrow" : "x"
        // const active = selected.id !== "ALL"
        let buttonClass = "clear-button";
        buttonClass = "dropdown-icon " + subClass;

        if (selected.id !== "ALL") { buttonClass += " enabled" }
        return (
            <div className="ItemSelector">

                <select
                    className={subClass + " dropdown-icon"}
                    defaultValue={selected.ID}
                    onChange={this.handleSelection}>
                    <option
                        onClick={this.clearSelection}
                        value="all"
                    >{this.props.placeholder || "All items"}</option>

                    {this.props.items.map((item, i) => {
                        const optionProps = {
                            // selected: selected.id === item.id,
                            value: item.id
                        }
                        return (
                            <option
                                key={i}
                                {...optionProps}>{item.label}</option>
                        )
                    })}
                </select>

                <div className={"button " + buttonClass} onClick={this.clearSelection}>
                </div>

            </div>
        );
    }

}
