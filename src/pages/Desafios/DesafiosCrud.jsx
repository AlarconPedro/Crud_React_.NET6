import React, { useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";
import { desafioUrl, alunoUrl } from "../../services/Imagens";

import { BsJustify } from "react-icons/bs";

import "./DesafiosCrud.css";

import FormInserir from "../../components/Forms/FormInserir";
import FormEditar from "../../components/Forms/FormEditar";
import FormExcluir from "../../components/Forms/FormExcluir";
import FormParticipantes from "../../components/Crud/FormularioDesafio/FormParticipantes";

import Modelo from "../../components/Layout/Modelo";

import ConverteData from "../../funcoes/ConverteData";
import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import ComponenteData from "../../components/Layout/Componentes/ComponenteData";
import ComponenteText from "../../components/Layout/Componentes/ComponenteText";
import ComponenteAtivo from "../../components/Layout/Componentes/ComponenteAtivo";
import ComponenteImagem from "../../components/Layout/Componentes/ComponenteImagem";

import CheckBox from "../../components/Layout/Componentes/CheckBox";

class Desafio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrirCadastroDesafios: false,
            abrirEditarDesafios: false,
            abrirExcluirDesafios: false,
            abrirParticipantes: false,
            updateDesafios: false,
            carregando: false,
            desafiosData: [],
            treinadoresData: [],
            modalidadeData: [],
            desafioInitialState: {
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
                treCodigoNavigation: null,
                tbDesafioModalidades: [],
                total: 0,
            },
            desafio: {
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
                treCodigoNavigation: null,
                tbDesafioModalidades: [],
                total: 0,
            },
        }

        this.abrirFecharCadastroDesafios = this.abrirFecharCadastroDesafios.bind(this);
        this.abrirFecharEditarDesafios = this.abrirFecharEditarDesafios.bind(this);
        this.abrirFecharExcluirDesafios = this.abrirFecharExcluirDesafios.bind(this);
        this.abrirFecharParticipantes = this.abrirFecharParticipantes.bind(this);
        this.selecionarDesafio = this.selecionarDesafio.bind(this);
        this.atualizaCampo = this.atualizaCampo.bind(this);
        this.atualizaCampoAtivo = this.atualizaCampoAtivo.bind(this);
        this.getDesafios = this.getDesafios.bind(this);
        this.getDesafioId = this.getDesafioId.bind(this);
        this.getModalidades = this.getModalidades.bind(this);
        this.getTreinadores = this.getTreinadores.bind(this);
        this.getTreinadorId = this.getTreinadorId.bind(this);
        this.postDesafio = this.postDesafio.bind(this);
        this.updateDesafio = this.updateDesafio.bind(this);
        this.deleteDesafio = this.deleteDesafio.bind(this);
        this.getDesafioNome = this.getDesafioNome.bind(this);
    }

    abrirFecharCadastroDesafios = (abrir) => {
        this.setState({ abrirCadastroDesafios: !abrir || !this.state.abrirCadastroDesafios });
        this.setState({ desafio: this.state.desafioInitialState });
    }

    abrirFecharEditarDesafios = (abrir) => {
        this.setState({ abrirEditarDesafios: !this.state.abrirEditarDesafios || !abrir });
    }

    abrirFecharExcluirDesafios = (abrir) => {
        this.setState({ abrirExcluirDesafios: !abrir || !this.state.abrirExcluirDesafios });
    }

    abrirFecharParticipantes = (abrir) => {
        this.setState({ abrirParticipantes: !abrir || !this.state.abrirParticipantes });
    }

    selecionarDesafio = (desafio, opcao) => {
        this.setState({ desafio: desafio });
        if (opcao === "Participantes") {
            this.abrirFecharParticipantes();
        } else if (opcao === "Editar") {
            this.abrirFecharEditarDesafios();
            this.getDesafioId(desafio.desCodigo);
        } else {
            this.abrirFecharExcluirDesafios();
        }
    }

    atualizaCampo = e => {
        const { name, value } = e.target;
        this.setState({
            desafio: {
                ...this.state.desafio,
                [name]: value
            }
        });
    }

    atualizaCampoData = e => {
        const { name, value } = e.target;
        this.setState({
            desafio: {
                ...this.state.desafio,
                [name]: e
            }
        });
    }

    atualizaCampoAtivo = e => {
        // const { name, value } = e.target;
        this.setState({
            desafio: {
                ...this.state.desafio,
                desExclusivoAluno: e.target.checked
            }
        });
    }

    getDesafios = async (skip = 0) => {
        this.setState({ carregando: true });
        await Api.get(`desafio?skip=${skip}`).then(response => {
            this.setState({ desafiosData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getDesafioId = async (id) => {
        this.setState({ carregando: true });
        await Api.get(`desafio/${id}`).then(response => {
            this.setState({ desafio: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getModalidades = async () => {
        await Api.get("modalidade").then(response => {
            this.setState({ modalidadeData: response.data });
        }).catch(error => {
            console.log(error);
        });
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

    getTreinadorId = async (id) => {
        await Api.get(`treinador/${id}`).then(response => {
            this.setState({ treinadoresData: response.data });
        }).catch(error => {
            console.log(error);
        });
    }

    postDesafio = async () => {
        // await dataInicio(dataAtual);
        await Api.post("desafio/", this.state.desafio).then(response => {
            this.setState({ desafio: response.data });
            this.setState({ updateDesafios: true });
            this.abrirFecharCadastroDesafios();
        }).catch(error => {
            console.log(error);
        });
        this.setState({ desafio: this.state.desafioInitialState });
    }

    updateDesafio = async () => {
        await Api.put("desafio/" + this.state.desafio.desCodigo, this.state.desafio).then(response => {
            var desafiosAuxiliar = this.state.desafiosData;
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
            this.setState({ desafiosData: desafiosAuxiliar });
            this.abrirFecharEditarDesafios();
        }).catch(error => {
            console.log(error);
        });
    }

    deleteDesafio = async () => {
        await Api.delete("desafio/" + this.state.desafio.desCodigo).then(response => {
            this.setState({ updateDesafios: true });
            this.abrirFecharExcluirDesafios(true);
        }).catch(error => {
            console.log(error);
        });
        this.setState({ desafio: this.state.desafioInitialState });
    }

    getDesafioNome = async (nome) => {
        this.setState({ carregando: true });
        await Api.get("desafio/" + nome).then(response => {
            this.setState({ desafiosData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    componentDidMount() {
        this.getDesafios();
        this.getTreinadores();
        this.getModalidades();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.updateDesafios !== this.state.updateDesafios) {
            this.getDesafios();
            this.setState({ updateDesafios: false });
        }

        if (prevState.abrirCadastroDesafios !== this.state.abrirCadastroDesafios) {
            this.getTreinadores();
        }

        if (prevState.abrirEditarDesafios !== this.state.abrirEditarDesafios) {
            this.getTreinadorId(this.state.desafio.treCodigo);
        }

        if (prevState.abrirCadastroDesafios !== this.state.abrirCadastroDesafios) {
            this.getModalidades();
        }

        if (prevState.abrirCadastroDesafios !== this.state.abrirCadastroDesafios) {
            this.setState({ updateDesafios: true });
        }

        if (prevState.desafio !== this.state.desafio) {
            this.setState({ desafio: this.state.desafio });
        }

        if (prevState.desafiosData !== this.state.desafiosData) {
            this.setState({ desafiosData: this.state.desafiosData });
        }

        if (prevState.treinadoresData !== this.state.treinadoresData) {
            this.setState({ treinadoresData: this.state.treinadoresData });
        }

        if (prevState.modalidadeData !== this.state.modalidadeData) {
            this.setState({ modalidadeData: this.state.modalidadeData });
        }

        if (prevState.carregando !== this.state.carregando) {
            this.setState({ carregando: this.state.carregando });
        }
    }

    render() {
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
                    dadosApi={this.state.desafiosData}
                    getDados={this.getDesafios}
                    getByNome={this.getDesafioNome}
                    funcAbrirCadastro={this.abrirFecharCadastroDesafios}
                    colunas={[
                        { nome: "Avatar" },
                        { nome: "Nome" },
                        { nome: "Data Inicio" },
                        { nome: "Data Fim" },
                        { nome: "Participantes" },
                        { nome: "Alunos" },
                    ]}
                >
                    {this.state.carregando ? <div className="spinner-border loader" role="status"></div>
                        :
                        <tbody>
                            {this.state.desafiosData.map((desafio) => (
                                <tr key={desafio.desCodigo}>
                                    <td className="pt-3"><img src={desafioUrl + desafio.desImagem} alt="" /></td>
                                    <td className="pt-3">{desafio.desNome}</td>
                                    <td className="pt-3">{ConverteData(desafio.desDataInicio)}</td>
                                    <td className="pt-3">{ConverteData(desafio.desDataFim)}</td>
                                    <td className="pt-3 pl-5">{desafio.total}</td>
                                    <td className="pl-4 pt-3 listar" onClick={() => this.selecionarDesafio(desafio, "Participantes")}><BsJustify /></td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => this.selecionarDesafio(desafio, "Editar")}>
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => this.selecionarDesafio(desafio, "Excluir")}>
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
                    codigoDesafio={this.state.desafio.desCodigo}
                    alunoUrl={alunoUrl}
                />

                <FormInserir
                    nome={"Desafio"}
                    abrir={this.state.abrirCadastroDesafios}
                    funcAbrir={this.abrirFecharCadastroDesafios}
                    funcPost={this.postDesafio}
                >
                    <form className="row g-3 form-group">
                        <ComponenteText 
                            tamanho="col-md-6"
                            label="Nome:"
                            name="desNome"
                            type="text"
                            placeholder="Nome do desafio"
                            value={this.state.desafio.desNome}
                            onChange={(e) => this.atualizaCampo(e)} 
                        />
                        <ComponenteData
                            tamanho="col-md-3"
                            label="Data Início:"
                            name="desDataInicio"
                            value={this.state.desafio.desDataInicio}
                            selected={new Date(this.state.desafio.desDataInicio)}
                            selecionaData={this.atualizaCampoData}
                        />
                        <ComponenteData
                            tamanho="col-md-3"
                            label="Data Fim:"
                            name="desDataFim"
                            value={this.state.desafio.desDataFim}
                            selected={new Date(this.state.desafio.desDataFim)}
                            selecionaData={this.atualizaCampoData}
                        />
                        <ComponenteText 
                            tamanho="col-md-4 mt-2"
                            label="Tipo do Desafio:"
                            name="desTipoDesafio"
                            type="text"
                            placeholder="Tipo do Desafio"
                            value={this.state.desafio.desTipoDesafio}
                            onChange={(e) => this.atualizaCampo(e)} 
                        />
                        <ComponenteText 
                            tamanho="col-md-4 mt-2"
                            label="Tipo do Medida:"
                            name="desTipoMedida"
                            type="text"
                            placeholder="Nome Desafio"
                            value={this.state.desafio.desTipoMedida}
                            onChange={(e) => this.atualizaCampo(e)} 
                        />
                        <ComponenteText 
                            tamanho="col-md-4 mt-2"
                            label="Medida:"
                            name="desMedidaDesafio"
                            type="text"
                            placeholder="Nome Desafio"
                            value={this.state.desafio.desNome}
                            onChange={(e) => this.atualizaCampo(e)} 
                        />
                         <ComponenteText 
                            tamanho="col-md-6 mt-2"
                            label="Observação:"
                            name="desObs"
                            type="text"
                            placeholder="Obs."
                            value={this.state.desafio.desObs}
                            onChange={(e) => this.atualizaCampo(e)} 
                        />
                        <ComponenteData
                            tamanho="col-md-3 mt-2"
                            label="Disponível a Partir:"
                            name="desDataInicioExibicao"
                            value={this.state.desafio.desDataInicioExibicao}
                            selected={new Date(this.state.desafio.desDataInicioExibicao)}
                            selecionaData={this.atualizaCampoData}
                        />
                        <ComponenteAtivo 
                            tamanho="col-2 mt-5"
                            label="Exclusivo Aluno:"
                            name="desExclusivoAluno"
                            value={true}
                            checked={this.state.desafio.desExclusivoAluno}
                            onChange={(e) => this.atualizaCampoAtivo(e)}
                        />
                        <div className="selecionarModalidade ml-2">
                            <label className="form-label mb-0 ml-2 mt-3">Modalidade:</label>
                            {
                                this.state.modalidadeData.map((modalidade) => {
                                    return (
                                        <CheckBox
                                            codigo={modalidade.modCodigo}
                                            nome={modalidade.modNome}
                                            codigoSelecionado={this.state.desafio.desCodigo}
                                            url={`desafio/modalidades/${this.state.desafio.desCodigo}`}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="col-md-5"></div>
                        <ComponenteImagem 
                            tamanho="col-md-4 mt-5"
                            label="Imagem:"
                            name="desImagem"
                            type="file"
                        />
                    </form>
                </FormInserir>

                <FormEditar
                    nome={"Desafio"}
                    abrir={this.state.abrirEditarDesafios}
                    funcAbrir={this.abrirFecharEditarDesafios}
                    funcPut={this.updateDesafio}
                >
                    <form className="row g-3 form-group">
                        {/* <div className="col-md-12">
                            <label className="mb-0">Id: </label>
                            <input type="number" className="form-control mb-2" readOnly disabled
                                value={this.state.desafio.desCodigo}
                            />
                        </div> */}
                        <ComponenteText 
                            tamanho="col-md-6"
                            label="Nome:"
                            name="desNome"
                            type="text"
                            placeholder="Nome Desafio"
                            value={this.state.desafio.desNome}
                            onChange={(e) => this.atualizaCampo(e)} 
                        />
                        <ComponenteData
                            tamanho="col-md-3"
                            label="Data Início:"
                            name="desDataInicio"
                            value={this.state.desafio.desDataInicio}
                            selected={new Date(this.state.desafio.desDataInicio)}
                            selecionaData={this.atualizaCampoData}
                        />
                        <ComponenteData
                            tamanho="col-md-3"
                            label="Data Fim:"
                            name="desDataFim"
                            value={this.state.desafio.desDataFim}
                            selected={new Date(this.state.desafio.desDataFim)}
                            selecionaData={this.atualizaCampoData}
                        />
                        <ComponenteText 
                            tamanho="col-md-4 mt-2"
                            label="Tipo do Desafio:"
                            name="desTipoDesafio"
                            type="text"
                            placeholder="Nome Desafio"
                            value={this.state.desafio.desTipoDesafio}
                            onChange={(e) => this.atualizaCampo(e)} 
                        />
                        <ComponenteText 
                            tamanho="col-md-4 mt-2"
                            label="Tipo da Medida:"
                            name="desTipoMedida"
                            type="text"
                            placeholder="Nome Desafio"
                            value={this.state.desafio.desTipoMedida}
                            onChange={(e) => this.atualizaCampo(e)} 
                        />
                        <ComponenteText 
                            tamanho="col-md-4 mt-2"
                            label="Medida:"
                            name="desMedidaDesafio"
                            type="text"
                            placeholder="Nome Desafio"
                            value={this.state.desafio.desMedidaDesafio}
                            onChange={(e) => this.atualizaCampo(e)} 
                        />
                        <ComponenteText 
                            tamanho="col-md-6 mt-2"
                            label="Observação:"
                            name="desObs"
                            type="text"
                            placeholder="Obs."
                            value={this.state.desafio.desObs}
                            onChange={(e) => this.atualizaCampo(e)} 
                        />
                        <ComponenteData
                            tamanho="col-md-3 mt-2"
                            label="Disponível a Partir:"
                            name="desDataInicioExibicao"
                            value={this.state.desafio.desDataInicioExibicao}
                            selected={new Date(this.state.desafio.desDataInicioExibicao)}
                            selecionaData={this.atualizaCampoData}
                        />
                        <ComponenteAtivo 
                            tamanho="col-2 mt-5"
                            label="Exclusivo Aluno:"
                            name="desExclusivoAluno"
                            value={true}
                            checked={this.state.desafio.desExclusivoAluno}
                            onChange={(e) => this.atualizaCampoAtivo(e)}
                        />
                        <div className="selecionarModalidade ml-2">
                            <label className="form-label mb-0 ml-2 mt-3">Modalidade:</label>
                            {
                                this.state.modalidadeData.map((modalidade) => {
                                    return (
                                        <CheckBox
                                            codigo={modalidade.modCodigo}
                                            nome={modalidade.modNome}
                                            codigoSelecionado={this.state.desafio.desCodigo}
                                            url={`desafio/modalidades/${this.state.desafio.desCodigo}`}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="col-md-5"></div>
                        <ComponenteImagem 
                            tamanho="col-md-4 mt-5 logoDesafio"
                            label="Imagem:"
                            name="desImagem"
                            type="file"
                        />
                    </form>
                </FormEditar>

                <FormExcluir
                    nome={"Desafio"}
                    dados={this.state.desafio.desNome}
                    abrir={this.state.abrirExcluirDesafios}
                    funcAbrir={this.abrirFecharExcluirDesafios}
                    funcDelete={this.deleteDesafio}
                />
            </React.Fragment>
        )
    }
}

export default Desafio;