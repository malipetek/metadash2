import React from 'react';
import ResponsiveOrdinalFrame from "semiotic/lib/ResponsiveOrdinalFrame";
import "./style/main.scss";

import preprocess from "./preprocess";

export default class extends React.Component {

    render() {
        const data = preprocess(this.props.data, this.props.maxItems, "count");

        const frameProps = {
            /* --- Data --- */
            data: data,

            // data: [{ label: "Jason", value: 10, retweets: 5, favorites: 15 },
            // { label: "Susie", value: 5, retweets: 100, favorites: 100 }],
            // backgroundGraphics: (null),
            responsiveWidth: true,
            hoverAnnotation: true,

            axes: [{ orient: "left" }],

            /* --- Size --- */
            size: [200, 200],

            /* --- Layout --- */
            type: "bar",

            /* --- Process --- */
            oAccessor: "label",
            rAccessor: this.props.valueField,

            /* --- Customize --- */
            style: { fill: "gray", stroke: "white" },
            /* --- Annotate --- */
            // oLabel: true
        }

        return (
            <div className="Viz">
                <ResponsiveOrdinalFrame {...frameProps} />
            </div>
        );
    }
}
