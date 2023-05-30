import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import Mestre from "../../components/Layout/Mestre/Mestre";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";

import FormInserir from "../../components/Forms/FormInserir";
import FormEditar from "../../components/Forms/FormEditar";
import FormExcluir from "../../components/Forms/FormExcluir";
import FormParticipantes from "../../components/Forms/FormParticipantes";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';
import ConverteData from "../../funcoes/ConverteData";

import Modelo from "../../components/Layout/Modelo";

import { eventoUrl, alunoUrl } from "../../services/Imagens";
import { BsJustify } from "react-icons/bs";

import "./EventosCrud.css";

class Eventos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrirCadastroEventos: false,
            abrirEditarEventos: false,
            abrirExcluirEventos: false,
            abrirParticipantes: false,
            updateEventos: false,
            carregando: false,
            eventosData: [],
            evento: {
                eveCodigo: 0,
                eveNome: '',
                eveDescricao: '',
                eveDataInicio: new Date("01/01/1900"),
                eveDataFim: new Date("01/01/1900"),
                eveImagem: '',
                eveId: '',
                treCodigo: 1,
                eveExclusivoAluno: false,
                eveDataInicioExibicao: new Date("01/01/1900"),
                tbAlunoEventos: [],
                treCodigoNavigation: null
            },
            eventoInitialState: {
                eveCodigo: 0,
                eveNome: '',
                eveDescricao: '',
                eveDataInicio: new Date("01/01/1900"),
                eveDataFim: new Date("01/01/1900"),
                eveImagem: '',
                eveId: '',
                treCodigo: 1,
                eveExclusivoAluno: false,
                eveDataInicioExibicao: new Date("01/01/1900"),
                tbAlunoEventos: [],
                treCodigoNavigation: null
            },
        }
    }

    abrirFecharCadastroEventos = (abrir) => {
        this.setState({ abrirCadastroEventos: !this.state.abrirCadastroEventos || !abrir });
    }

    abrirFecharEditarEventos = (abrir) => {
        this.setState({ abrirEditarEventos: !this.state.abrirEditarEventos || !abrir });
    }

    abrirFecharExcluirEventos = (abrir) => {
        this.setState({ abrirExcluirEventos: !this.state.abrirExcluirEventos || !abrir });
    }

    abrirFecharParticipantes = (abrir) => {
        this.setState({ abrirParticipantes: !this.state.abrirParticipantes || !abrir });
    }

    selecionarEvento = (evento, opcao) => {
        this.setState({ evento: evento });
        if (opcao === "Participantes") {
            this.abrirFecharParticipantes();
        } else if (opcao === "Editar") {
            this.abrirFecharEditarEventos();
            this.getEventoById(evento.eveCodigo);
        } else {
            this.abrirFecharExcluirEventos();
        }
    }

    atualizaCampo = e => {
        const { name, value } = e.target;
        this.setState({
            evento: {
                ...this.state.evento,
                [name]: value
            }
        });
    }

    atualizaCampoDataInicio = e => {
        this.setState({
            evento: {
                ...this.state.evento,
                eveDataInicio: e
            }
        });
    }

    atualizaCampoDataFim = e => {
        this.setState({
            evento: {
                ...this.state.evento,
                eveDataFim: e
            }
        });
    }

    atualizaCampoDataInicioExibicao = e => {
        this.setState({
            evento: {
                ...this.state.evento,
                eveDataInicioExibicao: e
            }
        });
    }

    atualizaCampoAtivo = e => {
        // const { name, value } = e.target;
        this.setState({
            evento: {
                ...this.state.evento,
                eveExclusivoAluno: e.target.checked
            }
        });
    }

    getEventos = async (skip = 0) => {
        this.setState({ carregando: true });
        await Api.get(`evento?skip=${skip}`).then(response => {
            this.setState({ eventosData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getEventoById = async (codigo) => {
        this.setState({ carregando: true });
        await Api.get("evento/" + codigo).then(response => {
            this.setState({ evento: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    postEvento = async () => {
        // ConverteData(this.state.dataAtual);
        await Api.post("evento/", this.state.evento).then(response => {
            this.setState({ evento: response.data });
            this.setState({ updateEventos: true });
            this.abrirFecharCadastroEventos(true);
        }).catch(error => {
            console.log(error);
        });
        this.setState({ evento: this.state.eventoInitialState });
    }

    putEvento = async (codigo = this.state.evento.aluCodigo) => {
        ConverteData(this.state.dataAtual);
        await Api.put("evento/" + codigo, this.state.evento).then(response => {
            var alunosAuxiliar = this.state.eventosData;
            alunosAuxiliar.map(alunoMap => {
                if (alunoMap.aluCodigo === this.state.evento.aluCodigo) {
                    alunoMap.aluNome = this.state.evento.aluNome;
                    alunoMap.aluDataNasc = this.state.evento.aluDataNasc;
                    alunoMap.aluEmail = this.state.evento.aluEmail;
                    alunoMap.aluSenha = this.state.evento.aluSenha;
                    alunoMap.treCodigo = this.state.evento.treCodigo;
                    alunoMap.aluOneSignalId = this.state.evento.aluOneSignalId;
                    alunoMap.aluImagem = this.state.evento.aluImagem;
                    alunoMap.aluId = this.state.evento.aluId;
                    alunoMap.aluFone = this.state.evento.aluFone;
                    alunoMap.aluSexo = this.state.evento.aluSexo;
                    alunoMap.aluAtivo = this.state.evento.aluAtivo;
                    alunoMap.aluObs = this.state.evento.aluObs;
                    alunoMap.aluStravaCode = this.state.evento.aluStravaCode;
                    alunoMap.aluStravaToken = this.state.evento.aluStravaToken;
                    alunoMap.aluStravaRefreshToken = this.state.evento.aluStravaRefreshToken;
                    alunoMap.aluStravaExpiresAt = this.state.evento.aluStravaExpiresAt;
                    alunoMap.aluStravaExpiresIn = this.state.evento.aluStravaExpiresIn;
                    alunoMap.aluStravaScope = this.state.evento.aluStravaScope;
                    alunoMap.aluStravaTokenType = this.state.evento.aluStravaTokenType;
                }
                return alunoMap;
            });
            this.setState({ eventosData: alunosAuxiliar });
            this.setState({ updateEventos: true });
        }).catch(error => {
            console.log(error);
        });
    }

    deleteEvento = async () => {
        await Api.delete("evento/" + this.state.evento.eveCodigo).then(response => {
            this.setState({ updateEventos: true });
            this.abrirFecharExcluirEventos(true);
        }).catch(error => {
            console.log(error);
        });
    }

    getEventosNome = async (busca) => {
        this.setState({ carregando: true });
        await Api.get("evento/" + busca).then(response => {
            this.setState({ eventosData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    componentDidMount() {
        this.getEventos();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.updateEventos !== this.state.updateEventos) {
            this.getEventos();
            this.setState({ updateEventos: false });
        }

        if (prevState.evento !== this.state.evento) {
            this.setState({ evento: this.state.evento });
        }

        if (prevState.eventosData !== this.state.eventosData) {
            this.setState({ eventosData: this.state.eventosData });
        }

        if (prevState.carregando !== this.state.carregando) {   
            this.setState({ carregando: this.state.carregando });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Modelo
                    urlApi="evento?skip="
                    titulo="Cadastro Eventos"
                    subtitulo="Painel Sou+Fit"
                    icone="bullhorn"
                    tipoContainer="form-container"
                    Cabecalho="Eventos"
                    BotaoAdd="Adicionar Eventos"
                    dadosApi={this.state.eventosData}
                    getDados={this.getEventos}
                    getByNome={this.getEventosNome}
                    funcAbrirCadastro={this.abrirFecharCadastroEventos}
                    colunas={[
                        { nome: "Imagem" },
                        { nome: "Nome" },
                        { nome: "Inicio" },
                        { nome: "Fim" },
                        { nome: "Só Alunos" },
                        { nome: "Qtd. Participantes" },
                        { nome: "Participantes" },
                    ]}
                >
                    {this.state.carregando ? <div className="spinner-border loader" role="status"></div>
                        :
                        <tbody>
                            {this.state.eventosData.map((evento) => (
                                <tr key={evento.eveCodigo}>
                                    <td className="pt-3"><img src={eventoUrl + evento.eveImagem} alt="" /></td>
                                    <td className="pt-3">{evento.eveNome}</td>
                                    <td className="pt-3">{ConverteData(evento.eveDataInicio)}</td>
                                    <td className="pt-3">{ConverteData(evento.eveDataFim)}</td>
                                    <td className="pt-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" checked={evento.eveExclusivoAluno} value={true} />
                                        </div>
                                    </td>
                                    <td className="pt-3 pl-5">{evento.total}</td>
                                    <td className="pl-5 pt-3 listar" onClick={() => this.selecionarEvento(evento, "Participantes")}><BsJustify /></td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => this.selecionarEvento(evento, "Editar")}>
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => this.selecionarEvento(evento, "Excluir")}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </Modelo>

                <FormParticipantes
                    abrir={this.state.abrirParticipantes}
                    funcAbrir={this.abrirFecharParticipantes}
                    codigoDesafio={this.state.evento.eveCodigo}
                    alunoUrl={alunoUrl}
                />

                <FormInserir
                    nome={"Eventos"}
                    abrir={this.state.abrirCadastroEventos}
                    funcPost={this.postEvento}
                    funcAbrir={this.abrirFecharCadastroEventos}
                >
                    <form className="row g-3 form-group">
                        <div className="col-md-6">
                            <label className="form-label mb-0">Nome:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nome Desafio"
                                name="eveNome"
                                onChange={e => this.atualizaCampo(e)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mb-0">Data Início:</label>
                            <DatePicker
                                className="form-control"
                                name="eveDataInicio"
                                selected={new Date(this.state.evento.eveDataInicio)}
                                onChange={date => this.atualizaCampoDataInicio(date)}
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
                            <label className="form-label mb-0">Data Fim:</label>
                            <DatePicker
                                className="form-control"
                                name="eveDataFim"
                                selected={new Date(this.state.evento.eveDataFim)}
                                onChange={date => this.atualizaCampoDataFim(date)}
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
                            <label className="form-label mb-0 mt-2">Início Exibição:</label>
                            <DatePicker
                                className="form-control"
                                name="eveDataInicioExibicao"
                                selected={new Date(this.state.evento.eveDataInicioExibicao)}
                                onChange={date => this.atualizaCampoDataInicioExibicao(date)}
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
                        <div className="col-md-6 mt-2">
                            <label className="form-label mb-0">Descrição:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Obs."
                                name="eveDescricao"
                                onChange={e => this.atualizaCampo(e)}
                            />
                        </div>
                        <div className="col-2 mt-5">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck"
                                    name="eveExclusivoAluno"
                                    onChange={e => this.atualizaCampoAtivo(e)}
                                    value={true} />
                                <label className="form-check-label">Exclusivo Aluno</label>
                            </div>
                        </div>

                    </form>
                </FormInserir>

                <FormEditar
                    nome={"Eventos"}
                    abrir={this.state.abrirEditarEventos}
                    funcPut={this.putEvento}
                    funcAbrir={this.abrirFecharEditarEventos}
                >
                    <form className="row g-3 form-group">
                        <div className="col-md-6">
                            <label className="form-label mb-0">Nome:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nome Desafio"
                                name="eveNome"
                                value={this.state.evento.eveNome}
                                onChange={e => this.atualizaCampo(e)}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mb-0">Data Início:</label>
                            <DatePicker
                                className="form-control"
                                name="eveDataInicio"
                                selected={new Date(this.state.evento.eveDataInicio)}
                                onChange={date => this.atualizaCampoDataInicio(date)}
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
                            <label className="form-label mb-0">Data Fim:</label>
                            <DatePicker
                                className="form-control"
                                name="eveDataFim"
                                selected={new Date(this.state.evento.eveDataFim)}
                                onChange={date => this.atualizaCampoDataFim(date)}
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
                            <label className="form-label mb-0 mt-2">Início Exibição:</label>
                            <DatePicker
                                className="form-control"
                                name="eveDataInicioExibicao"
                                selected={new Date(this.state.evento.eveDataInicioExibicao)}
                                onChange={date => this.atualizaCampoDataInicioExibicao(date)}
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
                        <div className="col-md-6 mt-2">
                            <label className="form-label mb-0">Descrição:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Obs."
                                name="eveDescricao"
                                value={this.state.evento.eveDescricao}
                                onChange={e => this.atualizaCampo(e)}
                            />
                        </div>
                        <div className="col-2 mt-5">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck"
                                    name="eveExclusivoAluno"
                                    checked={this.state.evento.eveExclusivoAluno}
                                    onChange={e => this.atualizaCampoAtivo(e)}
                                    value={true} />
                                <label className="form-check-label">Exclusivo Aluno</label>
                            </div>
                        </div>
                    </form>
                </FormEditar>

                <FormExcluir
                    nome={"Eventos"}
                    dados={this.state.evento.eveNome}
                    abrir={this.state.abrirExcluirEventos}
                    funcDelete={this.deleteEvento}
                    funcAbrir={this.abrirFecharExcluirEventos}
                />
            </React.Fragment>
        )
    }
}

export default Eventos;