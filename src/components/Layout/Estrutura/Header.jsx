import React from "react"
import "./css/Header.css"

import icone from "../../../assets/imgs/icone.png"
import { treinadorUrl } from "../../../services/Imagens";

import { BsDoorClosedFill } from 'react-icons/bs';

import { useNavigate } from "react-router-dom";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

export default function Header(props) {

    const navigate = useNavigate();

    async function sairSistema() {
        navigate("/login");
    }

    return (
    <header className="header d-none d-sm-flex flex-lg-row">
        <div className="flex-column">
            <h1 className="mt-3">
                <i className={`fa fa-${props.icon}`}></i> {props.title}
            </h1>
            <p className="lead text-muted">{props.subtitle}</p>
        </div>
        <div className="usuario">
            <div className="areaUsuario" role="button" data-toggle="dropdown" aria-expanded="false">
                <img src={treinadorUrl + localStorage.getItem("Imagem")} alt="icone" />
                <div className="usuarioLogado">
                    {/* <h6>Usuário Teste</h6> */}
                    <h6>{localStorage.getItem("Nome")}</h6>
                </div>
                {/* <ul className="dropdown-menu">
                    <button className="btn btn-danger dropdown-item" type="submit" onClick={() => sairSistema()}>
                        Sair
                    </button>
                </ul> */}
            </div>
            {/* <h1 className="usuarioLogado">
                <i className={`fa fa-${props.icon}`}></i> {props.title}
            </h1>
            <div className="sair">
                <i><BsDoorClosedFill /></i>
            </div> */}

        </div>
    </header>
    )
}