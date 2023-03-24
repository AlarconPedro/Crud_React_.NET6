import React from "react";

import Mestre from "../../layout/Mestre/Mestre";

import { Link } from "react-router-dom";

import "./Home.css";

export default props =>
    <Mestre icon="home" title="Dashboard" subtitle="Painel Sou+Fit">
        <div className="row">
            <div className="col-12">
                <div className="jumbotron">
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Este é o seu painel de controle.</p>
                    <hr className="my-4" />
                    <div className="row home">
                        <div className="column">
                            <p className="lead">
                                <Link to={"/alunos"}>
                                    <a className="btn btn-primary btn-lg" href="" role="button">
                                        <i className="fa fa-users"></i> Gerenciar Alunos
                                    </a>
                                </Link>
                            </p>
                            <p className="lead">
                                <Link to={"/treinadores"}>
                                    <a className="btn btn-primary btn-lg" href="" role="button">
                                        <i className="fa fa-users"></i> Gerenciar Treinadores
                                    </a>
                                </Link>
                            </p>
                            <p className="lead">
                                <Link to={"/desafios"}>
                                    <a className="btn btn-primary btn-lg" href="" role="button">
                                        <i className="fa fa-users"></i> Gerenciar Desafios
                                    </a>
                                </Link>
                            </p>
                        </div>
                        <div className="column">
                            <p className="lead">
                                <Link to={"/eventos"}>
                                    <a className="btn btn-primary btn-lg" href="" role="button">
                                        <i className="fa fa-users"></i> Gerenciar Eventos
                                    </a>
                                </Link>
                            </p>
                            <p className="lead">
                                <Link to={"/notificacao"}>
                                    <a className="btn btn-primary btn-lg" href="" role="button">
                                        <i className="fa fa-users"></i> Gerenciar Notificações
                                    </a>
                                </Link>
                            </p>
                            <p className="lead">
                                <Link to={"/modalidades"}>
                                    <a className="btn btn-primary btn-lg" href="" role="button">
                                        <i className="fa fa-users"></i> Gerenciar Modalidades
                                    </a>
                                </Link>
                            </p>
                        </div>
                        <div className="column">
                            <p className="lead">
                                <Link to={"/medalhas"}>
                                    <a className="btn btn-primary btn-lg" href="" role="button">
                                        <i className="fa fa-users"></i> Gerenciar Medalhas
                                    </a>
                                </Link>
                            </p>
                            <p className="lead">
                                <Link to={"/calendario"}>
                                    <a className="btn btn-primary btn-lg" href="" role="button">
                                        <i className="fa fa-users"></i> Gerenciar Calendário
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Mestre>