import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./login.css";

import Imagem from "../../assets/imgs/logo.png";

import Api from "../../services/Api";

// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: "",
//             senha: ""
//         }

//         this.acessar = this.acessar.bind(this);
//     }

//     async acessar() {
//         await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha).then(() => {
//             //  alert("Usuário logado com sucesso!");
//             window.location.href = "./home";
//         }).catch((error) => {
//             if (error.code === 'auth/invalid-email') {
//                 alert("O e-mail digitado é inválido!");
//             }
//             if (error.code === 'auth/user-not-found') {
//                 alert("O e-mail digitado não está cadastrado!");
//             }
//             if (error.code === 'auth/wrong-password') {
//                 alert("A senha digitada está incorreta!");
//             }
//         });
//     }

//     logarSistema(event) {
//         event.preventDefault();

//         // this.acessar();
//         // this.Logar();
//         window.location.href = "./home";
//     }

//     Logar = async () => {
//         await Api.get(`login/${this.state.email}/${this.state.senha}`).then(response => {
//             // var response = response.data;
//             var response = response.status;
//             if (response === 200) {
//                 window.location.href = "./home";
//                 // navigate("/home");
//             } else {
//                 alert("Email ou senha inválidos!");
//             }
//         }).catch(error => {
//             console.log(error);
//         });
//         // const { data } = response;
//         // localStorage.setItem("token", data.token);
//         // localStorage.setItem("usuario", JSON.stringify(data.usuario));
//     }

//     render() {
//         return (
//             <div className="container">
//                 <div className="col-5">
//                     <div className="imagemLogin">
//                         <img src={Imagem} />
//                     </div>
//                     <div className="container-login">
//                         <div className="col-12">
//                             <form onSubmit={this.logarSistema}>
//                                 <div className="form-group">
//                                     <label>Email:</label>
//                                     <input type="email" className="form-control" placeholder="Digite seu email"
//                                         value={this.state.email} onChange={e => this.setState({ email: e.target.value })}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label>Senha:</label>
//                                     <input type="password" className="form-control" placeholder="Digite sua senha"
//                                         value={this.state.senha} onChange={e => this.setState({ senha: e.target.value })}
//                                     />
//                                 </div>
//                                 <hr />
//                                 <div className="botaoEntrar">
//                                     <button type="submit" className="btn btn-success">Entrar</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             // <div className="container">
//             //     <h1>Login</h1>
//             //     <label>
//             //         Usuário:
//             //         <input type="usuario" placeholder="E-mail" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
//             //     </label>
//             //     <label>
//             //         Senha:
//             //         <input type="password" id="senha" placeholder="Senha" value={this.state.senha} onChange={(e) => this.setState({ senha: e.target.value })} />
//             //     </label>
//             //     <button onClick={this.acessar} type="Acessar">Acessar</button>
//             //     <br />
//             //     <h4>
//             //         <Link to="/Cadastro">Ainda não possui cadastro? Cadastre-se aqui!</Link>
//             //     </h4>
//             // </div>
//         )
//     }
// }

// export default Login;

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [logado, setLogado] = useState(true);

    const data = {
        email: email,
        senha: senha
    };

    const navigate = useNavigate();

    function logarSistema(event) {
        event.preventDefault();

        Logar(data);
    }

    const Logar = async (data) => {
        var dados = [];
        if (data.email === "" || data.senha === "") {
            setLogado(false);
        }
        await Api.get(`login/${data.email}/${data.senha}`).then(response => {
            // var response = response.data;
            dados = response.data;
            var responseDados = response.status;
            localStorage.setItem("Nome", dados.treNome);
            localStorage.setItem("Codigo", dados.treCodigo);
            localStorage.setItem("Imagem", dados.treImagem);
            if (responseDados === 200) {
                navigate("/home");
                setLogado(true);
            } else {
                setLogado(false);
                // alert("Email ou senha inválidos!");
            }
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="container-login">
            <div className="imagemLogin">
                <img src={Imagem} alt="" />
            </div>
            {logado ? <h4></h4> : <h6 className="falha">Usuário ou Senha inválido</h6>}
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
                        <button type="submit" className="btn btn-success botao-login">Entrar</button>
                    </div>
                </form>
            </div>
        </div>

    );
}