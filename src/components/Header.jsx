import React from "react"
import "./css/Header.css"

import { BsDoorClosedFill } from 'react-icons/bs';

export default props =>
    <header className="header d-none d-sm-flex flex-lg-row">
        <div className="flex-column">
            <h1 className="mt-3">
                <i className={`fa fa-${props.icon}`}></i> {props.title}
            </h1>
            <p className="lead text-muted">{props.subtitle}</p>
        </div>
        <div className="usuario">
            <img src="" alt="" />
            <p></p>
            {/* <h1 className="usuarioLogado">
                <i className={`fa fa-${props.icon}`}></i> {props.title}
            </h1>
            <div className="sair">
                <i><BsDoorClosedFill /></i>
            </div> */}
        </div>
    </header>