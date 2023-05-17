import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

import Mestre from "../../layout/Mestre/Mestre";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";

import FormInserir from "../../components/Forms/FormInserir";
import FormEditar from "../../components/Forms/FormEditar";
import FormExcluir from "../../components/Forms/FormExcluir";
import FormImagens from "../../components/Crud/FormularioAtividade/FormImagens";

import { BsJustify } from "react-icons/bs";

import ConverteData from "../../funcoes/ConverteData";
import ConverteTempo from "../../funcoes/ConverteTempo";
import ConverteDistancia from "../../funcoes/ConverteDistancia";
import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import "./AtividadesCrud.css";
import { alunoUrl, treinadorUrl } from "../../services/Imagens";
import Modelo from "../../layout/Modelo";


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
        aluAtiDataHora: new Date("01/01/1990"),
        aluAtiMedida: 0,
        aluAtiDuracaoSeg: 0,
        aluAtiObs: '',
        aluAtiIntensidade: 0,
        aluAtiID: '',
        aluAtiStrava: '',
        aluAtiTipo: '',
        aluAtiVelocidade: 0,
        aluAtiElevacao: 0,
        aluAtiCalorias: 0,
        aluAtiFC: 0,
        aluAtiCadencia: 0,
        aluAtiPotencia: 0,
        aluAtiDescricao: '',
        aluAtiCidade: '',
        aluAtiEstado: '',
        total: 0,
    });


    const [atividade, setAtividade] = useState({
        modCodigo: 0,
        modNome: '',
        aluAtiCodigo: 0,
        aluAtiDataHora: new Date(dataAtual),
        aluAtiMedida: 0,
        aluAtiDuracaoSeg: 0,
        aluAtiObs: '',
        aluAtiIntensidade: 0,
        aluAtiID: '',
        aluAtiStrava: '',
        aluAtiTipo: '',
        aluAtiVelocidade: 0,
        aluAtiElevacao: 0,
        aluAtiCalorias: 0,
        aluAtiFC: 0,
        aluAtiCadencia: 0,
        aluAtiPotencia: 0,
        aluAtiDescricao: '',
        aluAtiCidade: '',
        aluAtiEstado: '',
        total: 0,
    });

    const [aluCodigo, setAluCodigo] = useState(codigo);

    const [abrirCadastroAtividades, setAbrirCadastroAtividades] = useState(false);
    const [abrirEditarAtividades, setAbrirEditarAtividades] = useState(false);
    const [abrirExcluirAtividades, setAbrirExcluirAtividades] = useState(false);
    const [abrirImagens, setAbrirImagens] = useState(false);
    const [updateAtividades, setUpdateAtividades] = useState(true);

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
        await Api.get(`aluno/atividades/alunoid/${codigo}?skip=${skip}`).then(response => {
            setAtividadesData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const getAtividadeId = async () => {
        await Api.get(`aluno/atividades/${atividade.aluAtiCodigo}`).then(response => {
            setAtividade(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const postAtividade = async () => {
        await dataAuxiliar(dataAtual);
        await Api.post("aluno/", atividade).then(response => {
            setAtividade(response.data);
            setUpdateAtividades(true);
            // abrirFecharCadastroAlunos();
        }).catch(error => {
            console.log(error);
        });
        setAtividade(atividadeInitialState);
    }

    const putAtividade = async () => {
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
            setUpdateAtividades(true);
            // abrirFecharEditarAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const getAtividadesNome = async (nome) => {
        setCarregando(true);
        await Api.get(`aluno/atividades/alunoid/${codigo}/` + nome).then(response => {
            setAtividadesData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const deleteAtividade = async () => {
        await Api.delete("aluno/" + codigo).then(response => {
            setUpdateAtividades(true);
            // abrirFecharExcluirAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (updateAtividades) {
            getAtividades();
            setUpdateAtividades(false);
        }
    }, [updateAtividades]);

    useEffect(() => {
        getAtividadeId();
    }, [atividade.aluAtiCodigo]);

    function handleDefault(e) {
        e.preventDefault();
    }

    return (
        <React.Fragment>
            <Modelo
                urlApi={`aluno/atividades/${codigo}?skip=`}
                titulo="Cadastro Atividades"
                subtitulo="Painel Sou+Fit"
                icone="user"
                tipoContainer="atividades-container"
                Cabecalho="Atividades"
                BotaoAdd="Adicionar Atividade"
                dadosApi={atividadesData}
                getDados={getAtividades}
                getByNome={getAtividadesNome}
                funcAbrirCadastro={abrirFecharCadastroAtividades}
                colunas={[
                    { nome: "Modalidade" },
                    { nome: "Data/Hora" },
                    { nome: "Medida" },
                    { nome: "Duração" },
                    { nome: "Intensidade" },
                    { nome: "Imagens" },
                ]}
            >
                {carregando ? <div className="spinner-border loader" role="status" />
                    :
                    <tbody>
                        {atividadesData.map((atividade) => (
                            <tr key={atividade.modCodigo}>
                                <td className="pt-3">{atividade.modNome}</td>
                                <td className="pt-3">{ConverteData(atividade.aluAtiDataHora)}</td>
                                <td className="pt-3">{ConverteDistancia(atividade.aluAtiMedida)}</td>
                                <td className="pt-3">{ConverteTempo(atividade.aluAtiDuracaoSeg)}</td>
                                <td className="pt-3">{atividade.aluAtiIntensidade}</td>
                                {/* <td className="pt-3">{atividade.modNome}</td> */}
                                {/* <td className=""><img src={alunoUrl + atividade.aluAtiImgImagem} alt="" /></td> */}
                                <td className="pt-3 listar" onClick={() => selecionarAtividade(atividade, "Imagens")}><BsJustify /></td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => selecionarAtividade(atividade, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => selecionarAtividade(atividade, "Excluir")}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            </Modelo>

            <FormImagens
                nome={"Atividade Imagens"}
                abrir={abrirImagens}
                codigo={atividade.aluAtiCodigo}
                funcAbrir={abrirFecharImagens}
            // imagens={atividade.aluAtiImgImagem}
            />

            <FormInserir
                nome={"Atividade"}
                abrir={abrirCadastroAtividades}
                funcAbrir={abrirFecharCadastroAtividades}
                funcPost={postAtividade}
            >
                <form className="row g-3 form-group">
                    <div className="col-md-12">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluNome" onChange={e => atualizaCampo(e)} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Data/Hora:</label>
                        <DatePicker
                            className="form-control"
                            name="aluDataNasc"
                            selected={new Date(dataAtual)}
                            onChange={date => props.funcData(date)}
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
                        <label className="form-label mb-0 mt-2">Medida:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluNome" onChange={e => atualizaCampo(e)} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Duração:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluEmail" onChange={e => atualizaCampo(e)} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Intensidade:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluEmail" onChange={e => atualizaCampo(e)} />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label mb-0 mt-2">Observação:</label>
                        <input type="text" className="form-control" placeholder="Obs."
                            name="aluObs" onChange={e => atualizaCampo(e)} />
                    </div>
                </form>
            </FormInserir>

            <FormEditar
                nome={"Atividade"}
                abrir={abrirEditarAtividades}
                funcAbrir={abrirFecharEditarAtividades}
                funcPut={putAtividade}
            >
                <form className="row g-3 form-group">
                    {/* <div className="col-md-12">
                        <label className="mb-0">Id: </label>
                        <input type="number" className="form-control mb-2" readOnly disabled
                            value={atividade.aluAtiCodigo}
                        />
                    </div> */}
                    <div className="col-md-6">
                        <label className="form-label mb-0 mt-2">Modalidade:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluNome"
                            onChange={e => atualizaCampo(e)}
                            value={atividade.modNome}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0 mt-2">Descrição:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluNome"
                            onChange={e => atualizaCampo(e)}
                            value={atividade.aluAtiDescricao}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Data/Hora:</label>
                        <DatePicker
                            className="form-control"
                            name="aluDataNasc"
                            selected={new Date(atividade.aluAtiDataHora)}
                            onChange={date => props.funcData(date)}
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
                        <label className="form-label mb-0 mt-2">Medida:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluNome"
                            onChange={e => atualizaCampo(e)}
                            value={atividade.aluAtiMedida}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Duração:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluNome"
                            onChange={e => atualizaCampo(e)}
                            value={atividade.aluAtiDuracaoSeg}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Intensidade:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluNome"
                            onChange={e => atualizaCampo(e)}
                            value={atividade.aluAtiIntensidade}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Cidade:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluAtiCidade"
                            onChange={e => atualizaCampo(e)}
                            value={atividade.aluAtiCidade}
                        />
                    </div>
                    <div className="col-md-1">
                        <label className="form-label mb-0 mt-2">UF:</label>
                        <input type="text" className="form-control"
                            name="aluAtiEstado"
                            onChange={e => atualizaCampo(e)}
                            value={atividade.aluAtiEstado}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label mb-0 mt-2">Observação:</label>
                        <input type="text" className="form-control" name="aluObs"
                            onChange={e => atualizaCampo(e)} value={atividade.aluAtiObs} />
                    </div>
                </form>
            </FormEditar>

            <FormExcluir
                nome={"Atividade"}
                abrir={abrirExcluirAtividades}
                dados={atividade.aluCodigo}
                funcDelete={deleteAtividade}
                funcAbrir={abrirFecharExcluirAtividades}
            />
        </React.Fragment>
        // <Mestre icon="user" title="Atividades do Alunos" subtitle="Painel Sou+Fit">
        //     <div className="atividades-container">
        //         <header>
        //             <h3>Atividades</h3>
        //             <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroAtividades()}><strong>+</strong> Adicionar Atividade</button>
        //         </header>
        //         <hr />
        //         <form onSubmit={handleDefault}>
        //             <div className="input-group rounded">
        //                 <input type="search" className="form-control rounded" name="modNome" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={atualizaCampoBusca} />
        //                 <button className="botaoBusca" onClick={() => getAtividadesNome()} type="submit">
        //                     <span className="input-group-text border-0" id="search-addon">
        //                         <i className="fa fa-search"></i>
        //                     </span>
        //                 </button>
        //             </div>
        //         </form>
        //         <br />
        //         {carregando ? <div className="spinner-border loader" role="status">
        //         </div>
        //             : <table className="table table-striped">
        //                 <thead>
        //                     <tr>
        //                         <th>Modalidade</th>
        //                         <th>Data/Hora</th>
        //                         <th>Medida</th>
        //                         <th>Duração</th>
        //                         <th>Intensidade</th>
        //                         <th>Imagens</th>
        //                         <th className="pl-4 acoes">Ações</th>
        //                     </tr>
        //                 </thead>
        // <tbody>
        //     {atividadesData.map((atividade) => (
        //         <tr key={atividade.modCodigo}>
        //             <td className="pt-3">{atividade.modNome}</td>
        //             <td className="pt-3">{dataAuxiliar(atividade.aluAtiDataHora)}</td>
        //             <td className="pt-3">{atividade.aluAtiMedida}</td>
        //             <td className="pt-3">{atividade.aluAtiDuracaoSeg}</td>
        //             <td className="pt-3">{atividade.aluAtiIntensidade}</td>
        //             {/* <td className="pt-3">{atividade.modNome}</td> */}
        //             {/* <td className=""><img src={alunoUrl + atividade.aluAtiImgImagem} alt="" /></td> */}
        //             <td className="pt-3 listar" onClick={() => selecionarAtividade(atividade, "Imagens")}><BsJustify /></td>
        //             <td>
        //                 <button className="btn btn-warning">
        //                     <i className="fa fa-pencil"></i>
        //                 </button>{" "}
        //                 <button className="btn btn-danger">
        //                     <i className="fa fa-trash"></i>
        //                 </button>
        //             </td>
        //         </tr>
        //     ))}
        // </tbody>
        //             </table>
        //         }
        //         <hr />
        //         <br />
        //         <div className="d-flex justify-content-center">
        //             <nav aria-label="Page navigation example">
        //                 <ul className="pagination">
        //                     <li className="page-item" onClick={() => alterarPagina("&lt;")}><a className="page-link">&lt;</a></li>
        //                     <li className="page-item active"><p className="page-link">{pagina}</p></li>
        //                     <li className="page-item"><a className="page-link" onClick={() => alterarPagina("&gt;")}>&gt;</a></li>
        //                 </ul>
        //             </nav>
        //         </div>

        // <FormImagens
        //     nome={"Atividade Imagens"}
        //     abrir={abrirImagens}
        //     codigo={atividade.aluAtiCodigo}
        //     funcAbrir={abrirFecharImagens}
        //     // imagens={atividade.aluAtiImgImagem}
        // />

        //         {/* <FormInserir
        //             nome={"Aluno"}
        //             abrir={abrirCadastroAtividades}
        //             aluDados={atividade}
        //             funcPost={postAluno}
        //             funcAbrir={abrirFecharCadastroAtividades}
        //             funcData={dataAuxiliar}
        //             funcAtualizaCampoAtivo={atualizaCampoAtivo}
        //             funcAtualizaCampo={atualizaCampo}
        //         />

        //         <FormEditar
        //             nome={"Aluno"}
        //             abrir={abrirEditarAtividades}
        //             aluNome={atividade && atividade.aluNome}
        //             aluDados={atividade}
        //             dataAtual={dataAtual}
        //             funcPut={putAluno}
        //             funcAbrir={abrirFecharEditarAtividades}
        //             funcData={dataAuxiliar}
        //             funcAtualizaCampoAtivo={atualizaCampoAtivo}
        //             funcAtualizaCampo={atualizaCampo}
        //         />

        //         <FormExcluir
        //             nome={"Aluno"}
        //             abrir={abrirExcluirAtividades}
        //             aluNome={atividade && atividade.aluNome}
        //             aluDados={atividade.aluCodigo}
        //             funcDelete={deleteAluno}
        //             funcAbrir={abrirFecharExcluirAtividades}
        //         /> */}
        //     </div>
        // </Mestre >
    );
}