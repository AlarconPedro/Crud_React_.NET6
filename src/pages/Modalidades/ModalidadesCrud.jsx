import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import Mestre from "../../layout/Mestre/Mestre";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";
import { modalidadeUrl } from "../../services/Imagens";

import FormInserir from "../../components/Crud/FormularioModalidades/FormInserir";
import FormEditar from "../../components/Crud/FormularioModalidades/FormEditar";
import FormExcluir from "../../components/Crud/FormularioModalidades/FormExcluir";

import "./ModalidadesCrud.css";

export default function ModalidadesCrud() {

    const [carregando, setCarregando] = useState(false);

    const [modalidadesData, setModalidadesData] = useState([]);

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [modalidadeInitialState] = useState({
        modCodigo: 0,
        modNome: '',
        modImagem: '',
        modId: '',
        modTipoDesafio: 0,
        modTipoMedida: 0,
        modAtiva: false,
        tbAlunoAtividades: [],
        tbAlunoDesafios: [],
        tbAlunoEventos: [],
    });


    const [modalidade, setModalidade] = useState({
        modCodigo: 0,
        modNome: '',
        modImagem: '',
        modId: '',
        modTipoDesafio: 0,
        modTipoMedida: 0,
        modAtiva: false,
        tbAlunoAtividades: [],
        tbAlunoDesafios: [],
        tbAlunoEventos: [],
    });

    const [nomeBusca, setNomeBusca] = useState({
        modNome: ''
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
                if (modalidadeMap.modCodigo === modalidade.modCodigo) {
                    modalidadeMap.modNome = modalidade.modNome;
                    modalidadeMap.modImagem = modalidade.modImagem;
                    modalidadeMap.modId = modalidade.modId;
                    modalidadeMap.modTipoDesafio = modalidade.modTipoDesafio;
                    modalidadeMap.modTipoMedida = modalidade.modTipoMedida;
                    modalidadeMap.modAtiva = modalidade.modAtiva;
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
                        <input type="search" className="form-control rounded" name="modNome" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={atualizaCampoBusca} />
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
                                <th>Avatar</th>
                                <th>Nome</th>
                                <th className="acoes">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {modalidadesData.map((modalidade) => (
                                <tr key={modalidade.modCodigo}>
                                    <td><img src={modalidadeUrl + modalidade.modImagem} alt="" /></td>
                                    <td>{modalidade.modNome}</td>
                                    <td className="justify-content-end">
                                        <button className="btn btn-warning" onClick={() => selecionarAluno(modalidade, "Editar")}>
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => selecionarAluno(modalidade, "Excluir")}>
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
                    modNome={modalidade && modalidade.modNome}
                    modDados={modalidade}
                    funcPut={putModalidade}
                    funcAbrir={abrirFecharEditarModalidades}
                    funcAtualizaCampo={atualizaCampo}
                    treinaData={treinadoresData} 
                    funcBuscaTreinador={getTreinadorId}
                />

                <FormExcluir
                    nome={"Modalidade"}
                    abrir={abrirExcluirModalidades}
                    modNome={modalidade && modalidade.aluNome}
                    modDados={modalidade.aluCodigo}
                    funcDelete={deleteModalidade}
                    funcAbrir={abrirFecharExcluirModalidades}
                />
            </div>
        </Mestre >
    );
}