import React from "react";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";
import { modalidadeUrl } from "../../services/Imagens";

import FormInserir from "../../components/Forms/FormInserir";
import FormEditar from "../../components/Forms/FormEditar";
import FormExcluir from "../../components/Forms/FormExcluir";

import Modelo from "../../components/Layout/Modelo";

import TipoModalidade from "../../funcoes/TipoDesafio"

import ComponenteText from "../../components/Layout/Componentes/ComponenteText";
import ComponenteAtivo from "../../components/Layout/Componentes/ComponenteAtivo";
import ComponenteComboBox from "../../components/Layout/Componentes/ComponenteComboBox";

import "./ModalidadesCrud.css";
import tipoDesafio from "../../funcoes/TipoDesafio";

class Modalidade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carregando: false,
            updateModalidades: false,
            abrirCadastroModalidades: false,
            abrirEditarModalidades: false,
            abrirExcluirModalidades: false,
            modalidadesData: [],
            treinadoresData: [],
            modalidade: {
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
            },
            modalidadeInitialState: {
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
            },
            tipoDesafio: [
                { id: 1, nome: "Distância" },
                { id: 2, nome: "Tempo" },
                { id: 3, nome: "Frequência" },
            ],
            tipoMedida: [
                { id: 1, nome: "Km" },
                { id: 2, nome: "Metros" },
                { id: 3, nome: "Horas" },
                { id: 4, nome: "Minutos" },
                { id: 5, nome: "Dias" },
            ],
        };
    }

    abrirFecharCadastroModalidades = (abrir) => {
        this.setState({ abrirCadastroModalidades: !this.state.abrirCadastroModalidades || !abrir });
        this.setState({ modalidade: this.state.modalidadeInitialState });
    }

    abrirFecharEditarModalidades = (abrir) => {
        this.setState({ abrirEditarModalidades: !this.state.abrirEditarModalidades || !abrir });
    }

    abrirFecharExcluirModalidades = (abrir) => {
        this.setState({ abrirExcluirModalidades: !this.state.abrirExcluirModalidades || !abrir });
    }

    selecionarModalidade = (modalidade, opcao) => {
        this.setState({ modalidade: modalidade });
        if (opcao === "Editar") {
            this.abrirFecharEditarModalidades();
            this.getModalidadeById(modalidade.modCodigo);
        } else if (opcao === "Excluir") {
            this.abrirFecharExcluirModalidades();
        }
    }

    atualizaCampo = e => {
        const { name, value } = e.target;
        this.setState({
            modalidade: {
                ...this.state.modalidade,
                [name]: value
            }
        });
    }

    atualizaCampoTipoDesafio = e => {
        let listaAtualizada = TipoModalidade(e.target.value);
        this.setState({
            tipoMedida: listaAtualizada,
        });
        this.atualizaCampo(e);
    }

    atualizaCampoAtivo = e => {
        const { name, checked } = e.target;
        this.setState({
            modalidade: {
                ...this.state.modalidade,
                [name]: checked
            }
        });
    }

    getModalidades = async (skip = 0) => {
        this.setState({ carregando: true });
        await Api.get(`modalidade?skip=${skip}`).then(response => {
            this.setState({ modalidadesData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getModalidadeById = async (id) => {
        this.setState({ carregando: true });
        await Api.get(`modalidade/${id}`).then(response => {
            this.setState({ modalidade: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getTreinadores = async (skip = 0) => {
        this.setState({ carregando: true });
        await Api.get(`treinador?skip=${skip}`).then(response => {
            this.setState({ treinadoresData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    postModalidades = async () => {
        await Api.post("modalidade/", this.state.modalidade).then(response => {
            // this.setState({ modalidade: response.data });
            this.setState({ updateModalidades: true });
            this.abrirFecharCadastroModalidades(true);
        }).catch(error => {
            console.log(error);
        });
        this.setState({ modalidade: this.state.modalidadeInitialState });
    }

    putModalidade = async (codigo = this.state.modalidade.modCodigo) => {
        await Api.put("modalidade/" + codigo, this.state.modalidade).then(response => {
            var modalidadesAuxiliar = this.state.modalidadesData;
            modalidadesAuxiliar.map(modalidadeMap => {
                if (modalidadeMap.modCodigo === this.state.modalidade.modCodigo) {
                    modalidadeMap.modNome = this.state.modalidade.modNome;
                    modalidadeMap.modImagem = this.state.modalidade.modImagem;
                    modalidadeMap.modId = this.state.modalidade.modId;
                    modalidadeMap.modTipoDesafio = this.state.modalidade.modTipoDesafio;
                    modalidadeMap.modTipoMedida = this.state.modalidade.modTipoMedida;
                    modalidadeMap.modAtiva = this.state.modalidade.modAtiva;
                }
                return modalidadeMap;
            });
            this.setState({ modalidadesData: modalidadesAuxiliar });
            // setAluno(response.data);
            this.setState({ updateModalidades: true });
            this.abrirFecharEditarModalidades(true);
        }).catch(error => {
            console.log(error);
        });
    }

    deleteModalidade = async () => {
        await Api.delete("modalidade/" + this.state.modalidade.modCodigo).then(response => {
            this.setState({ updateModalidades: true });
            this.abrirFecharExcluirModalidades(true);
        }).catch(error => {
            console.log(error);
        });
    }

    getModalidadeNome = async (busca) => {
        this.setState({ carregando: true });
        await Api.get("modalidade/" + busca).then(response => {
            this.setState({ modalidadesData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    componentDidMount() {
        this.getModalidades();
        this.getTreinadores();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.modalidade !== this.state.modalidade) {
            this.setState({ modalidade: this.state.modalidade });
        }

        if (prevState.modalidadesData !== this.state.modalidadesData) {
            this.setState({ modalidadesData: this.state.modalidadesData });
        }

        if (prevState.updateModalidades !== this.state.updateModalidades) {
            this.getModalidades();
            this.setState({ updateModalidades: false });
        }

        if (prevState.abrirCadastroModalidades !== this.state.abrirCadastroModalidades) {
            this.getTreinadores();
        }

        if (prevState.abrirEditarModalidades !== this.state.abrirEditarModalidades) {
            this.getTreinadores();
        }
    }

    render() {
        return (
            <React.Fragment>
                <Modelo
                    urlApi="modalidade?skip="
                    titulo="Cadastro Modalidades"
                    subtitulo="Painel Sou+Fit"
                    icone="bookmark"
                    tipoContainer="modalidade-container"
                    Cabecalho="Modalidades"
                    BotaoAdd="Adicionar Modalidade"
                    dadosApi={this.state.modalidadesData}
                    getDados={this.getModalidades}
                    getByNome={this.getModalidadeNome}
                    funcAbrirCadastro={this.abrirFecharCadastroModalidades}
                    colunas={[
                        { nome: "Avatar" },
                        { nome: "Nome" },
                    ]}
                >
                    {this.state.carregando ? <div className="spinner-border loader" role="status"></div>
                        :
                        <tbody>
                            {this.state.modalidadesData.map((modalidade) => (
                                <tr key={modalidade.modCodigo}>
                                    <td><img src={modalidadeUrl + modalidade.modImagem} alt="" /></td>
                                    <td>{modalidade.modNome}</td>
                                    <td className="justify-content-end">
                                        <button className="btn btn-warning" onClick={() => this.selecionarModalidade(modalidade, "Editar")}>
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => this.selecionarModalidade(modalidade, "Excluir")}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </Modelo>

                <FormInserir
                    nome={"Modalidade"}
                    abrir={this.state.abrirCadastroModalidades}
                    funcAbrir={this.abrirFecharCadastroModalidades}
                    funcPost={this.postModalidades}
                >
                    <form className="row g-3 form-group">
                        <ComponenteText 
                            tamanho="col-md-5"
                            label="Nome:"
                            name="modNome"
                            type="text"
                            placeholder="Nome Sobrenome"
                            onChange={this.atualizaCampo}
                        />
                        {/* <div className="col-md-5">
                            <label className="form-label mb-0">Nome:</label>
                            <input type="text" className="form-control" placeholder="Nome Sobrenome"
                                name="modNome" onChange={e => this.atualizaCampo(e)} />
                        </div> */}
                        <div className="col-md-4">
                            <label className="form-label mb-0">Tipo Desafio:</label>
                            <select className="form-select w-100 h-50"
                                name="modTipoDesafio"
                                onChange={e => this.atualizaCampoTipoDesafio(e)}>
                                <option value=""></option>
                                {
                                    this.state.tipoDesafio.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.nome}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mb-0">Tipo Medida:</label>
                            <select className="form-select w-100 h-50"
                                name="modTipoMedida"
                                onChange={e => this.atualizaCampo(e)}>
                                <option value=""></option>
                                {
                                    this.state.tipoMedida.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.nome}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-8 mt-5">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck"
                                    name="modAtiva"
                                    checked={this.state.modalidade.modAtiva}
                                    onChange={e => this.atualizaCampoAtivo(e)}
                                    value={true} />
                                <label className="form-check-label">Modalidade Ativa</label>
                            </div>
                        </div>
                        <div className="col-md-4 mt-5">
                            <label className="form-label mb-0">Imagem:</label>
                            <input type="image" alt="imagem" className="container border-dark" />
                        </div>
                    </form>
                </FormInserir>

                <FormEditar
                    nome={"Modalidade"}
                    abrir={this.state.abrirEditarModalidades}
                    funcAbrir={this.abrirFecharEditarModalidades}
                    funcPut={this.putModalidade}
                >
                    <form className="row g-3 form-group">
                        <div className="col-md-5">
                            <label className="form-label mb-0">Nome:</label>
                            <input type="text" className="form-control" placeholder="Nome Sobrenome"
                                name="modNome" onChange={e => this.atualizaCampo(e)}
                                value={this.state.modalidade.modNome}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label mb-0">Tipo Desafio:</label>
                            <select className="form-select w-100 h-50"
                                name="modTipoDesafio"
                                value={this.state.modalidade.modTipoDesafio}
                                onChange={e => this.atualizaCampoTipoDesafio(e)}>
                                <option value=""></option>
                                {
                                    this.state.tipoDesafio.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.nome}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mb-0">Tipo Medida:</label>
                            <select className="form-select w-100 h-50"
                                name="modTipoMedida"
                                value={this.state.modalidade.modTipoMedida}
                                onChange={e => this.atualizaCampo(e)}>
                                <option value=""></option>
                                {
                                    this.state.tipoMedida.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.nome}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-4 mt-5">
                            <label className="form-label mb-0">Imagem:</label>
                            {/* <input type="image" alt="imagem" className="container border-dark" /> */}
                            <img src={modalidadeUrl + this.state.modalidade.modImagem} alt="" />
                        </div>
                    </form>
                </FormEditar>

                <FormExcluir
                    nome={"Modalidade"}
                    abrir={this.state.abrirExcluirModalidades}
                    funcAbrir={this.abrirFecharExcluirModalidades}
                    funcDelete={this.deleteModalidade}
                    dados={this.state.modalidade.modNome}
                />
            </React.Fragment>
        )
    }
}

export default Modalidade;

//     const putModalidade = async (codigo = modalidade.aluCodigo) => {
//         await Api.put("modalidade/" + codigo, modalidade).then(response => {
//             var modalidadesAuxiliar = modalidadesData;
//             modalidadesAuxiliar.map(modalidadeMap => {
//                 if (modalidadeMap.modCodigo === modalidade.modCodigo) {
//                     modalidadeMap.modNome = modalidade.modNome;
//                     modalidadeMap.modImagem = modalidade.modImagem;
//                     modalidadeMap.modId = modalidade.modId;
//                     modalidadeMap.modTipoDesafio = modalidade.modTipoDesafio;
//                     modalidadeMap.modTipoMedida = modalidade.modTipoMedida;
//                     modalidadeMap.modAtiva = modalidade.modAtiva;
//                 }
//                 return modalidadeMap;
//             });
//             setModalidadesData(modalidadesAuxiliar);
//             // setAluno(response.data);
//             setUpdateModalidades(true);
//             // abrirFecharEditarAlunos();
//         }).catch(error => {
//             console.log(error);
//         });
//     }

//     const deleteModalidade = async (modalidade = modalidade.aluCodigo) => {
//         await Api.delete("modalidade/" + modalidade).then(response => {
//             setUpdateModalidades(true);
//             // abrirFecharExcluirAlunos();
//         }).catch(error => {
//             console.log(error);
//         });
//     }

//     const getModalidadeNome = async (busca) => {
//         setCarregando(true);
//         await Api.get("modalidade/" + busca).then(response => {
//             setModalidadesData(response.data);
//         }).catch(error => {
//             console.log(error);
//         });
//         setCarregando(false);
//     }

//     useEffect(() => {
//         if (updateModalidades) {
//             getModalidades();
//             setUpdateModalidades(false);
//         }
//     }, [updateModalidades]);

//     useEffect(() => {
//         getTreinadores();
//     }, [setAbrirCadastroModalidades]);

//     useEffect(() => {
//         getTreinadorId(modalidade.treCodigo);
//     }, [setAbrirEditarModalidades]);

//     function handleDefault(e) {
//         e.preventDefault();
//     }

//     const alterarPagina = (e) => {
//         e === "&gt;" ? pagina > modalidadesData.length ? avancarPagina()
//             : avancarPagina(pagina * 10)
//             : voltarPagina(pagina * 10);
//     }

//     const avancarPagina = async (skip) => {
//         getModalidades(skip);
//         pagina > modalidadesData.length ? setPagina(1) :
//             setPagina(pagina + 1);
//     }

//     const voltarPagina = async (skip) => {
//         skip = skip - 20;
//         getModalidades(skip);
//         pagina > 1 ? setPagina(pagina - 1) : setPagina(1);
//     }

//     return (
//         <Mestre icon="bookmark" title="Cadastro Modalidades" subtitle="Painel Sou+Fit">
//             <div className="modalidade-container">
//                 <header>
//                     <h3>Modalidades</h3>
//                     <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroModalidades()}><strong>+</strong> Adicionar Modalidades</button>
//                 </header>
//                 <hr />
//                 <Busca buscar={getModalidadeNome}/>
//                 <br />
//                 {carregando ? <div className="spinner-border loader" role="status">
//                 </div>
//                     : <table className="table table-striped">
//                         <thead>
//                             <tr>
//                                 <th>Avatar</th>
//                                 <th>Nome</th>
//                                 <th className="acoes">Ações</th>
//                             </tr>
//                         </thead>
                        // <tbody>
                        //     {modalidadesData.map((modalidade) => (
                        //         <tr key={modalidade.modCodigo}>
                        //             <td><img src={modalidadeUrl + modalidade.modImagem} alt="" /></td>
                        //             <td>{modalidade.modNome}</td>
                        //             <td className="justify-content-end">
                        //                 <button className="btn btn-warning" onClick={() => selecionarAluno(modalidade, "Editar")}>
                        //                     <i className="fa fa-pencil"></i>
                        //                 </button>{" "}
                        //                 <button className="btn btn-danger" onClick={() => selecionarAluno(modalidade, "Excluir")}>
                        //                     <i className="fa fa-trash"></i>
                        //                 </button>
                        //             </td>
                        //         </tr>
                        //     ))}
                        // </tbody>
//                     </table>
//                 }
//                 <hr />
//                 <br />
//                 <div className="d-flex justify-content-center">
//                     <nav aria-label="Page navigation example">
//                         <ul className="pagination">
//                             <li className="page-item" onClick={() => alterarPagina("&lt;")}><a className="page-link">&lt;</a></li>
//                             <li className="page-item active"><p className="page-link">{pagina}</p></li>
//                             <li className="page-item"><a className="page-link" onClick={() => alterarPagina("&gt;")}>&gt;</a></li>
//                         </ul>
//                     </nav>
//                 </div>

                // <FormInserir
                //     nome={"Modalidade"}
                //     abrir={abrirCadastroModalidades}
                //     aluDados={modalidade}
                //     funcPost={postModalidades}
                //     funcAbrir={abrirFecharCadastroModalidades}
                //     funcAtualizaCampo={atualizaCampo}
                //     treinaData={treinadoresData}
                //     funcBuscaTreinador={getTreinadorId}
                // />

//                 <FormEditar
//                     nome={"Modalidade"}
//                     abrir={abrirEditarModalidades}
//                     modNome={modalidade && modalidade.modNome}
//                     modDados={modalidade}
//                     funcPut={putModalidade}
//                     funcAbrir={abrirFecharEditarModalidades}
//                     funcAtualizaCampo={atualizaCampo}
//                     treinaData={treinadoresData}
//                     funcBuscaTreinador={getTreinadorId}
//                 />

//                 <FormExcluir
//                     nome={"Modalidade"}
//                     abrir={abrirExcluirModalidades}
//                     modNome={modalidade && modalidade.aluNome}
//                     modDados={modalidade.aluCodigo}
//                     funcDelete={deleteModalidade}
//                     funcAbrir={abrirFecharExcluirModalidades}
//                 />
//             </div>
//         </Mestre >
//     );
// }