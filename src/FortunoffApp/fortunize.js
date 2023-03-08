import React from 'react';
import "./style/main.scss";

export default function fortunize(WrappedApp) {

    return class extends React.Component {
        render() {
            return (<div className="FortunoffApp">
                <WrappedApp></WrappedApp>
            </div>);
        }
    }
}