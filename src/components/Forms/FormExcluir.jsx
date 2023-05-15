import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class FormExcluir extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrir: false
        }
    }

    componentDidMount() {
        this.setState({ abrir: this.props.abrir });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.abrir !== this.props.abrir) {
            this.setState({ abrir: this.props.abrir });
        }
    }

    abrirModal = () => {
        this.setState({ abrir: !this.state.abrir });
        this.props.funcAbrir(this.state.abrir);
    }

    deletarAluno = () => {
        this.props.funcDelete();
        // this.props.funcAbrir(this.state.abrir);
    }

    render() {
        return (
            <Modal isOpen={this.state.abrir}>
                <ModalHeader>Excluir {this.props.nome}</ModalHeader>
                <ModalBody>
                    Deseja excluir o Aluno : {this.props.dados}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => this.deletarAluno()}>Sim</button>
                    <button className="btn btn-secondary" onClick={() => this.abrirModal()}>Não</button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default FormExcluir;