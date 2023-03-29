import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import Mestre from "../../layout/Mestre/Mestre";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";

import FormInserir from "../../components/Crud/FormularioModalidades/FormInserir";
import FormEditar from "../../components/Crud/FormularioModalidades/FormEditar";
import FormExcluir from "../../components/Crud/FormularioModalidades/FormExcluir";

import "./ModalidadesCrud.css";

export default function ModalidadesCrud() {

    const [carregando, setCarregando] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());

    const [modalidadesData, setModalidadesData] = useState([]);

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [modalidadeInitialState] = useState({
        aluCodigo: 0,
        aluNome: '',
        treCodigo: '',
        aluOneSignalId: null,
        aluImagem: '',
        aluId: '',
        aluObs: '',
        aluStravaCode: null,
        tbAlunoAtividades: [],
        tbAlunoDesafios: [],
        tbAlunoEventos: [],
        treCodigoNavigation: null,
    });


    const [modalidade, setModalidade] = useState({
        aluCodigo: 0,
        aluNome: '',
        treCodigo: '',
        aluOneSignalId: null,
        aluImagem: '',
        aluId: '',
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

    const [abrirCadastroModalidades, setAbrirCadastroModalidades] = useState(false);
    const [abrirEditarModalidades, setAbrirEditarModalidades] = useState(false);
    const [abrirExcluirModalidades, setAbrirExcluirModalidades] = useState(false);
    const [updateModalidades, setUpdateModalidades] = useState(true);

    const abrirFecharCadastroModalidades = (abrirCadastroModalidades) => {
        setAbrirCadastroModalidades(!abrirCadastroModalidades);
        setModalidade(modalidadeInitialState);
    }

    const abrirFecharEditarModalidades = (abrirEditarModalidades) => {
        setAbrirEditarModalidades(!abrirEditarModalidades);
    }

    const abrirFecharExcluirModalidades = (abrirExcluirModalidades) => {
        setAbrirExcluirModalidades(!abrirExcluirModalidades);
    }

    const selecionarAluno = (aluno, opcao) => {
        setModalidade(aluno);
        (opcao === "Editar") ? abrirFecharEditarModalidades() : abrirFecharExcluirModalidades();
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        setModalidade({
            ...modalidade,
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

    // const converteMd5 = (senha) => {
    //     var md5 = require('md5');
    //     return md5(senha);
    // }


    const getModalidades = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`modalidade?skip=${skip}`).then(response => {
            setModalidadesData(response.data);
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

    const postModalidades = async () => {
        await Api.post("modalidade/", modalidade).then(response => {
            setModalidade(response.data);
            setUpdateModalidades(true);
            // abrirFecharCadastroAlunos();
        }).catch(error => {
            console.log(error);
        });
        setModalidade(modalidadeInitialState);
    }

    const putModalidade = async (codigo = modalidade.aluCodigo) => {
        await Api.put("modalidade/" + codigo, modalidade).then(response => {
            var modalidadesAuxiliar = modalidadesData;
            modalidadesAuxiliar.map(modalidadeMap => {
                if (modalidadeMap.aluCodigo === modalidade.aluCodigo) {
                    modalidadeMap.aluNome = modalidade.aluNome;
                    modalidadeMap.aluDataNasc = modalidade.aluDataNasc;
                    modalidadeMap.aluEmail = modalidade.aluEmail;
                    modalidadeMap.aluSenha = modalidade.aluSenha;
                    modalidadeMap.treCodigo = modalidade.treCodigo;
                    modalidadeMap.aluOneSignalId = modalidade.aluOneSignalId;
                    modalidadeMap.aluImagem = modalidade.aluImagem;
                    modalidadeMap.aluId = modalidade.aluId;
                    modalidadeMap.aluFone = modalidade.aluFone;
                    modalidadeMap.aluSexo = modalidade.aluSexo;
                    modalidadeMap.aluAtivo = modalidade.aluAtivo;
                    modalidadeMap.aluObs = modalidade.aluObs;
                    modalidadeMap.aluStravaCode = modalidade.aluStravaCode;
                    modalidadeMap.aluStravaToken = modalidade.aluStravaToken;
                    modalidadeMap.aluStravaRefreshToken = modalidade.aluStravaRefreshToken;
                    modalidadeMap.aluStravaExpiresAt = modalidade.aluStravaExpiresAt;
                    modalidadeMap.aluStravaExpiresIn = modalidade.aluStravaExpiresIn;
                    modalidadeMap.aluStravaScope = modalidade.aluStravaScope;
                    modalidadeMap.aluStravaTokenType = modalidade.aluStravaTokenType;
                }
                return modalidadeMap;
            });
            setModalidadesData(modalidadesAuxiliar);
            // setAluno(response.data);
            setUpdateModalidades(true);
            // abrirFecharEditarAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteModalidade = async (modalidade = modalidade.aluCodigo) => {
        await Api.delete("modalidade/" + modalidade).then(response => {
            setUpdateModalidades(true);
            // abrirFecharExcluirAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const getModalidadeNome = async () => {
        setCarregando(true);
        await Api.get("modalidade/" + nomeBusca.aluNome).then(response => {
            setModalidadesData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    useEffect(() => {
        if (updateModalidades) {
            getModalidades();
            setUpdateModalidades(false);
        }
    }, [updateModalidades]);

    useEffect(() => {
        getTreinadores();
    }, [setAbrirCadastroModalidades]);

    useEffect(() => {
        getTreinadorId(modalidade.treCodigo);
    }, [setAbrirEditarModalidades]);

    function handleDefault(e) {
        e.preventDefault();
    }

    const alterarPagina = (e) => {
        e === "&gt;" ? pagina > modalidadesData.length ? avancarPagina()
            : avancarPagina(pagina * 10)
            : voltarPagina(pagina * 10);
    }

    const avancarPagina = async (skip) => {
        getModalidades(skip);
        pagina > modalidadesData.length ? setPagina(1) :
            setPagina(pagina + 1);
    }

    const voltarPagina = async (skip) => {
        skip = skip - 20;
        getModalidades(skip);
        pagina > 1 ? setPagina(pagina - 1) : setPagina(1);
    }

    return (
        <Mestre icon="bookmark" title="Cadastro Modalidades" subtitle="Painel Sou+Fit">
            <div className="modalidade-container">
                <header>
                    <h3>Modalidades</h3>
                    <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroModalidades()}><strong>+</strong> Adicionar Modalidades</button>
                </header>
                <hr />
                <form onSubmit={handleDefault}>
                    <div className="input-group rounded">
                        <input type="search" className="form-control rounded" name="aluNome" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={atualizaCampoBusca} />
                        <button className="botaoBusca" onClick={() => getModalidadeNome()} type="submit">
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
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modalidadesData.map((aluno) => (
                                <tr key={aluno.modCodigo}>
                                    <td>{aluno.modCodigo}</td>
                                    <td>{aluno.modNome}</td>
                                    <td className="justify-content-end">
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
                    nome={"Modalidade"}
                    abrir={abrirCadastroModalidades}
                    aluDados={modalidade}
                    funcPost={postModalidades}
                    funcAbrir={abrirFecharCadastroModalidades}
                    funcAtualizaCampo={atualizaCampo}
                    treinaData={treinadoresData}
                    funcBuscaTreinador={getTreinadorId}
                />

                <FormEditar
                    nome={"Modalidade"}
                    abrir={abrirEditarModalidades}
                    aluNome={modalidade && modalidade.aluNome}
                    aluDados={modalidade}
                    dataAtual={dataAtual}
                    funcPut={putModalidade}
                    funcAbrir={abrirFecharEditarModalidades}
                    funcAtualizaCampo={atualizaCampo}
                    treinaData={treinadoresData} 
                    funcBuscaTreinador={getTreinadorId}
                />

                <FormExcluir
                    nome={"Modalidade"}
                    abrir={abrirExcluirModalidades}
                    aluNome={modalidade && modalidade.aluNome}
                    aluDados={modalidade.aluCodigo}
                    funcDelete={deleteModalidade}
                    funcAbrir={abrirFecharExcluirModalidades}
                />
            </div>
        </Mestre >
    );
}