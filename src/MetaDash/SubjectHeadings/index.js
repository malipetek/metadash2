import React from 'react';
import "./style/main.scss";
import TagFilter from "../../Inputs/TagFilter";


export default class extends React.Component {

    render() {
        const props = {
            ...this.props,
            lazy: true
        };

        return (
            <div className="SubjectHeadings">
                <TagFilter {...props}></TagFilter>
            </div>);

    }
}