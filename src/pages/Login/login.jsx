import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./login.css";
import { useNavigate, Routes, Route } from "react-router-dom";

import Imagem from "../../assets/imgs/logo.png";

import Api from "../../services/Api";
import { data } from "jquery";

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const data = {
        email: email,
        senha: senha
    };

    const navigate = useNavigate();

    useEffect(() => {
        Logar();
    }, [data]);

    function logarSistema(event) {
        event.preventDefault();

        Logar(data);
    }

    const Logar = async () => {
        await Api.get("login/", data).then(response => {
            var response = response.data;
            if (response === 200) {
                navigate("/home");
            } else {
                alert("Email ou senha inválidos!");
            }
        }).catch(error => {
            console.log(error);
        });
        // const { data } = response;
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("usuario", JSON.stringify(data.usuario));
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