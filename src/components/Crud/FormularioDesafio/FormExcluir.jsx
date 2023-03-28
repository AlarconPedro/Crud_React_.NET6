import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function FormExcluir(props) {

    const [abrir , setAbrir] = useState(false);

    useEffect(() => {
        setAbrir(props.abrir);
    }, [props.abrir]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    const deletarAluno = () => {
        props.funcDelete(props.aluDados);
        abrirModal();
    }

    return (
        <Modal isOpen={abrir}>
            <ModalHeader>Excluir Desafio</ModalHeader>
            <ModalBody>
                Deseja excluir o Desafio : {props.desNome}?
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-danger" onClick={() => deletarAluno()}>Sim</button>
                <button className="btn btn-secondary" onClick={() => abrirModal()}>Não</button>
            </ModalFooter>
        </Modal>
    )
}