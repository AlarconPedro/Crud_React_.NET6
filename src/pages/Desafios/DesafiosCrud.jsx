import React, { useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";
import { desafioUrl, alunoUrl } from "../../services/Imagens";

import { BsJustify } from "react-icons/bs";

import "./DesafiosCrud.css";

import FormInserir from "../../components/Crud/FormularioDesafio/FormInserir";
import FormEditar from "../../components/Forms/FormEditar";
import FormExcluir from "../../components/Crud/FormularioDesafio/FormExcluir";
import FormParticipantes from "../../components/Crud/FormularioDesafio/FormParticipantes";

import Modelo from "../../layout/Modelo";

import ConverteData from "../../funcoes/ConverteData";
import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import CheckBox from "../../layout/Objetos/CheckBox";

export default function DesafiosCrud() {

    const [carregando, setCarregando] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());
    const [dataFinal, setDataFinal] = useState(new Date());

    const [desafiosData, setDesafiosData] = useState([]);

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [modalidadeData, setModalidadeData] = useState([]);

    const [desafioInitialState] = useState({
        desCodigo: 0,
        desNome: '',
        desDescricao: '',
        desDataInicio: new Date("01/01/1900"),
        desDataFim: new Date("01/01/1900"),
        desTipoDesafio: '',
        desMedidaDesafio: '',
        treCodigo: '',
        desImagem: '',
        desId: '',
        desExclusivoAluno: false,
        desTipoMedida: 0,
        desDataInicioExibicao: new Date("01/01/1900"),
        tbAlunoDesafios: [],
        tbDesafioModalidades: [],
        treCodigoNavigation: null,
        total: 0,
    });


    const [desafio, setDesafio] = useState({
        desCodigo: 0,
        desNome: '',
        desDescricao: '',
        desDataInicio: new Date("01/01/1900"),
        desDataFim: new Date("01/01/1900"),
        desTipoDesafio: '',
        desMedidaDesafio: '',
        treCodigo: '',
        desImagem: '',
        desId: '',
        desExclusivoAluno: false,
        desTipoMedida: 6,
        desDataInicioExibicao: new Date("01/01/1900"),
        tbAlunoDesafios: [],
        tbDesafioModalidades: [],
        treCodigoNavigation: null,
        total: 0,
    });

    const [abrirCadastroDesafios, setAbrirCadastroDesafios] = useState(false);
    const [abrirEditarDesafios, setAbrirEditarDesafios] = useState(false);
    const [abrirExcluirDesafios, setAbrirExcluirDesafios] = useState(false);
    const [abrirParticipantes, setAbrirParticipantes] = useState(false);
    const [updateDesafios, setUpdateDesafios] = useState(true);

    const abrirFecharCadastroDesafios = (abrirCadastroDesafios) => {
        setAbrirCadastroDesafios(!abrirCadastroDesafios);
        setDesafio(desafioInitialState);
    }

    const abrirFecharEditarDesafios = (abrirEditarDesafios) => {
        setAbrirEditarDesafios(!abrirEditarDesafios);
    }

    const abrirFecharExcluirDesafios = (abrirExcluirDesafios) => {
        setAbrirExcluirDesafios(!abrirExcluirDesafios);
    }

    const abrirFecharParticipantes = (abrirParticipantes) => {
        setAbrirParticipantes(!abrirParticipantes);
    }

    const selecionarDesafio = (desafio, opcao) => {
        setDesafio(desafio);
        if (opcao === "Participantes") {
            abrirFecharParticipantes();
        } else if (opcao === "Editar") {
            abrirFecharEditarDesafios();
            getDesafioId(desafio.desCodigo);
        } else {
            abrirFecharExcluirDesafios();
        }
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        setDesafio({
            ...desafio,
            [name]: value
        });
    }

    const atualizaCampoAtivo = e => {
        const { name, value } = e.target;
        setDesafio({
            ...desafio,
            [name]: value === "true" ? true : false
        });
    }

    const getDesafios = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`desafio?skip=${skip}`).then(response => {
            setDesafiosData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const getDesafioId = async (id) => {
        setCarregando(true);
        await Api.get(`desafio/${id}`).then(response => {
            setDesafio(response.data);
            console.log(desafio);
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

    const postDesafio = async () => {
        // await dataInicio(dataAtual);
        await Api.post("desafio/", desafio).then(response => {
            setDesafio(response.data);
            setUpdateDesafios(true);
            abrirFecharCadastroDesafios();
        }).catch(error => {
            console.log(error);
        });
        setDesafio(desafioInitialState);
    }

    const updateDesafio = async () => {
        await Api.put("desafio/" + desafio.desCodigo, desafio).then(response => {
            var desafiosAuxiliar = desafiosData;
            desafiosAuxiliar.map(desafioMap => {
                if (desafioMap.desCodigo === this.state.desafio.desCodigo) {
                    desafioMap.desNome = this.state.desafio.desNome;
                    desafioMap.desDescricao = this.state.desafio.desDescricao;
                    desafioMap.desDataInicio = this.state.desafio.desDataInicio;
                    desafioMap.desDataFim = this.state.desafio.desDataFim;
                    desafioMap.desTipoDesafio = this.state.desafio.desTipoDesafio;
                    desafioMap.desMedidaDesafio = this.state.desafio.desMedidaDesafio;
                    desafioMap.desExclusivoAluno = this.state.desafio.desExclusivoAluno;
                    desafioMap.desDataInicioExibicao = this.state.desafio.desDataInicioExibicao;
                    desafioMap.tbDesafioModalidades = this.state.desafio.tbDesafioModalidades;
                }
            });
            setDesafiosData(desafiosAuxiliar);
            abrirFecharEditarDesafios();
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteDesafio = async () => {
        await Api.delete("desafio/" + desafio.desCodigo).then(response => {
            setUpdateDesafios(true);
            abrirFecharExcluirDesafios();
        }).catch(error => {
            console.log(error);
        });
    }

    const getDesafioNome = async (nome) => {
        setCarregando(true);
        await Api.get("desafio/" + nome).then(response => {
            setDesafiosData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    useEffect(() => {
        if (updateDesafios) {
            getDesafios();
            setUpdateDesafios(false);
        }
    }, [updateDesafios]);

    useEffect(() => {
        getTreinadores();
    }, [setAbrirCadastroDesafios]);

    useEffect(() => {
        getTreinadorId(desafio.treCodigo);
    }, [setAbrirEditarDesafios]);

    useEffect(() => {
        getModalidades();
    }, [setAbrirCadastroDesafios]);

    useEffect(() => {
        setUpdateDesafios(true);
    }, [abrirCadastroDesafios]);

    return (
        <React.Fragment>
            <Modelo
                urlApi="desafio?skip="
                titulo="Cadastro Desafios"
                subtitulo="Painel Sou+Fit"
                icone="trophy"
                tipoContainer="desafio-container"
                Cabecalho="Desafios"
                BotaoAdd="Adicionar Desafios"
                dadosApi={desafiosData}
                getDados={getDesafios}
                getByNome={getDesafioNome}
                funcAbrirCadastro={abrirFecharCadastroDesafios}
                colunas={[
                    { nome: "Avatar" },
                    { nome: "Nome" },
                    { nome: "Data Inicio" },
                    { nome: "Data Fim" },
                    { nome: "Participantes" },
                    { nome: "Alunos" },
                ]}
            >
                {carregando ? <div className="spinner-border loader" role="status"></div>
                    :
                    <tbody>
                        {desafiosData.map((desafio) => (
                            <tr key={desafio.desCodigo}>
                                <td className="pt-3"><img src={desafioUrl + desafio.desImagem} alt="" /></td>
                                <td className="pt-3">{desafio.desNome}</td>
                                <td className="pt-3">{ConverteData(desafio.desDataInicio)}</td>
                                <td className="pt-3">{ConverteData(desafio.desDataFim)}</td>
                                <td className="pt-3 pl-5">{desafio.total}</td>
                                <td className="pl-4 pt-3 listar" onClick={() => selecionarDesafio(desafio, "Participantes")}><BsJustify /></td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => selecionarDesafio(desafio, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => selecionarDesafio(desafio, "Excluir")}>
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
                codigoDesafio={desafio.desCodigo}
                alunoUrl={alunoUrl}
           />

            <FormInserir
                nome={"Desafio"}
                abrir={abrirCadastroDesafios}
                funcAbrir={abrirFecharCadastroDesafios}
                funcPost={postDesafio}
            >
                <form className="row g-3 form-group">
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desNome"
                            onChange={(e) => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0">Data Início:</label>
                        <DatePicker
                            className="form-control"
                            name="desDataInicio"
                            selected={new Date(desafio.desDataInicio)}
                            onChange={date => atualizaCampo(date)}
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
                            selected={new Date(desafio.desDataFim)}
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
                    <div className="col-md-4 mt-2">
                        <label className="form-label mb-0">Tipo do Desafio:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desTipoDesafio"
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-4 mt-2">
                        <label className="form-label mb-0">Tipo da Medida:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desTipoMedida"
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-4 mt-2">
                        <label className="form-label mb-0">Medida:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desMedidaDesafio"
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-6 mt-2">
                        <label className="form-label mb-0">Observação:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Obs."
                            name="desObs"
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Disponível a Partir:</label>
                        <DatePicker
                            className="form-control"
                            name="desDataInicioExibicao"
                            selected={new Date(desafio.desDataInicioExibicao)}
                            onChange={date => atualizaCampo(date)}
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
                    <div className="col-2 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                                name="desExclusivoAluno"
                                onChange={e => atualizaCampoAtivo(e)}
                                checked={desafio.desExclusivoAluno}
                                value={true} />
                            <label className="form-check-label">Exclusivo Aluno</label>
                        </div>
                    </div>
                    <div className="selecionarModalidade ml-2">
                        <label className="form-label mb-0 ml-2 mt-3">Modalidade:</label>
                        {
                            modalidadeData.map((modalidade) => {
                                return (
                                    <CheckBox
                                        codigo={modalidade.modCodigo}
                                        nome={modalidade.modNome}
                                        codigoSelecionado={desafio.desCodigo}
                                        url={`desafio/modalidades/${desafio.desCodigo}`}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className="col-md-5"></div>
                    <div className="col-md-4 mt-5 logoDesafio">
                        <label className="form-label mb-0">Imagem:</label>
                        {/* <img className="imagem" src={desafioUrl + this.state.desafio.desImagem} alt="" /> */}
                    </div>
                </form>
            </FormInserir>

            <FormEditar
                nome={"Desafio"}
                abrir={abrirEditarDesafios}
                funcAbrir={abrirFecharEditarDesafios}
                funcPut={updateDesafio}
            >
                <form className="row g-3 form-group">
                    <div className="col-md-12">
                        <label className="mb-0">Id: </label>
                        <input type="number" className="form-control mb-2" readOnly disabled
                            value={desafio.desCodigo}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desNome"
                            value={desafio.desNome}
                            onChange={(e) => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0">Data Início:</label>
                        <DatePicker
                            className="form-control"
                            name="desDataInicio"
                            selected={new Date(desafio.desDataInicio)}
                            onChange={date => atualizaCampo(date)}
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
                            selected={new Date(desafio.desDataFim)}
                            onChange={date => atualizaCampo(date)}
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
                    <div className="col-md-4 mt-2">
                        <label className="form-label mb-0">Tipo do Desafio:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desTipoDesafio"
                            value={desafio.desTipoDesafio}
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-4 mt-2">
                        <label className="form-label mb-0">Tipo da Medida:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desTipoMedida"
                            value={desafio.desTipoMedida}
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-4 mt-2">
                        <label className="form-label mb-0">Medida:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desMedidaDesafio"
                            value={desafio.desMedidaDesafio}
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-6 mt-2">
                        <label className="form-label mb-0">Observação:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Obs."
                            name="desObs"
                            value={desafio.desObs}
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Disponível a Partir:</label>
                        <DatePicker
                            className="form-control"
                            name="desDataInicioExibicao"
                            selected={new Date(desafio.desDataInicioExibicao)}
                            onChange={date => atualizaCampo(date)}
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
                    <div className="col-2 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                                name="desExclusivoAluno"
                                onChange={e => atualizaCampoAtivo(e)}
                                checked={desafio.desExclusivoAluno}
                                value={true} />
                            <label className="form-check-label">Exclusivo Aluno</label>
                        </div>
                    </div>
                    <div className="selecionarModalidade ml-2">
                        <label className="form-label mb-0 ml-2 mt-3">Modalidade:</label>
                        {
                            modalidadeData.map((modalidade) => {
                                return (
                                    <CheckBox
                                        codigo={modalidade.modCodigo}
                                        nome={modalidade.modNome}
                                        codigoSelecionado={desafio.desCodigo}
                                        url={`desafio/modalidades/${desafio.desCodigo}`}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className="col-md-5"></div>
                    <div className="col-md-4 mt-5 logoDesafio">
                        <label className="form-label mb-0">Imagem:</label>
                        <img className="imagem" src={desafioUrl + desafio.desImagem} alt="" />
                    </div>
                </form>
            </FormEditar>

            <FormExcluir 
                nome={"Desafio"}
                dados={desafio.desNome}
                abrir={abrirExcluirDesafios}
                funcAbrir={abrirFecharExcluirDesafios}
                funcDelete={deleteDesafio}
            />
        </React.Fragment>
        // <Mestre icon="trophy" title="Cadastro Desafios" subtitle="Painel Sou+Fit">
        //     <div className="desafio-container">
        //         <header>
        //             <h3>Desafios</h3>
        //             <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroDesafios()}><strong>+</strong> Adicionar Desafios</button>
        //         </header>
        //         <hr />
        //         <Busca buscar={getDesafioNome}/>
        //         <br />
        //         {carregando ? <div className="spinner-border loader" role="status">
        //         </div>
        //             : <table className="table table-striped">
        //                 <thead>
        //                     <tr>
        //                         <th>Avatar</th>
        //                         <th>Nome</th>
        //                         <th>Data Inicio</th>
        //                         <th>Data Fim</th>
        //                         <th>Participantes</th>
        //                         <th>Alunos</th>
        //                         <th className="pl-4 acoes">Ações</th>
        //                     </tr>
        //                 </thead>
        // <tbody>
        //     {desafiosData.map((desafio) => (
        //         <tr key={desafio.desCodigo}>
        //             <td className="pt-3"><img src={desafioUrl + desafio.desImagem} alt="" /></td>
        //             <td className="pt-3">{desafio.desNome}</td>
        //             <td className="pt-3">{dataInicioExibicao(desafio.desDataInicio)}</td>
        //             <td className="pt-3">{dataInicioExibicao(desafio.desDataFim)}</td>
        //             <td className="pt-3 pl-5">{desafio.total}</td>
        //             <td className="pl-4 pt-3 listar" onClick={() => selecionarDesafio(desafio, "Participantes")}><BsJustify /></td>
        //             <td>
        //                 <button className="btn btn-warning" onClick={() => selecionarDesafio(desafio, "Editar")}>
        //                     <i className="fa fa-pencil"></i>
        //                 </button>{" "}
        //                 <button className="btn btn-danger" onClick={() => selecionarDesafio(desafio, "Excluir")}>
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

        //         <FormParticipantes
        //             abrir={abrirParticipantes}
        //             funcAbrir={abrirFecharParticipantes}
        //             codigoDesafio={desafio.desCodigo}
        //             funcAtualizaCampo={atualizaCampo}
        //             // funcPut={putDesafio}
        //         />

        //         <FormInserir
        //             abrir={abrirCadastroDesafios}
        //             funcAbrir={abrirFecharCadastroDesafios}
        //             abrirEditar={abrirFecharEditarDesafios}
        //             funcPost={postDesafio}
        //             modalidades={modalidadeData}
        //             funcAtualizaCampo={atualizaCampo}
        //             funcAtualizaCampoAtivo={atualizaCampoAtivo}
        //             funcDataInicio={dataInicio}
        //             funcDataFim={dataFim}
        //             funcMascaraTelefone={mascaraTelefone}
        //             treinadoresData={treinadoresData}
        //             desafio={desafio}
        //             desCodigo={desafio.desCodigo}
        //             dataInicio={desafio.desDataInicio}
        //             dataFim={desafio.desDataFim}
        //         />

        //         <FormEditar
        //             abrir={abrirEditarDesafios}
        //             funcAbrir={abrirFecharEditarDesafios}
        //             funcAtualizaCampo={atualizaCampo}
        //             funcAtualizaCampoAtivo={atualizaCampoAtivo}
        //             funcDataInicio={dataInicio}
        //             funcDataFim={dataFim}
        //             funcMascaraTelefone={mascaraTelefone}
        //             treinadoresData={treinadoresData}
        //             desafio={desafio}
        //             modalidades={modalidadeData}
        //             desCodigo={desafio.desCodigo}
        //             dataInicio={desafio.desDataInicio}
        //             dataFim={desafio.desDataFim}
        //         />

        //         <FormExcluir
        //             abrir={abrirExcluirDesafios}
        //             funcAbrir={abrirFecharExcluirDesafios}
        //             funcDelete={deleteDesafio}
        //             desafio={desafio}
        //         />
        //     </div>
        // </Mestre >
    );
}