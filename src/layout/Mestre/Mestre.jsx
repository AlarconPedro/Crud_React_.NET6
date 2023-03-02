import React from 'react';

import "./Mestre.css";

import Header from '../../components/Header';

export default props => {
    return (
        <React.Fragment>
            <Header {...props} />
            <main className="content container-fluid">
                <div className="p-3 mt-3">
                    {props.children}
                </div>
            </main>
        </React.Fragment>
    )
};