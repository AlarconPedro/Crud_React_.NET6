import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./login.css";
import { useNavigate, Routes, Route } from "react-router-dom";

import Imagem from "../../assets/imgs/logo.png";

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();
    
    async function logarSistema(event) {
        event.preventDefault();

        const data = {
            email,
            senha
        }

        navigate("/home");
    }

    return (
        <div className="container">
            <div className="col-5">
                <div className="imagemLogin">
                    <img src={Imagem} />
                </div>
                <div className="container-login">
                    <div className="col-12">
                        <form onSubmit={logarSistema}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" className="form-control" placeholder="Digite seu email" 
                                    value={email} onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Senha:</label>
                                <input type="password" className="form-control" placeholder="Digite sua senha" 
                                    value={senha} onChange={e => setSenha(e.target.value)}
                                />
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