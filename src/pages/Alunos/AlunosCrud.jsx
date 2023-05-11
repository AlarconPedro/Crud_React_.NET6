import React, { useState, useEffect } from "react";

import Mestre from "../../layout/Mestre/Mestre";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";
import { aluno, treinador } from "../../services/RotasApi";

import FormInserir from "../../components/Crud/FormularioAluno/FormInserir";
import FormEditar from "../../components/Crud/FormularioAluno/FormEditar";
import FormExcluir from "../../components/Crud/FormularioAluno/FormExcluir";
import FormAtividades from "../Atividades/AtividadesCrud";

import { BsJustify } from "react-icons/bs";

import { Link } from "react-router-dom";

import Busca from "../../layout/Objetos/Busca";
import ConverteData from "../../funcoes/ConverteData";
import AtualizaCampo from "../../funcoes/AtualizaCampo";
import MascaraTelefone from "../../funcoes/MascaraTelefone";

import Modelo from "../Modelo";

import "./AlunosCrud.css";
import { alunoUrl, treinadorUrl } from "../../services/Imagens";

class AlunoCrud extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrir: false,
            abrirAtividades: false,
            abrirCadastroAlunos: false,
            abrirEditar: false,
            abrirExcluirAlunos: false,
            carregando: false,
            updateAlunos: false,
            alunosData: [],
            treinadoresData: [],
            sexo: [
                { id: "M", nome: 'Masculino' },
                { id: "F", nome: 'Feminino' },
            ],
            alunoInitialState: {
                aluCodigo: 0,
                aluNome: '',
                aluDataNasc: new Date("01/01/1900"),
                aluEmail: '',
                aluSenha: '',
                treCodigo: '',
                aluOneSignalId: null,
                aluImagem: '',
                aluId: '',
                aluFone: '',
                aluSexo: '',
                aluAtivo: false,
                aluObs: '',
                aluStravaCode: null,
                tbAlunoAtividades: [],
                tbAlunoDesafios: [],
                tbAlunoEventos: [],
                treCodigoNavigation: null,
            },
            aluno: {
                aluCodigo: 0,
                aluNome: '',
                aluDataNasc: new Date("01/01/1900"),
                aluEmail: '',
                aluSenha: '',
                treCodigo: '',
                aluOneSignalId: null,
                aluImagem: '',
                aluId: '',
                aluFone: '',
                aluSexo: '',
                aluAtivo: false,
                aluObs: '',
                aluStravaCode: null,
                tbAlunoAtividades: [],
                tbAlunoDesafios: [],
                tbAlunoEventos: [],
                treCodigoNavigation: null,
            }
        }
    }

    abrirFecharCadastroAlunos = (abrirCadastro) => {
        this.setState({ abrirCadastroAlunos: !abrirCadastro });
        this.setState({ aluno: this.state.alunoInitialState });
    }

    abrirFecharAtividades = (abrirAtividades) => {
        this.setState({ abrirAtividades: !abrirAtividades });
    }

    abrirFecharEditar = (abrirEditar) => {
        this.setState({ abrirEditar: !abrirEditar || !this.state.abrirEditar });
    }

    abrirFecharExcluirAlunos = (abrirExcluir) => {
        this.setState({ abrirExcluirAlunos: !abrirExcluir });
    }

    converterDataToIdade = (data) => {
        const today = new Date();

        var idade = data !== "" ? today.getFullYear() - data.substring(0, 4) : "-";
        const mes = data !== "" ? today.getMonth() - data.substring(5, 7) : "-";

        if (mes < 0 || (mes === 0 && today.getDate() < data.substring(8, 10))) {
            idade--;
        }

        return data !== "" ? idade : "-";
    }

    selecionarAluno = (aluno, opcao) => {
        this.setState({ aluno: aluno });
        if (opcao === "Atividades") {
            this.abrirFecharAtividades();
        } else if (opcao === "Editar") {
            this.abrirFecharEditar();
            this.getTreinadores();
        } else {
            this.abrirFecharExcluirAlunos();
        }
    }

     getAlunos = async (skip = 0) => {
        this.setState({ carregando: true });
        await Api.get(`${aluno}?skip=${skip}`).then(response => {
            this.setState({ alunosData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getAlunoNome = async (busca) => {
        this.setState({ carregando: true });
        await Api.get(aluno + busca).then(response => {
            this.setState({ alunosData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getTreinadores = async (skip = 0) => {
        this.setState({ carregando: true });
        await Api.get(`${treinador}?skip=${skip}`).then(response => {
            this.setState({ treinadoresData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getTreinadorId = async (id) => {
        this.setState({ carregando: true });
        await Api.get(`${treinador}${id}`).then(response => {
            this.setState({ treinadoresData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    postAluno = async () => {
        await this.dataAuxiliar(this.state.dataAtual);
        await Api.post(aluno, this.state.aluno).then(response => {
            this.setState({ aluno: response.data });
            this.setState({ updateAlunos: true });
            this.abrirFecharCadastroAlunos();
        }).catch(error => {
            console.log(error);
        });
        this.setState({ aluno: this.state.alunoInitialState });
    }

    putAluno = async () => {
        var data = await ConverteData(this.state.aluno.aluDataNasc);
        this.setState({ aluno: { ...this.state.aluno, aluDataNasc: data } });
        await Api.put(aluno + this.state.aluno.aluCodigo, this.state.aluno).then(response => {
            this.setState({ updateAlunos: true });
            this.abrirFecharEditar();
        }).catch(error => {
            console.log(error);
        });
        this.setState({ aluno: this.state.alunoInitialState });
        this.setState({ updateAlunos: true})
    }

    atualizaCampo = e => {
        const { name, value } = e.target;
        this.setState({ aluno: { ...this.state.aluno, [name]: value } });
    }

    atualizaCampoAtivo = e => {
        const { name, value } = e.target;
        this.setState({ aluno: { ...this.state.aluno, [name]: value === "true" ? true : false } });
    }

    atualizaCampoData = e => {
        this.setState({ aluno: { ...this.state.aluno, aluDataNasc: e } });
    }

    adicionarMascara = e => {
        this.setState({ aluno: { ...this.state.aluno, [e.target.name]: MascaraTelefone(e) } });
    }

    verificaSexo = (sexo) => {
        if (sexo === "M") {
            return "Masculino";
        } else if (sexo === "F") {
            return "Feminino";
        } else {
            return "Outro";
        }
    }

    componentDidMount() {
        this.setState({ carregando: true });
        this.getAlunos();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.alunosData !== this.state.alunosData) {
            this.setState({ carregando: false });
        }
        if (prevState.aluno !== this.state.aluno) {
            this.setState({ carregando: false });
        }
        if (prevState.updateAlunos !== this.state.updateAlunos) {
            this.getAlunos();
            this.setState({ updateAlunos: false });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Modelo
                    urlApi="aluno?skip="
                    titulo="Cadastro Alunos"
                    subtitulo="Painel Sou+Fit"
                    icone="user"
                    Cabecalho="Alunos"
                    BotaoAdd="Adicionar Alunos"
                    dadosApi={this.state.alunosData}
                    getAlunos={this.getAlunos}
                    getByNome={this.getAlunoNome}
                    colunas={[
                        { nome: "Avatar" },
                        { nome: "Nome" },
                        { nome: "Telefone" },
                        { nome: "Idade" },
                        { nome: "Ativo" },
                        { nome: "Atividades" },
                    ]}
                    variaveis={
                        [
                            { urlTreinador: "treinador/" },
                            { urlAluno: "aluno/" },
                            { urlAlunoSkip: "aluno?skip=" },
                        ]
                    }
                >
                    {this.state.carregando ? <div className="spinner-border loader" role="status" />
                        :
                        <tbody>
                            {this.state.alunosData.map((aluno) => (
                                <tr key={aluno.aluCodigo}>
                                    <td className=""><img src={alunoUrl + aluno.aluImagem} alt="" /></td>
                                    <td className="pt-3">{aluno.aluNome}</td>
                                    <td className="pt-3">{aluno.aluFone}</td>
                                    <td className="pt-3"><div className="idade">{this.converterDataToIdade(aluno.aluDataNasc ?? "")}</div></td>
                                    <td className="pt-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" checked={aluno.aluAtivo} value={true} />
                                        </div>
                                    </td>
                                    <Link className="text-decoration-none" to={"/atividades"} state={{ codigo: (aluno.aluCodigo) }}>
                                        <td className="pl-5 pt-3 listar" onClick={() => this.selecionarAluno(aluno, "Atividades")}><BsJustify /></td>
                                    </Link>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => this.selecionarAluno(aluno, "Editar")}>
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => this.selecionarAluno(aluno, "Excluir")}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </Modelo>
                {/* <FormInserir
                    nome={"Aluno"}
                    abrir={abrirCadastroAlunos}
                    aluDados={aluno}
                    funcPost={postAluno}
                    funcAbrir={abrirFecharCadastroAlunos}
                    funcData={dataAuxiliar}
                    funcMascara={mascaraTelefone}
                    funcAtualizaCampoAtivo={atualizaCampoAtivo}
                    funcAtualizaCampo={atualizaCampo}
                    funcSexo={sexo}
                    treinaData={treinadoresData}
                    funcBuscaTreinador={getTreinadorId}
                /> */}

                <FormEditar
                    nome={"Aluno"}
                    abrir={this.state.abrirEditar}
                    funcAbrir={this.abrirFecharEditar}
                    funcPut={this.putAluno}
                >
                    <form className="row g-3 form-group">
                        <div className="col-md-12">
                            <label className="mb-0">Id: </label>
                            <input type="number" className="form-control mb-2" readOnly disabled
                                value={this.state.aluno.aluCodigo}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label mb-0">Nome:</label>
                            <input type="text" className="form-control" placeholder="Nome Sobrenome"
                                name="aluNome"
                                onChange={e => this.atualizaCampo(e)}
                                value={this.state.aluno.aluNome}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mb-0">Data Nascimento:</label>
                            <DatePicker
                                className="form-control"
                                name="aluDataNasc"
                                selected={new Date(this.state.aluno.aluDataNasc)}
                                onChange={date => this.atualizaCampoData(date)}
                                dateFormat={"dd/MM/yyyy"}
                                timeFormat="yyyy-MM-dd"
                                customInput={
                                    <InputMask
                                        type="text"
                                        mask="99/99/9999"
                                    />
                                }
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mb-0">Sexo:</label>
                            <select className="form-select w-100 h-50"
                                name="aluSexo"
                                value={this.state.aluno.aluSexo}
                                onChange={e => this.atualizaCampo(e)}>
                                <option value=""></option>
                                {
                                    this.state.sexo.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.nome}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label mb-0 mt-2">Treinador:</label>
                            <select className="form-select w-100 h-50"
                                name="treCodigo"
                                selected={this.state.treinadoresData}
                                onChange={e => this.atualizaCampo(e)}>
                                {
                                    this.state.treinadoresData.map((item, index) => {
                                        return (
                                            <option key={item.treCodigo} value={item.treCodigo}>{item.treNome}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-6">
                            <label className="form-label mb-0 mt-2">Telefone:</label>
                            <input type="tel" class="form-control" maxLength={15}
                                name="aluFone"
                                onKeyUp={e => this.adicionarMascara(e)}
                                onChange={e => this.atualizaCampo(e)}
                                value={this.state.aluno.aluFone}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label mb-0 mt-2">Email:</label>
                            <input type="email" className="form-control" name="aluEmail"
                                onChange={e => this.atualizaCampo(e)} value={this.state.aluno.aluEmail} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mb-0 mt-2">Senha:</label>
                            <input type="password" className="form-control" name="aluSenha"
                                onChange={e => this.atualizaCampo(e)} value={this.state.aluno.aluSenha} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mb-0 mt-2">Confirmar Senha:</label>
                            <input type="password" className="form-control" name="aluSenha"
                                onChange={e => this.atualizaCampo(e)} value={this.state.aluno.aluSenha} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label mb-0">Observação:</label>
                            <input type="text" className="form-control" name="aluObs"
                                onChange={e => this.atualizaCampo(e)} value={this.state.aluno.aluObs} />
                        </div>
                        <div className="col-2 mt-5">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck"
                                    name="aluAtivo"
                                    checked={this.state.aluno.aluAtivo}
                                    onChange={e => this.atualizaCampoAtivo(e)}
                                    value={true}
                                />
                                <label className="form-check-label">Ativo</label>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <label className="form-label mb-0">Imagem:</label>
                            <input type="file" className="form-control"
                                name="treImagem" />
                            <img src={alunoUrl + this.state.aluno.aluImagem} alt="" />
                        </div>
                    </form>
                </FormEditar>

                <FormExcluir
                    nome={"Aluno"}
                    abrir={this.state.abrirExcluirAlunos}
                    aluNome={this.state.aluno && this.state.aluno.aluNome}
                    aluDados={this.state.aluno.aluCodigo}
                    // funcDelete={deleteAluno}
                    funcAbrir={this.abrirFecharExcluirAlunos}
                />
            </React.Fragment>
        )
    }
}

export default AlunoCrud;