import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import CheckBox from "../../../layout/Objetos/CheckBox";

import Api from "../../../services/Api";

class InserirDesafio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            abrir: false,
            carregando: false,
            dataInicio: new Date(),
            dataFim: new Date(),
            dataExibicao: new Date(),
            treinadoresData: [],
            modalidadesData: [],
            desafiosData: [],
            desafio: {
                desCodigo: 0,
                desNome: '',
                desDescricao: '',
                total: 0,
                desDataInicio: new Date('01/01/1990'),
                desDataFim: new Date('01/01/2050'),
                desTipoDesafio: '',
                desMedidaDesafio: '',
                treCodigo: '',
                desImagem: '',
                desId: '',
                desExclusivoAluno: false,
                desDataInicioExibicao: new Date('01/01/1990'),
                tbAlunoDesafios: [],
                tbDesafioModalidades: [],
                treCodigoNavigation: null,
            },
        }
    }

    // componentDidMount() {
    //     this.buscaDesafio();
    // }

    componentDidUpdate(prevProps) {
        if (this.props.abrir !== prevProps.abrir) {
            this.setState({ abrir: this.props.abrir });
        }
        // if (this.props.dataInicio !== prevProps.dataInicio) {
        //     this.setState({ dataInicio: this.props.dataInicio });
        // }
        if (this.props.dataFim !== prevProps.dataFim) {
            this.setState({ dataFim: this.props.dataFim });
        }
        // if (this.props.desafio !== prevProps.desafio) {
        //     this.setState({ desafio: this.props.desafio });
        //     this.buscaDesafio();
        // }
        if (this.props.modalidades !== prevProps.modalidades) {
            this.setState({ modalidadesData: this.props.modalidades });
        }
    }

    abrirModal = () => {
        this.setState({ abrir: !this.state.abrir });
        this.props.funcAbrir(this.state.abrir);
    }

    editarAluno = () => {
        this.props.funcPut(this.props.aluDados.aluCodigo);
        this.abrirModal();
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

    dataFim = (date) => {
        this.setState({ desafio: { ...this.state.desafio, desDataFim: date } });
        var data = new Date(date),
            month = '' + (data.getMonth() + 1),
            day = '' + (data.getDate() + 1),
            year = data.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        this.setState({
            desafio: {
                ...this.state.desafio,
                desDataFim: [year, month, day].join('/')
            }
        });
    }

    dataInicio = (date) => {
        this.setState({ desafio: { ...this.state.desafio, desDataInicio: date } });
        var data = new Date(date),
            month = '' + (data.getMonth() + 1),
            day = '' + (data.getDate() + 1),
            year = data.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        this.setState({
            desafio: {
                ...this.state.desafio,
                desDataInicio: [year, month, day].join('/')
            }
        });
    }

    dataExibicao = (date) => {
        this.setState({ desafio: { ...this.state.desafio, desDataInicioExibicao: date } });  
        var data = new Date(date),
            month = '' + (data.getMonth() + 1),
            day = '' + (data.getDate() + 1),
            year = data.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        this.setState({
            desafio: {
                ...this.state.desafio,
                desDataInicioExibicao: [year, month, day].join('/')
            }
        });
    }

    atualizaCampoAtivo = e => {
        const { name, value } = e.target;
        this.setState({
            desafio: {
                ...this.state.desafio,
                [name]: value === "true" ? true : false
            }
        });
    }

    inserirDesafio = async () => {
        this.setState({ carregando: true });
        this.setState({ desafio: { ...this.state.desafio, desDataInicio: new Date(this.state.desafio.desDataInicio)} });
        this.setState({ desafio: { ...this.state.desafio, desDataFim: new Date(this.state.desafio.desDataFim)} });
        this.setState({ desafio: { ...this.state.desafio, desDataInicioExibicao: new Date(this.state.desafio.desDataInicioExibicao)} });
        await Api.post("desafio/", this.state.desafio).then(response => {
            if (response.status === 200) {
                this.setState({ carregando: false });
                // this.setState({ desafio: response.data });
                this.abrirModal();
            // setAluno(response.data);
            // setUpdateAlunos(true);
            // abrirFecharCadastroAlunos();
            }
        });
        // setAluno(alunoInitialState);
    // inserirDesafio = async (e) => {
        // e.preventDefault();
        // this.setState({ carregando: true });
        // try {
        //     const response = await Api.fetchPost(this.state.desafio, "api/Desafio");
        //     if (response.status === 200) {
        //         this.setState({ carregando: false });
        //         this.abrirModal();
        //         this.props.funcGet();
        //         this.props.funcAlerta("success", "Sucesso", "Desafio inserido com sucesso!");
        //     } else {
        //         this.setState({ carregando: false });
        //         this.props.funcAlerta("danger", "Erro", "Erro ao inserir desafio!");
        //     }
        // } catch (error) {
        //     this.setState({ carregando: false });
        //     this.props.funcAlerta("danger", "Erro", "Erro ao inserir desafio!");
        // }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.abrir} size="lg" className="modal-editar">
                    <ModalHeader>Inserir Desafio</ModalHeader>
                    <ModalBody>
                        <form className="row g-3 form-group">
                            {/* <div className="col-md-12">
                                <label className="mb-0">Id: </label>
                                <input type="number" className="form-control mb-2" readOnly disabled
                                    value={this.state.desafio.desCodigo}
                                />
                            </div> */}
                            <div className="col-md-6">
                                <label className="form-label mb-0">Nome:</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Nome Desafio"
                                    name="desNome"
                                    onChange={(e) => this.atualizaCampo(e)}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mb-0">Data Início:</label>
                                <DatePicker
                                    className="form-control"
                                    name="desDataInicio"
                                    selected={new Date(this.state.dataInicio)}
                                    onChange={date => this.dataInicio(date)}
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
                                    selected={new Date(this.state.dataFim)}
                                    onChange={date => this.dataFim(date)}
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
                                    onChange={e => this.atualizaCampo(e)}
                                />
                            </div>
                            <div className="col-md-4 mt-2">
                                <label className="form-label mb-0">Tipo da Medida:</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Nome Desafio"
                                    name="desTipoMedida"
                                    onChange={e => this.atualizaCampo(e)}
                                />
                            </div>
                            <div className="col-md-4 mt-2">
                                <label className="form-label mb-0">Medida:</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Nome Desafio"
                                    name="desMedidaDesafio"
                                    onChange={e => this.atualizaCampo(e)}
                                />
                            </div>
                            <div className="col-md-6 mt-2">
                                <label className="form-label mb-0">Observação:</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Obs."
                                    name="desObs"
                                    onChange={e => this.atualizaCampo(e)}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mb-0 mt-2">Disponível a Partir:</label>
                                <DatePicker
                                    className="form-control"
                                    name="desDataInicioExibicao"
                                    selected={new Date(this.state.dataExibicao)}
                                    onChange={date => this.dataExibicao(date)}
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
                                        onChange={e => this.atualizaCampoAtivo(e)}
                                        checked={this.state.desafio.desExclusivoAluno}
                                        value={true} />
                                    <label className="form-check-label">Exclusivo Aluno</label>
                                </div>
                            </div>
                            <div className="selecionarModalidade ml-2">
                                <label className="form-label mb-0 ml-2 mt-3">Modalidade:</label>
                                {
                                    this.state.modalidadesData.map((modalidade) => {
                                        return (
                                            <CheckBox
                                                codigo={modalidade.modCodigo}
                                                nome={modalidade.modNome}
                                                codigoSelecionado={this.props.desCodigo}
                                                url={`desafio/modalidades/${this.props.desCodigo}`}
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
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" onClick={() => this.inserirDesafio()}>Salvar</button>{" "}
                        <button className="btn btn-danger" onClick={() => this.abrirModal()}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default InserirDesafio;