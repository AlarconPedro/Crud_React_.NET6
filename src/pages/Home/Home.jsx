import React from "react";

import Mestre from "../../layout/Mestre/Mestre";

import { Link } from "react-router-dom";

export default props =>
    <Mestre icon="home" title="Dashboard" subtitle="Painel Sou+Fit">
        <div className="row">
            <div className="col-12">
                <div className="jumbotron">
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Este é o seu painel de controle.</p>
                    <hr className="my-4" />
                    <p className="lead">
                        <Link to={"/alunos"}>
                            <a className="btn btn-primary btn-lg" href="" role="button">
                                <i className="fa fa-users"></i> Gerenciar Alunos
                            </a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </Mestre>