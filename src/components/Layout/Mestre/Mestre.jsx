import React, { Component } from 'react';

import "./Mestre.css";

import Header from '../Estrutura/Header';

import Session from "../../../Session";

export default function Mestre(props) {
    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    const { isIdle } = Session();

    if (isIdle) {
        logout();
    }

    return (
        <React.Fragment>
            <Header {...this.props} />
            <main className="content container-fluid">
                <div className="p-3 mt-3">
                    {this.props.children}
                </div>
            </main>
        </React.Fragment>
    );

}
// export default props => {
//     return (
//         <React.Fragment>
//             <Header {...props} />
//             <main className="content container-fluid">
//                 <div className="p-3 mt-3">
//                     {props.children}
//                 </div>
//             </main>
//         </React.Fragment>
//     )
// };