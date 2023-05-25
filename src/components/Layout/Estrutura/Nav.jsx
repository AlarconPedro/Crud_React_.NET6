import React from "react";

import { FaBeer } from 'react-icons/fa';
import {
    BsMegaphoneFill,
    BsFillBellFill,
    BsFillBookmarkFill,
    BsAwardFill,
    BsFillTrophyFill,
    BsFillCalendarFill
} from "react-icons/bs";

import "./css/Nav.css"

import { Link } from "react-router-dom";

import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';

export default props => {
    return (
        <aside className="menu-lateral">
            <nav className="menu">
                <Link to={"/home"}>
                    <i className="fa fa-home"></i> Início
                </Link>
                <div>
                    <p>
                        <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Cadastros
                            <i className="dropdownIcon">
                                 <i className="fa fa-caret-down"></i>
                            </i>
                        </a>
                    </p>
                </div>
                <div className="collapse" id="collapseExample">
                    <Link to={"/alunos"}>
                        <i className="fa fa-users"></i> Alunos
                    </Link>
                    <Link to={"/treinadores"}>
                        <i className="fa fa-graduation-cap"></i> Treinadores
                    </Link>
                    <Link to={"/desafios"}>
                        <i><BsFillTrophyFill /></i> Desafios
                    </Link>
                    <Link to={"/eventos"}>
                        <i><BsMegaphoneFill /></i> Eventos
                    </Link>
                    <Link to={"/notificacao"}>
                        <i><BsFillBellFill /></i> Enviar Notificação
                    </Link>
                    <Link to={"/modalidade"}>
                        <i><BsFillBookmarkFill /></i> Modalidades
                    </Link>
                    <Link to={"/medalhas"}>
                        <i><BsAwardFill /></i> Medalhas
                    </Link>
                </div>
                <Link to={"/calendario"}>
                    <i><BsFillCalendarFill /></i> Calendário
                </Link>
            </nav>
        </aside>
    )
};