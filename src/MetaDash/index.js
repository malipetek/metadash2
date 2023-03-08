import React from 'react';

// import { TagFilter, RangeSlider } from '../Inputs';
// import { BarChart, DonutChart } from "../Viz";

// import OverviewBillboard from "./OverviewBillboard";
import IntroProse from "./IntroProse";
import Gender from "./Gender";
import Languages from "./Languages";
import BirthAndRecordingYear from "./BirthAndRecordingYears";
import SubjectHeadings from "./SubjectHeadings";
import Programs from "./Programs";
import Interviewers from "./Interviewers";
import BirthPlaces from "./BirthPlaces";
import Results from "./Results";
import { objectToArray, arrayToObject } from "./Common";
import pym from "pym.js";

import "./style/main.scss";

const data = require("../Data");
const BIRTH_MIN = 1890;
const BIRTH_MAX = 1945;
const RECORDING_MIN = 1970;
const RECORDING_MAX = 2020;

const DEFAULT_FILTERS = {
    "gender": ["Men", "Women", "Both"],
    "birthYear": [],
    "birthCountry": [],
    "language": [],
    "yearRecorded": [],
    "subjects": [],
    "interviewers": [],
    "programs": [],
    "dateRanges": {}
};

export default class extends React.Component {

    constructor(props) {

        super(props);
        this.fullData = data.getData();

        this.state = {
            ...this.fullData,
            // resources: data.resources.query(),
            // summaryData: summaryData,
            filters: DEFAULT_FILTERS,
        }


        this.setFilters = this.setFilters.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.updateFilterFactory = this.updateFilterFactory.bind(this);
        this.pymChild = new pym.Child({ polling: 50});

    }

    setFilters(filters) {
        filters = filters || DEFAULT_FILTERS;
        const { resources, subjects, summaryData } = data.getData(filters);

        this.setState({
            filters,
            resources,
            subjects,
            summaryData
        })
    }

    clearFilters() { this.setFilters() }

    updateFilterFactory(key) {
        return val => {
            var filters = { ...this.state.filters }
            filters[key] = val;
            this.setFilters(filters);

            // --- MOVED TO setFilters --
            // const { resources, subjects, summaryData } = data.getData(filters);

            // this.setState({
            //     filters: filters,
            //     resources,
            //     subjects,
            //     summaryData
            // });
        }
    }

    render() {

        console.log("MetaDash.render state", this.state);

        let genderSubjects = [];
        Object.keys(this.state.summaryData.subjects).forEach(s => {
            if (["Men", "Women"].indexOf(this.state.summaryData.subjects[s].label) >= 0) {
                genderSubjects.push(this.state.summaryData.subjects[s]);
            }
        })

        return (
            <div className="MetaDash">

                <section className="prose intro-prose-section">
                    <IntroProse
                        items={this.state.resources}
                        filters={this.state.filters}
                        summaryData={this.state.summaryData}
                        BIRTH_MIN={BIRTH_MIN}
                        BIRTH_MAX={BIRTH_MAX}
                        RECORDING_MIN={RECORDING_MIN}
                        RECORDING_MAX={RECORDING_MAX}

                    ></IntroProse>
                </section>

                <section className="module-area">

                    {/* <OverviewBillboard
                        testimonyCount={this.state.resources.length}
                    ></OverviewBillboard> */}
                    <div className="text-menu">
                        <div
                            className="item"
                            onClick={this.clearFilters}
                        >Clear filters</div>
                        <div className="item">Documentation</div>
                    </div>

                    <Gender
                        updateSelections={this.updateFilterFactory("gender")}
                        men={this.state.summaryData.gender.men.count}
                        women={this.state.summaryData.gender.women.count}
                        both={this.state.summaryData.gender.both.count}
                    ></Gender>

                    <Languages
                        updateSelections={this.updateFilterFactory("language")}
                        selections={this.state.filters.language}
                        items={objectToArray(this.state.summaryData.languages)}
                        itemDict={this.state.summaryData.languages}
                        allItems={objectToArray(this.fullData.summaryData.languages)}
                    ></Languages>

                    <BirthAndRecordingYear
                        // height={200}
                        minYear={BIRTH_MIN}
                        maxYear={RECORDING_MAX}
                        BIRTH_MIN={BIRTH_MIN}
                        BIRTH_MAX={BIRTH_MAX}
                        RECORDING_MIN={RECORDING_MIN}
                        RECORDING_MAX={RECORDING_MAX}
                        updateSelections={this.updateFilterFactory("dateRanges")}
                        selections={this.state.filters.dateRanges}
                        subsetMode={this.fullData.resources.length > this.state.resources.length}
                        data={
                            Object.keys(this.state.summaryData.birthYears)
                                .map(k => this.state.summaryData.birthYears[k])
                                // TODO - the data needs to be cleaned up 
                                // so we don't need to manually exclude stuff
                                .filter(yrs => yrs.label >= BIRTH_MIN && yrs.label <= BIRTH_MAX)
                                .map(a => { return { ...a, barClass: "birth" } })
                                .concat(
                                    Object.keys(this.state.summaryData.recordingYears)
                                        .map(k => this.state.summaryData.recordingYears[k])
                                        .filter(yrs => yrs.label >= RECORDING_MIN && yrs.label <= RECORDING_MAX)
                                        .map(a => { return { ...a, barClass: "recording" } })
                                )
                        }
                    ></BirthAndRecordingYear>

                    <BirthPlaces
                        updateSelections={this.updateFilterFactory("birthplaces")}
                        selections={this.state.filters.birthplaces}
                        birthPlaces={this.state.summaryData.birthPlaces}
                        allBirthPlaces={this.fullData.summaryData.birthPlaces}
                        placeholder="Search for a city..."
                    ></BirthPlaces>

                    <Interviewers
                        interviewers={this.state.summaryData.interviewers}
                        allInterviewers={this.fullData.summaryData.interviewers}
                        updateSelections={this.updateFilterFactory("interviewers")}
                        selections={this.state.filters.interviewers}
                        selectionsDict={arrayToObject(this.state.filters.interviewers)} // TODO - improve efficiency
                        // allInterviewers={ data.interviewers.search() } // TODO - improve efficiency
                        filterItems={t => {
                            // 6-3-19 - just updated to return both an array and a dictionary
                            // so it doesn't have to be retouched later on. (dict+arr+interviewers)
                            const results = data.interviewers.search((t || "").split(" "));
                            let retDict = {}
                            let retArr = results
                            .filter(i => i.id in this.state.summaryData.interviewers)
                            .map(i => { 
                                const retItem = { ...i, count: this.state.summaryData.interviewers[i.id].count }
                                retDict[i.id] = retItem;
                                return retItem;
                             })

                            return [retArr, retDict];
                            // return results
                            //     .filter(i => i.id in this.state.summaryData.interviewers)
                            //     .map(i => { return { ...i, count: this.state.summaryData.interviewers[i.id].count } })
                        }}
                    ></Interviewers>

                    <Programs
                        updateSelections={this.updateFilterFactory("programs")}
                        selections={this.state.filters.programs}
                        allItems={this.state.summaryData.programs}
                        programs={this.state.summaryData.programs}
                        filterItems={data.programs.search}
                        placeholder="Begin searching programs...">
                    </Programs>

                </section>

                <section className="headings-area">
                    <SubjectHeadings
                        title="Subjects"
                        updateSelections={this.updateFilterFactory("subjects")}
                        selections={this.state.filters.subjects}
                        allItems={this.state.summaryData.subjects}
                        filterItems={data.subjects.search}
                        placeholder="Begin searching subjects...">
                    </SubjectHeadings>
                </section>

                <section className="results-section">
                    <Results
                        pymChild={this.pymChild}
                        programs={this.state.summaryData.programs}
                        results={this.state.resources}
                    ></Results>
                </section>
            </div >
        );
    }

}
