import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

import Mestre from "../../layout/Mestre/Mestre";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";

import FormInserir from "../../components/Crud/FormularioAtividade/FormInserir";
import FormEditar from "../../components/Crud/FormularioAtividade/FormEditar";
import FormExcluir from "../../components/Crud/FormularioAtividade/FormExcluir";
import FormImagens from "../../components/Crud/FormularioAtividade/FormImagens";

import { BsJustify } from "react-icons/bs";

import ConverteData from "../../funcoes/ConverteData";

import "./AtividadesCrud.css";
import { alunoUrl, treinadorUrl } from "../../services/Imagens";


export default function AlunosCrud(props) {

    const location = useLocation();
    const { codigo } = location.state;

    const [carregando, setCarregando] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());

    const [atividadesData, setAtividadesData] = useState([]);

    const [atividadeInitialState] = useState({
        modCodigo: 0,
        modNome: '',
        aluAtiCodigo: 0,
        aluAtiDataHora: new Date("01/01/1900"),
        aluAtiMedida: 0,
        aluAtiDuracaoSeg: 0,
        aluAtiIntensidade: 0,
    });


    const [atividade, setAtividade] = useState({
        modCodigo: 0,
        modNome: '',
        aluAtiCodigo: 0,
        aluAtiDataHora: new Date(dataAtual),
        aluAtiMedida: 0,
        aluAtiDuracaoSeg: 0,
        aluAtiIntensidade: 0,
    });

    const [nomeBusca, setNomeBusca] = useState({
        modNome: ''
    });

    const [aluCodigo, setAluCodigo] = useState(codigo);

    const [pagina, setPagina] = useState(1);

    const [abrirCadastroAtividades, setAbrirCadastroAtividades] = useState(false);
    const [abrirEditarAtividades, setAbrirEditarAtividades] = useState(false);
    const [abrirExcluirAtividades, setAbrirExcluirAtividades] = useState(false);
    const [abrirImagens, setAbrirImagens] = useState(false);
    const [updateAlunos, setUpdateAlunos] = useState(true);

    const abrirFecharCadastroAtividades = (abrirCadastroAtividades) => {
        setAbrirCadastroAtividades(!abrirCadastroAtividades);
        setAtividade(atividadeInitialState);
    }

    const abrirFecharEditarAtividades = (abrirEditarAtividades) => {
        setAbrirEditarAtividades(!abrirEditarAtividades);
    }

    const abrirFecharExcluirAtividades = (abrirExcluirAtividades) => {
        setAbrirExcluirAtividades(!abrirExcluirAtividades);
    }

    const abrirFecharImagens = (abrirImagens) => {
        setAbrirImagens(!abrirImagens);
    }

    const selecionarAtividade = (atividade, opcao) => {
        setAtividade(atividade);
        if (opcao === "Imagens") {
            // setAtividade({
            //     ...atividade,
            //     aluAtiCodigo: atividade.aluAtiCodigo
            // });
            abrirFecharImagens();
        } else if (opcao === "Editar") {
            abrirFecharEditarAtividades();
        } else {
            abrirFecharExcluirAtividades();
        }
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        setAtividade({
            ...atividade,
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

    const dataAuxiliar = (date) => {
        setDataAtual(date);
        let data = ConverteData(date);
        setAtividade({
            ...atividade,
            aluAtiDataHora: data
        });
        return data;
    }

    const getAtividades = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`aluno/atividades/${codigo}?skip=${skip}`).then(response => {
            setAtividadesData(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const postAluno = async () => {
        await dataAuxiliar(dataAtual);
        await Api.post("aluno/", atividade).then(response => {
            setAtividade(response.data);
            setUpdateAlunos(true);
            // abrirFecharCadastroAlunos();
        }).catch(error => {
            console.log(error);
        });
        setAtividade(atividadeInitialState);
    }

    const putAluno = async () => {
        await dataAuxiliar(dataAtual);
        await Api.put("aluno/" + codigo, atividade).then(response => {
            var alunosAuxiliar = atividadesData;
            alunosAuxiliar.map(alunoMap => {
                if (alunoMap.aluCodigo === atividade.aluCodigo) {
                    alunoMap.aluNome = atividade.aluNome;
                    alunoMap.aluDataNasc = atividade.aluDataNasc;
                    alunoMap.aluEmail = atividade.aluEmail;
                    alunoMap.aluSenha = atividade.aluSenha;
                    alunoMap.treCodigo = atividade.treCodigo;
                    alunoMap.aluOneSignalId = atividade.aluOneSignalId;
                    alunoMap.aluId = atividade.aluId;
                    alunoMap.aluFone = atividade.aluFone;
                    alunoMap.aluSexo = atividade.aluSexo;
                    alunoMap.aluAtivo = atividade.aluAtivo;
                    alunoMap.aluObs = atividade.aluObs;
                    alunoMap.aluStravaCode = atividade.aluStravaCode;
                    alunoMap.aluStravaToken = atividade.aluStravaToken;
                    alunoMap.aluStravaRefreshToken = atividade.aluStravaRefreshToken;
                    alunoMap.aluStravaExpiresAt = atividade.aluStravaExpiresAt;
                    alunoMap.aluStravaExpiresIn = atividade.aluStravaExpiresIn;
                    alunoMap.aluStravaScope = atividade.aluStravaScope;
                    alunoMap.aluStravaTokenType = atividade.aluStravaTokenType;
                }
                return alunoMap;
            });
            setAtividadesData(alunosAuxiliar);
            // setAluno(response.data);
            setUpdateAlunos(true);
            // abrirFecharEditarAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteAluno = async () => {
        await Api.delete("aluno/" + codigo).then(response => {
            setUpdateAlunos(true);
            // abrirFecharExcluirAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const getAtividadesNome = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`aluno/atividades/${codigo}/${nomeBusca.modNome}?skip=${skip}`).then(response => {
            setAtividadesData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    useEffect(() => {
        if (updateAlunos) {
            getAtividades();
            setUpdateAlunos(false);
        }
    }, [updateAlunos]);

    function handleDefault(e) {
        e.preventDefault();
    }

    const alterarPagina = (e) => {
        e === "&gt;" ? pagina > atividadesData.length ? avancarPagina()
            : avancarPagina(pagina * 10)
            : voltarPagina(pagina * 10);
    }

    const avancarPagina = async (skip) => {
        getAtividades(skip);
        pagina > atividadesData.length ? setPagina(1) :
            setPagina(pagina + 1);
    }

    const voltarPagina = async (skip) => {
        skip = skip - 20;
        getAtividades(skip);
        pagina > 1 ? setPagina(pagina - 1) : setPagina(1);
    }

    return (
        <Mestre icon="user" title="Atividades do Alunos" subtitle="Painel Sou+Fit">
            <div className="atividades-container">
                <header>
                    <h3>Atividades</h3>
                    <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroAtividades()}><strong>+</strong> Adicionar Atividade</button>
                </header>
                <hr />
                <form onSubmit={handleDefault}>
                    <div className="input-group rounded">
                        <input type="search" className="form-control rounded" name="modNome" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={atualizaCampoBusca} />
                        <button className="botaoBusca" onClick={() => getAtividadesNome()} type="submit">
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
                                <th>Modalidade</th>
                                <th>Data/Hora</th>
                                <th>Medida</th>
                                <th>Duração</th>
                                <th>Intensidade</th>
                                <th>Imagens</th>
                                <th className="pl-4 acoes">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {atividadesData.map((atividade) => (
                                <tr key={atividade.modCodigo}>
                                    <td className="pt-3">{atividade.modNome}</td>
                                    <td className="pt-3">{dataAuxiliar(atividade.aluAtiDataHora)}</td>
                                    <td className="pt-3">{atividade.aluAtiMedida}</td>
                                    <td className="pt-3">{atividade.aluAtiDuracaoSeg}</td>
                                    <td className="pt-3">{atividade.aluAtiIntensidade}</td>
                                    {/* <td className="pt-3">{atividade.modNome}</td> */}
                                    {/* <td className=""><img src={alunoUrl + atividade.aluAtiImgImagem} alt="" /></td> */}
                                    <td className="pt-3 listar" onClick={() => selecionarAtividade(atividade, "Imagens")}><BsJustify /></td>
                                    <td>
                                        <button className="btn btn-warning">
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger">
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

                <FormImagens
                    nome={"Atividade Imagens"}
                    abrir={abrirImagens}
                    codigo={atividade.aluAtiCodigo}
                    funcAbrir={abrirFecharImagens}
                    // imagens={atividade.aluAtiImgImagem}
                />

                {/* <FormInserir
                    nome={"Aluno"}
                    abrir={abrirCadastroAtividades}
                    aluDados={atividade}
                    funcPost={postAluno}
                    funcAbrir={abrirFecharCadastroAtividades}
                    funcData={dataAuxiliar}
                    funcAtualizaCampoAtivo={atualizaCampoAtivo}
                    funcAtualizaCampo={atualizaCampo}
                />

                <FormEditar
                    nome={"Aluno"}
                    abrir={abrirEditarAtividades}
                    aluNome={atividade && atividade.aluNome}
                    aluDados={atividade}
                    dataAtual={dataAtual}
                    funcPut={putAluno}
                    funcAbrir={abrirFecharEditarAtividades}
                    funcData={dataAuxiliar}
                    funcAtualizaCampoAtivo={atualizaCampoAtivo}
                    funcAtualizaCampo={atualizaCampo}
                />

                <FormExcluir
                    nome={"Aluno"}
                    abrir={abrirExcluirAtividades}
                    aluNome={atividade && atividade.aluNome}
                    aluDados={atividade.aluCodigo}
                    funcDelete={deleteAluno}
                    funcAbrir={abrirFecharExcluirAtividades}
                /> */}
            </div>
        </Mestre >
    );
}