import React from "react";

import Mestre from "./Mestre/Mestre";
import Busca from "./Objetos/Busca";
import ControlePaginas from "../funcoes/ControlePagina";

class Modelo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrir: false,
            urlApi: "",
            variaveis: [...this.props.variaveis],
            icone: "",
            titulo: "",
            subtitulo: "",
            Cabecalho: "",
            BotaoAdd: "",
            pagina: 1,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.icone !== this.props.icone) {
            this.setState({ icone: this.props.icone });
        }
        if (prevState.titulo !== this.props.titulo) {
            this.setState({ titulo: this.props.titulo });
        }
        if (prevState.subtitulo !== this.props.subtitulo) {
            this.setState({ subtitulo: this.props.subtitulo });
        }
        if (prevState.Cabecalho !== this.props.Cabecalho) {
            this.setState({ Cabecalho: this.props.Cabecalho });
        }
        if (prevState.BotaoAdd !== this.props.BotaoAdd) {
            this.setState({ BotaoAdd: this.props.BotaoAdd });
        }
        if (prevState.urlApi !== this.props.urlApi) {
            this.setState({ urlApi: this.props.urlApi });
        }
        if (prevState.variaveis !== this.props.variaveis) {
            this.setState({ variaveis: this.props.variaveis });
        }
    }
    
    abrirFecharCadastro = () => {
        this.setState({ abrir: this.state.abrir });
        this.props.funcAbrir(this.state.abrir);
    }

    render() {
        return (
            <Mestre icon={this.state.icone} title={this.state.titulo} subtitle={this.state.subtitulo}>
                <div className="alunos-container">
                    <header>
                        <h3>{this.state.Cabecalho}</h3>
                        <button className="btn btn-success btn-adicionar" onClick={() => this.abrirFecharCadastro()}><strong>+</strong>{this.state.BotaoAdd}</button>
                    </header>
                    <hr />
                    <Busca buscar={this.props.getByNome} />
                    <br />
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {this.props.colunas.map((coluna, index) => {
                                    return (
                                        <th key={index}>{coluna.nome}</th>
                                    )
                                })}
                                <th className="acoes">Ações</th>
                            </tr>
                        </thead>
                        {this.props.children}
                    </table>
                    <hr />
                    <br />
                    <ControlePaginas 
                        pagina={this.state.pagina}
                        dadosApi={this.props.dadosApi}
                        getAlunos={this.props.getAlunos}
                    />
                </div>
            </Mestre >
        )
    }
}

export default Modelo;