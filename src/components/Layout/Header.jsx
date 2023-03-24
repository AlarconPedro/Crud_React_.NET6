import React from "react"
import "./css/Header.css"

import icone from "../../assets/imgs/icone.png"

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
            <div className="areaUsuario">
                {/* <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown button
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div> */}
                <img src={icone} alt="icone" />
                <div className="usuarioLogado">
                    <h6>Usuário Teste</h6>
                </div>
            </div>
            <div className="usuarioSair">
                <i><BsDoorClosedFill /></i>
            </div>
            {/* <h1 className="usuarioLogado">
                <i className={`fa fa-${props.icon}`}></i> {props.title}
            </h1>
            <div className="sair">
                <i><BsDoorClosedFill /></i>
            </div> */}

        </div>
    </header>