import React from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import "../../estilos/FormularioEditar.css"

class FormEditar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrir: false,
            nome: this.props.nome,
            variaveis: { ...this.props.variaveis },
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.abrir !== this.props.abrir) {
            this.setState({ abrir: this.props.abrir });
        }
        if (prevProps.nome !== this.props.nome) {
            this.setState({ nome: this.props.nome });
        }
        if (prevProps.variaveis !== this.props.variaveis) {
            this.setState({ variaveis: this.props.variaveis });
        }
    }

    abrirModal = () => {
        this.setState({ abrir: !this.state.abrir });
        this.props.funcAbrir(this.state.abrir);
    }

    editarAluno = async () => {
        await this.props.funcPut();
        this.abrirModal();
    }

    render() {
        return (
            <Modal isOpen={this.state.abrir} className="modal-editar">
                <ModalHeader>Editar {this.state.nome}</ModalHeader>
                <ModalBody>
                    {this.props.children}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" onClick={() => this.editarAluno()}>Salvar</button>{" "}
                    <button className="btn btn-danger" onClick={() => this.abrirModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default FormEditar;