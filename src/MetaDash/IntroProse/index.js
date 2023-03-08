import React from 'react';
import "./style/main.scss";
import numeral from "numeral";


export default class extends React.Component {

    constructor(props) {
        super(props);

        this.genderString = this.genderString.bind(this);
        this.yearRangeString = this.yearRangeString.bind(this);
        this.languagesString = this.languagesString.bind(this);
        this.programString = this.programString.bind(this);
        this.birthplaceString = this.birthplaceString.bind(this);

    }

    genderString() {
        if (this.props.filters.gender.length < 1) { return "men and women" }
        const men = this.props.filters.gender.indexOf("Men") >= 0,
            women = this.props.filters.gender.indexOf("Women") >= 0,
            both = this.props.filters.gender.indexOf("Both") >= 0;

        let term = "people"
        if (men && women) { term = "women and men" }
        else if (men) { term = "men" }
        else if (women) { term = "women" }
        else if (both) { term = "women and men testifying together" }

        return (
            <span>
                by <span className="stat">{term}</span>
            </span>
        )

    }

    yearRangeString(arr) {

        if (!arr) { return (null) }


        if (arr[0] === arr[1]) {
            return (<span>
                in <span className="stat">{arr[0]}</span>
            </span>)
        }

        return (<span>
            between <span className="stat">{arr.join(" and ")}</span>
        </span>)
    }

    birthplaceString() {
        // the data is too inaccurate at this point

        return (null);


        // const cityCount = Object.keys(this.props.summaryData.birthCities).length;
        // const countryCount = Object.keys(this.props.summaryData.birthCountries).length;

        // const cityPart = (
        //     <span>from <span className="stat">{cityCount} cities</span></span>
        // );

        // const countryPart = (
        //     <span>from <span className="stat">{cityCount} countries</span></span>
        // );

        // if (cityCount > 0 && countryCount > 0){
        //     return <span>{cityPart} and {countryPart}</span>
        // }
    }

    languagesString() {
        const languageCount = Object.keys(this.props.summaryData.languages).length;
        return (
            <span>
                across <span className="stat">{numeral(languageCount).format("0,0")} {languageCount > 1 ? "languages" : "language"}</span>
            </span>
        )
    }

    programString() {
        const affiliateCount = Object.keys(this.props.summaryData.programs).length;
        return (
            <span>
                by <span className="stat">{numeral(affiliateCount).format("0,0")} {affiliateCount > 1 ? "affilate programs" : "affiliate program"}</span>
            </span>
        )
    }



    render() {

        // This data dashboard visualizes 
        // {this.propse.items.length} testimonies 
        // by {men/women/men and women}
        // born in {yearmin, yearmax}

        return (
            <div className="IntroProse">
                This data dashboard visualizes
            &nbsp;<span className="stat">{numeral(this.props.items.length).format("0,0")} testimonies</span>
                &nbsp;{this.genderString()}
                &nbsp;born {this.yearRangeString(this.props.filters.dateRanges.birth || [this.props.BIRTH_MIN, this.props.BIRTH_MAX])}
                &nbsp;{this.birthplaceString()}
                &nbsp;who were interviewed {this.yearRangeString(this.props.filters.dateRanges.recording || [this.props.RECORDING_MIN, this.props.RECORDING_MAX])}
                &nbsp;{this.languagesString()}
                &nbsp;{this.programString()}.
            </div>
        );
    }
}