import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import Mestre from "../../layout/Mestre/Mestre";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";

import FormInserir from "../../components/Forms/FormInserir";
import FormEditar from "../../components/Forms/FormEditar";
import FormExcluir from "../../components/Forms/FormExcluir";
import FormParticipantes from "../../components/Forms/FormParticipantes";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';
import ConverteData from "../../funcoes/ConverteData";

import Modelo from "../../layout/Modelo";

import { eventoUrl, alunoUrl } from "../../services/Imagens";
import { BsJustify } from "react-icons/bs";

import "./EventosCrud.css";

export default function EventosCrud() {

    const [carregando, setCarregando] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());

    const [eventosData, setEventosData] = useState([]);

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [eventoInitialState] = useState({
        eveCodigo: 0,
        eveNome: '',
        eveDescricao: '',
        eveDataInicio: new Date("01/01/1900"),
        eveDataFim: new Date("01/01/1900"),
        eveImagem: '',
        eveId: '',
        treCodigo: 0,
        eveExclusivoAluno: false,
        eveDataInicioExibicao: new Date("01/01/1900"),
        tbAlunoEventos: [],
        treCodigoNavigation: null,
    });


    const [evento, setEvento] = useState({
        eveCodigo: 0,
        eveNome: '',
        eveDescricao: '',
        eveDataInicio: new Date("01/01/1900"),
        eveDataFim: new Date("01/01/1900"),
        eveImagem: '',
        eveId: '',
        treCodigo: 0,
        eveExclusivoAluno: false,
        eveDataInicioExibicao: new Date("01/01/1900"),
        tbAlunoEventos: [],
        treCodigoNavigation: null,
    });

    const [nomeBusca, setNomeBusca] = useState({
        aluNome: ''
    });

    const [pagina, setPagina] = useState(1);

    const [abrirCadastroEventos, setAbrirCadastroEventos] = useState(false);
    const [abrirEditarEventos, setAbrirEditarEventos] = useState(false);
    const [abrirExcluirEventos, setAbrirExcluirEventos] = useState(false);
    const [abrirParticipantes, setAbrirParticipantes] = useState(false);
    const [updateEventos, setUpdateEventos] = useState(true);

    const abrirFecharCadastroEventos = (abrirCadastroEventos) => {
        setAbrirCadastroEventos(!abrirCadastroEventos);
        setEvento(eventoInitialState);
    }

    const abrirFecharEditarEventos = (abrirEditarEventos) => {
        setAbrirEditarEventos(!abrirEditarEventos);
    }

    const abrirFecharExcluirEventos = (abrirExcluirAlunos) => {
        setAbrirExcluirEventos(!abrirExcluirAlunos);
    }

    const abrirFecharParticipantes = (abrirParticipantes) => {
        setAbrirParticipantes(!abrirParticipantes);
    }

    const selecionarEvento = (evento, opcao) => {
        setEvento(evento);
        if (opcao === "Participantes") {
            abrirFecharParticipantes();
        } else if (opcao === "Editar") {
            abrirFecharEditarEventos();
        } else {
            abrirFecharExcluirEventos();
        }
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        setEvento({
            ...evento,
            [name]: value
        });
    }

    const atualizaCampoBusca = e => {
        const { name, value } = e.target;
        setNomeBusca({
            ...nomeBusca,
            [name]: value
        });
    }

    const atualizaCampoAtivo = e => {
        const { name, value } = e.target;
        setEvento({
            ...evento,
            [name]: value === "true" ? true : false
        });
    }

    const getEventos = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`evento?skip=${skip}`).then(response => {
            setEventosData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const postEvento = async () => {
        ConverteData(dataAtual);
        await Api.post("aluno/", evento).then(response => {
            setEvento(response.data);
            setUpdateEventos(true);
        }).catch(error => {
            console.log(error);
        });
        setEvento(eventoInitialState);
    }

    const putEvento = async (codigo = evento.aluCodigo) => {
        ConverteData(dataAtual);
        await Api.put("aluno/" + codigo, evento).then(response => {
            var alunosAuxiliar = eventosData;
            alunosAuxiliar.map(alunoMap => {
                if (alunoMap.aluCodigo === evento.aluCodigo) {
                    alunoMap.aluNome = evento.aluNome;
                    alunoMap.aluDataNasc = evento.aluDataNasc;
                    alunoMap.aluEmail = evento.aluEmail;
                    alunoMap.aluSenha = evento.aluSenha;
                    alunoMap.treCodigo = evento.treCodigo;
                    alunoMap.aluOneSignalId = evento.aluOneSignalId;
                    alunoMap.aluImagem = evento.aluImagem;
                    alunoMap.aluId = evento.aluId;
                    alunoMap.aluFone = evento.aluFone;
                    alunoMap.aluSexo = evento.aluSexo;
                    alunoMap.aluAtivo = evento.aluAtivo;
                    alunoMap.aluObs = evento.aluObs;
                    alunoMap.aluStravaCode = evento.aluStravaCode;
                    alunoMap.aluStravaToken = evento.aluStravaToken;
                    alunoMap.aluStravaRefreshToken = evento.aluStravaRefreshToken;
                    alunoMap.aluStravaExpiresAt = evento.aluStravaExpiresAt;
                    alunoMap.aluStravaExpiresIn = evento.aluStravaExpiresIn;
                    alunoMap.aluStravaScope = evento.aluStravaScope;
                    alunoMap.aluStravaTokenType = evento.aluStravaTokenType;
                }
                return alunoMap;
            });
            setEventosData(alunosAuxiliar);
            setUpdateEventos(true);
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteEvento = async (aluno = aluno.aluCodigo) => {
        await Api.delete("aluno/" + aluno).then(response => {
            setUpdateEventos(true);
        }).catch(error => {
            console.log(error);
        });
    }

    const getEventosNome = async (busca) => {
        setCarregando(true);
        await Api.get("evento/" + busca).then(response => {
            setEventosData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    useEffect(() => {
        if (updateEventos) {
            getEventos();
            setUpdateEventos(false);
        }
    }, [updateEventos]);

    return (
        <React.Fragment>
            <Modelo
                urlApi="evento?skip="
                titulo="Cadastro Eventos"
                subtitulo="Painel Sou+Fit"
                icone="bullhorn"
                tipoContainer="desafio-container"
                Cabecalho="Eventos"
                BotaoAdd="Adicionar Eventos"
                dadosApi={eventosData}
                getDados={getEventos}
                getByNome={getEventosNome}
                funcAbrirCadastro={abrirFecharCadastroEventos}
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
                {carregando ? <div className="spinner-border loader" role="status"></div>
                    :
                    <tbody>
                        {eventosData.map((evento) => (
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
                                <td className="pl-5 pt-3 listar" onClick={() => selecionarEvento(evento, "Participantes")}><BsJustify /></td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => selecionarEvento(evento, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => selecionarEvento(evento, "Excluir")}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            </Modelo>

            <FormParticipantes
                abrir={abrirParticipantes}
                funcAbrir={abrirFecharParticipantes}
                codigoDesafio={evento.eveCodigo}
                alunoUrl={alunoUrl}
            />

            <FormInserir
                nome={"Eventos"}
                abrir={abrirCadastroEventos}
                funcPost={postEvento}
                funcAbrir={abrirFecharCadastroEventos}
            >
                <form className="row g-3 form-group">
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desNome"
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0">Data Início:</label>
                        <DatePicker
                            className="form-control"
                            name="desDataInicio"
                            onChange={date => ConverteData(date)}
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
                            name="desDataFim"
                            onChange={date => ConverteData(date)}
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
                            name="desDataInicioExibicao"
                            onChange={date => ConverteData(date)}
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
                            name="desDescricao"
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-2 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                                name="desExclusivoAluno"
                                onChange={e => atualizaCampoAtivo(e)}
                                value={true} />
                            <label className="form-check-label">Exclusivo Aluno</label>
                        </div>
                    </div>

                </form>
            </FormInserir>

            <FormEditar
                nome={"Eventos"}
                abrir={abrirEditarEventos}
                funcPut={putEvento}
                funcAbrir={abrirFecharEditarEventos}
            >
                <form className="row g-3 form-group">
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="eveNome"
                            value={evento.eveNome}
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0">Data Início:</label>
                        <DatePicker
                            className="form-control"
                            name="eveDataInicio"
                            selected={new Date(evento.eveDataInicio)}
                            onChange={date => ConverteData(date)}
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
                            selected={new Date(evento.eveDataFim)}
                            onChange={date => ConverteData(date)}
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
                            selected={new Date(evento.eveDataInicioExibicao)}
                            onChange={date => ConverteData(date)}
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
                            value={evento.eveDescricao}
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-2 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                                name="eveExclusivoAluno"
                                checked={evento.eveExclusivoAluno}
                                onChange={e => atualizaCampoAtivo(e)}
                                value={true} />
                            <label className="form-check-label">Exclusivo Aluno</label>
                        </div>
                    </div>
                </form>
            </FormEditar>

            <FormExcluir
                nome={"Eventos"}
                dados={evento.eveNome}
                abrir={abrirExcluirEventos}
                funcDelete={deleteEvento}
                funcAbrir={abrirFecharExcluirEventos}
            />
        </React.Fragment>
    );
}