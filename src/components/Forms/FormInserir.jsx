import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

class FormInserir extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrir: false,
            variaveis: [this.props.variaveis],
            // dataAtual: new Date(),
            // treinadoresData: [],
            // sexo: [
            //     { id: "M", nome: 'Masculino' },
            //     { id: "F", nome: 'Feminino' },
            // ]
        }

        this.abrirModal = this.fecharModal.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.abrir !== this.props.abrir) {
            this.setState({ abrir: this.props.abrir });
        }
        if (prevProps.variaveis !== this.props.variaveis) {
            this.setState({ variaveis: this.props.variaveis });
        }
    }

    fecharModal() {
        this.setState({ abrir: !this.state.abrir });
        this.props.funcAbrir(this.state.abrir);
    }

    inserir() {
        this.props.funcPost();
        // this.props.funcAbrir(this.state.abrir);
    }

    render() {
        return (
            <Modal isOpen={this.state.abrir} className="modal-incluir">
                <ModalHeader>Incluir {this.props.nome}</ModalHeader>
                <ModalBody> 
                    {this.props.children}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" type="submit" onClick={() => this.inserir()}>Salvar</button>{" "}
                    <button className="btn btn-danger" onClick={() => this.fecharModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default FormInserir;