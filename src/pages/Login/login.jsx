import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./login.css";

import Imagem from "../../assets/imgs/logo.png";

export default login => {
    return (
        <div className="container">
            <div className="col-5">
                <div className="imagemLogin">
                    <img src={Imagem} />
                </div>
                <div className="container-login">
                    <div className="col-12">
                        <form>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" className="form-control" placeholder="Digite seu email" />
                            </div>
                            <div className="form-group">
                                <label>Senha:</label>
                                <input type="password" className="form-control" placeholder="Digite sua senha" />
                            </div>
                            <hr />
                            <div className="botaoEntrar">
                                <button type="submit" className="btn btn-success">Entrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}