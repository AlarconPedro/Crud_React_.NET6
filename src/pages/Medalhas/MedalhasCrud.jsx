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

    const [dataAtual, setDataAtual] = useState(new Date());

    const [alunosData, setAlunosData] = useState([]);

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [alunoInitialState] = useState({
        aluCodigo: 0,
        aluNome: '',
        aluEmail: '',
        aluSenha: '',
        treCodigo: '',
        aluOneSignalId: null,
        aluImagem: '',
        aluId: '',
        aluFone: '',
        aluSexo: '',
        aluAtivo: true,
        aluObs: '',
        aluStravaCode: null,
        tbAlunoAtividades: [],
        tbAlunoDesafios: [],
        tbAlunoEventos: [],
        treCodigoNavigation: null,
    });


    const [aluno, setAluno] = useState({
        aluCodigo: 0,
        aluNome: '',
        aluEmail: '',
        aluSenha: '',
        treCodigo: '',
        aluOneSignalId: null,
        aluImagem: '',
        aluId: '',
        aluFone: '',
        aluSexo: '',
        aluAtivo: true,
        aluObs: '',
        aluStravaCode: null,
        tbAlunoAtividades: [],
        tbAlunoDesafios: [],
        tbAlunoEventos: [],
        treCodigoNavigation: null,
    });

    const [nomeBusca, setNomeBusca] = useState({
        aluNome: ''
    });

    const [pagina, setPagina] = useState(1);

    const [abrirCadastroAlunos, setAbrirCadastroAlunos] = useState(false);
    const [abrirEditarAlunos, setAbrirEditarAlunos] = useState(false);
    const [abrirExcluirAlunos, setAbrirExcluirAlunos] = useState(false);
    const [updateAlunos, setUpdateAlunos] = useState(true);

    const abrirFecharCadastroAlunos = (abrirCadastroAlunos) => {
        setAbrirCadastroAlunos(!abrirCadastroAlunos);
        setAluno(alunoInitialState);
    }

    const abrirFecharEditarAlunos = (abrirEditarAlunos) => {
        setAbrirEditarAlunos(!abrirEditarAlunos);
    }

    const abrirFecharExcluirAlunos = (abrirExcluirAlunos) => {
        setAbrirExcluirAlunos(!abrirExcluirAlunos);
    }

    const selecionarAluno = (aluno, opcao) => {
        setAluno(aluno);
        (opcao === "Editar") ? abrirFecharEditarAlunos() : abrirFecharExcluirAlunos();
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        setAluno({
            ...aluno,
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

    const getAlunos = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`medalha?skip=${skip}`).then(response => {
            setAlunosData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const getTreinadores = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`treinador?skip=${skip}`).then(response => {
            setTreinadoresData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const getTreinadorId = async (id) => {
        await Api.get(`treinador/${id}`).then(response => {
            setTreinadoresData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const postAluno = async () => {
        await Api.post("medalha/", aluno).then(response => {
            setAluno(response.data);
            setUpdateAlunos(true);
            // abrirFecharCadastroAlunos();
        }).catch(error => {
            console.log(error);
        });
        setAluno(alunoInitialState);
    }

    const putAluno = async (codigo = aluno.aluCodigo) => {
        await Api.put("medalha/" + codigo, aluno).then(response => {
            var alunosAuxiliar = alunosData;
            alunosAuxiliar.map(alunoMap => {
                if (alunoMap.aluCodigo === aluno.aluCodigo) {
                    alunoMap.aluNome = aluno.aluNome;
                    alunoMap.aluDataNasc = aluno.aluDataNasc;
                    alunoMap.aluEmail = aluno.aluEmail;
                    alunoMap.aluSenha = aluno.aluSenha;
                    alunoMap.treCodigo = aluno.treCodigo;
                    alunoMap.aluOneSignalId = aluno.aluOneSignalId;
                    alunoMap.aluImagem = aluno.aluImagem;
                    alunoMap.aluId = aluno.aluId;
                    alunoMap.aluFone = aluno.aluFone;
                    alunoMap.aluSexo = aluno.aluSexo;
                    alunoMap.aluAtivo = aluno.aluAtivo;
                    alunoMap.aluObs = aluno.aluObs;
                    alunoMap.aluStravaCode = aluno.aluStravaCode;
                    alunoMap.aluStravaToken = aluno.aluStravaToken;
                    alunoMap.aluStravaRefreshToken = aluno.aluStravaRefreshToken;
                    alunoMap.aluStravaExpiresAt = aluno.aluStravaExpiresAt;
                    alunoMap.aluStravaExpiresIn = aluno.aluStravaExpiresIn;
                    alunoMap.aluStravaScope = aluno.aluStravaScope;
                    alunoMap.aluStravaTokenType = aluno.aluStravaTokenType;
                }
                return alunoMap;
            });
            setAlunosData(alunosAuxiliar);
            // setAluno(response.data);
            setUpdateAlunos(true);
            // abrirFecharEditarAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteAluno = async (aluno = aluno.aluCodigo) => {
        await Api.delete("medalha/" + aluno).then(response => {
            setUpdateAlunos(true);
            // abrirFecharExcluirAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const getAlunoNome = async () => {
        setCarregando(true);
        await Api.get("aluno/" + nomeBusca.aluNome).then(response => {
            setAlunosData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const converterDataToIdade = (data) => {
        const today = new Date();

        var idade = data !== "" ? today.getFullYear() - data.substring(0, 4) : "-";
        const mes = data !== "" ? today.getMonth() - data.substring(5, 7) : "-";

        if (mes < 0 || (mes === 0 && today.getDate() < data.substring(8, 10))) {
            idade--;
        }

        return data !== "" ? idade : "-";
    }

    useEffect(() => {
        if (updateAlunos) {
            getAlunos();
            setUpdateAlunos(false);
        }
    }, [updateAlunos]);

    useEffect(() => {
        getTreinadores();
    }, [setAbrirCadastroAlunos]);

    useEffect(() => {
        getTreinadorId(aluno.treCodigo);
    }, [setAbrirEditarAlunos]);

    function handleDefault(e) {
        e.preventDefault();
    }

    const alterarPagina = (e) => {
        e === "&gt;" ? pagina > alunosData.length ? avancarPagina()
            : avancarPagina(pagina * 10)
            : voltarPagina(pagina * 10);
    }

    const avancarPagina = async (skip) => {
        getAlunos(skip);
        pagina > alunosData.length ? setPagina(1) :
            setPagina(pagina + 1);
    }

    const voltarPagina = async (skip) => {
        skip = skip - 20;
        getAlunos(skip);
        pagina > 1 ? setPagina(pagina - 1) : setPagina(1);
    }

    return (
        <Mestre icon="certificate" title="Cadastro Medalhas" subtitle="Painel Sou+Fit">
            <div className="alunos-container">
                <header>
                    <h3>Medalhas</h3>
                    <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroAlunos()}><strong>+</strong> Adicionar Medalhas</button>
                </header>
                <hr />
                <form onSubmit={handleDefault}>
                    <div className="input-group rounded">
                        <input type="search" className="form-control rounded" name="aluNome" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={atualizaCampoBusca} />
                        <button className="botaoBusca" onClick={() => getAlunoNome()} type="submit">
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
                            {alunosData.map((aluno) => (
                                <tr key={aluno.medCodigo}>
                                    <td>{aluno.medCodigo}</td>
                                    <td>{aluno.medNome}</td>
                                    <td>{aluno.medTipoDesafio}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => selecionarAluno(aluno, "Editar")}>
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => selecionarAluno(aluno, "Excluir")}>
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
                    abrir={abrirCadastroAlunos}
                    aluDados={aluno}
                    funcPost={postAluno}
                    funcAbrir={abrirFecharCadastroAlunos}
                    funcAtualizaCampo={atualizaCampo}
                    treinaData={treinadoresData}
                    funcBuscaTreinador={getTreinadorId}
                />

                <FormEditar
                    nome={"Medalha"}
                    abrir={abrirEditarAlunos}
                    aluNome={aluno && aluno.aluNome}
                    aluDados={aluno}
                    funcPut={putAluno}
                    funcAbrir={abrirFecharEditarAlunos}
                    funcAtualizaCampo={atualizaCampo}
                    treinaData={treinadoresData}
                    funcBuscaTreinador={getTreinadorId}
                />

                <FormExcluir
                    nome={"Medalha"}
                    abrir={abrirExcluirAlunos}
                    aluNome={aluno && aluno.aluNome}
                    aluDados={aluno.aluCodigo}
                    funcDelete={deleteAluno}
                    funcAbrir={abrirFecharExcluirAlunos}
                />
            </div>
        </Mestre >
    );
}