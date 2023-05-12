import React, { useEffect, useState } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import Api from "../../services/Api";

import { alunoUrl } from "../../services/Imagens";

class FormParticipantes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrir: false,
            abrirEditar: false,
            updateData: true,
            urlApi: this.props.urlApi,
            colunas: this.props.colunas,
            dataApi: [],
        }
    }

    componentDidMount() {}

    componentDidUpdate() {
        if (this.state.updateData) {
            this.props.getDadosApi();
            this.setState({ updateData: false });
        }
    }

    abrirModal = () => {
        this.setState({ abrir: !this.state.abrir });
        this.props.funcAbrir(this.state.abrir);
    }

    // getDadosApi = async () => {
    //     await Api.get(this.state.urlApi).then(response => {
    //         this.setState({ dataApi: response.data });
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }

    render() {
        return (
            <Modal isOpen={this.state.abrir} className="modal-participantes">
                <ModalHeader>Listar Participantes</ModalHeader>
                <ModalBody className="mr-3">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {this.props.colunas.map((coluna) => (
                                    <th key={coluna}>{coluna.nome}</th>
                                ))}
                                <th className="acoes">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {...this.props.children}
                            {/* {this.state.dataApi.map((evento) => (
                                <tr key={evento.aluCodigo}>
                                    <td className=""><img src={alunoUrl + evento.aluImagem} alt="" /></td>
                                    <td className="pt-3">{evento.aluNome}</td>
                                    <td>
                                        <button className="btn btn-warning">
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger">
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => this.abrirModal()}>Fechar</button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default FormParticipantes;