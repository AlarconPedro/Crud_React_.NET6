import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import Mestre from "../../layout/Mestre/Mestre";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import "react-datepicker/dist/react-datepicker.css";

import {
    BsAwardFill,
    BsFillCalendarFill
} from "react-icons/bs";

import Api from "../../services/Api";

import FormInserir from "../../components/Crud/FormularioMedalhas/FormInserir";
import FormEditar from "../../components/Crud/FormularioMedalhas/FormEditar";
import FormExcluir from "../../components/Crud/FormularioMedalhas/FormExcluir";

import "./MedalhasCrud.css";

export default function MedalhasCrud() {

    const [carregando, setCarregando] = useState(false);

    const [medalhasData, setMedalhasData] = useState([]);

    const [modalidadeData, setModalidadeData] = useState([]);

    const [medalhaInitialState] = useState({
        medCodigo: 0,
        medNome: '',
        medTipoDesafio: '',
        tbMedalhaModalidades: [],
        tbMedalhaNivels: [],
    });

    const [medalha, setMedalha] = useState({
        medCodigo: 0,
        medNome: '',
        medTipoDesafio: '',
        tbMedalhaModalidades: [],
        tbMedalhaNivels: [],
    });

    const [nomeBusca, setNomeBusca] = useState({
        medNome: ''
    });

    const [pagina, setPagina] = useState(1);

    const [abrirCadastroMedalhas, setAbrirCadastroMedalhas] = useState(false);
    const [abrirEditarMedalhas, setAbrirEditarMedalhas] = useState(false);
    const [abrirExcluirMedalhas, setAbrirExcluirMedalhas] = useState(false);
    const [updateMedalhas, setUpdateMedalhas] = useState(true);

    const abrirFecharCadastroMedalhas = (abrirCadastroMedalhas) => {
        setAbrirCadastroMedalhas(!abrirCadastroMedalhas);
        setMedalha(medalhaInitialState);
    }

    const abrirFecharEditarMedalhas = (abrirEditarMedalhas) => {
        setAbrirEditarMedalhas(!abrirEditarMedalhas);
    }

    const abrirFecharExcluirMedalhas = (abrirExcluirMedalhas) => {
        setAbrirExcluirMedalhas(!abrirExcluirMedalhas);
    }

    const selecionarMedalha = (medalha, opcao) => {
        setMedalha(medalha);
        (opcao === "Editar") ? abrirFecharEditarMedalhas() : abrirFecharExcluirMedalhas();
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        setMedalha({
            ...medalha,
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

    const getMedalhas = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`medalha?skip=${skip}`).then(response => {
            setMedalhasData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const getModalidades = async () => {
        await Api.get("modalidade").then(response => {
            setModalidadeData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const postMedalha = async () => {
        await Api.post("medalha/", medalha).then(response => {
            setMedalha(response.data);
            setUpdateMedalhas(true);
            // abrirFecharCadastroAlunos();
        }).catch(error => {
            console.log(error);
        });
        setMedalha(medalhaInitialState);
    }

    const putMedalha = async (codigo = medalha.aluCodigo) => {
        await Api.put("medalha/" + codigo, medalha).then(response => {
            var alunosAuxiliar = medalhasData;
            alunosAuxiliar.map(alunoMap => {
                if (alunoMap.aluCodigo === medalha.aluCodigo) {
                    alunoMap.aluNome = medalha.aluNome;
                    alunoMap.aluDataNasc = medalha.aluDataNasc;
                    alunoMap.aluEmail = medalha.aluEmail;
                    alunoMap.aluSenha = medalha.aluSenha;
                    alunoMap.treCodigo = medalha.treCodigo;
                    alunoMap.aluOneSignalId = medalha.aluOneSignalId;
                    alunoMap.aluImagem = medalha.aluImagem;
                    alunoMap.aluId = medalha.aluId;
                    alunoMap.aluFone = medalha.aluFone;
                    alunoMap.aluSexo = medalha.aluSexo;
                    alunoMap.aluAtivo = medalha.aluAtivo;
                    alunoMap.aluObs = medalha.aluObs;
                    alunoMap.aluStravaCode = medalha.aluStravaCode;
                    alunoMap.aluStravaToken = medalha.aluStravaToken;
                    alunoMap.aluStravaRefreshToken = medalha.aluStravaRefreshToken;
                    alunoMap.aluStravaExpiresAt = medalha.aluStravaExpiresAt;
                    alunoMap.aluStravaExpiresIn = medalha.aluStravaExpiresIn;
                    alunoMap.aluStravaScope = medalha.aluStravaScope;
                    alunoMap.aluStravaTokenType = medalha.aluStravaTokenType;
                }
                return alunoMap;
            });
            setMedalhasData(alunosAuxiliar);
            // setAluno(response.data);
            setUpdateMedalhas(true);
            // abrirFecharEditarAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteMedalha = async (aluno = aluno.aluCodigo) => {
        await Api.delete("medalha/" + aluno).then(response => {
            setUpdateMedalhas(true);
            // abrirFecharExcluirAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const getMedalhaNome = async () => {
        setCarregando(true);
        await Api.get("aluno/" + nomeBusca.aluNome).then(response => {
            setMedalhasData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    useEffect(() => {
        if (updateMedalhas) {
            getMedalhas();
            setUpdateMedalhas(false);
        }
    }, [updateMedalhas]);

    useEffect(() => {
        getModalidades();
    }, [setAbrirCadastroMedalhas]);    

    function handleDefault(e) {
        e.preventDefault();
    }

    const alterarPagina = (e) => {
        e === "&gt;" ? pagina > medalhasData.length ? avancarPagina()
            : avancarPagina(pagina * 10)
            : voltarPagina(pagina * 10);
    }

    const avancarPagina = async (skip) => {
        getMedalhas(skip);
        pagina > medalhasData.length ? setPagina(1) :
            setPagina(pagina + 1);
    }

    const voltarPagina = async (skip) => {
        skip = skip - 20;
        getMedalhas(skip);
        pagina > 1 ? setPagina(pagina - 1) : setPagina(1);
    }

    return (
        <Mestre icon="certificate" title="Cadastro Medalhas" subtitle="Painel Sou+Fit">
            <div className="medalhas-container">
                <header>
                    <h3>Medalhas</h3>
                    <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroMedalhas()}><strong>+</strong> Adicionar Medalhas</button>
                </header>
                <hr />
                <form onSubmit={handleDefault}>
                    <div className="input-group rounded">
                        <input type="search" className="form-control rounded" name="aluNome" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={atualizaCampoBusca} />
                        <button className="botaoBusca" onClick={() => getMedalhaNome()} type="submit">
                            <span className="input-group-text border-0" id="search-addon">
                                <i className="fa fa-search"></i>
                            </span>
                        </button>
                    </div>
                </form>
                <br />
                {carregando ? <div className="spinner-border loader" role="status">
                </div>
                    : <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Tipo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medalhasData.map((medalha) => (
                                <tr key={medalha.medCodigo}>
                                    <td>{medalha.medCodigo}</td>
                                    <td>{medalha.medNome}</td>
                                    <td>{medalha.medTipoDesafio}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => selecionarMedalha(medalha, "Editar")}>
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => selecionarMedalha(medalha, "Excluir")}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
                <hr />
                <br />
                <div className="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item" onClick={() => alterarPagina("&lt;")}><a className="page-link">&lt;</a></li>
                            <li className="page-item active"><p className="page-link">{pagina}</p></li>
                            <li className="page-item"><a className="page-link" onClick={() => alterarPagina("&gt;")}>&gt;</a></li>
                        </ul>
                    </nav>
                </div>

                <FormInserir
                    nome={"Medalha"}
                    abrir={abrirCadastroMedalhas}
                    modalidades={modalidadeData}
                    aluDados={medalha}
                    funcPost={postMedalha}
                    funcAbrir={abrirFecharCadastroMedalhas}
                    funcAtualizaCampo={atualizaCampo}
                />

                <FormEditar
                    nome={"Medalha"}
                    abrir={abrirEditarMedalhas}
                    modalidades={modalidadeData}
                    aluNome={medalha && medalha.aluNome}
                    aluDados={medalha}
                    funcPut={putMedalha}
                    funcAbrir={abrirFecharEditarMedalhas}
                    funcAtualizaCampo={atualizaCampo}
                />

                <FormExcluir
                    nome={"Medalha"}
                    abrir={abrirExcluirMedalhas}
                    aluNome={medalha && medalha.aluNome}
                    aluDados={medalha.aluCodigo}
                    funcDelete={deleteMedalha}
                    funcAbrir={abrirFecharExcluirMedalhas}
                />
            </div>
        </Mestre >
    );
}