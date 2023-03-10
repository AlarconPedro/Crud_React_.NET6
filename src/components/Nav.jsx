import React from "react";

import "./css/Nav.css" 

import { Link } from "react-router-dom";

export default props => {
    return(
        <aside className="menu-lateral">
            <nav className="menu">
                <Link to={"/home"}>
                    <i className="fa fa-home"></i> Início
                </Link>
                <Link to={"/alunos"}>
                    <i className="fa fa-users"></i> Alunos
                </Link>
                <Link to={"/treinadores"}>
                    <i className="fa fa-graduation-cap"></i> Treinadores
                </Link>
            </nav>
        </aside>
    )
};