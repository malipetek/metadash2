import React from 'react';

export default function wrapResultListItem(WrappedComponent, key){

    return (
        <div key={key} className="ResultListItem">
            {WrappedComponent}
        </div>
    )
    // return class extends React.Component {
    //     render(){return (
    //         <div className="ResultListItem">
    //         </div>
    //     )}
    // }

}
