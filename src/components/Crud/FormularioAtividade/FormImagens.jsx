import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { atividadeUrl } from "../../../services/Imagens";

export default function FormImagens(props) {

    const [abrir, setAbrir] = useState(false);

    const [imagem, setImagem] = useState([]);

    useEffect(() => {
        setAbrir(props.abrir);
    }, [props.abrir]);

    useEffect(() => {
        setImagem(props.imagens);
        console.log(atividadeUrl + props.imagens);
    }, [props.imagens]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    // const deletarAulno = () => {
    //     props.funcDelete(props.aluDados);
    //     abrirModal();
    // }

    return (
        <Modal isOpen={abrir}>
            <ModalHeader>{props.nome}</ModalHeader>
            <ModalBody>
                <form className="row g-3 form-group">
                    <div className="col-md-4 mt-5">
                        <label className="form-label mb-0">Imagem:</label>
                        <img className="imagem" src={atividadeUrl + props.imagens} alt="" />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                {/* <button className="btn btn-danger" onClick={() => deletarAluno()}>Sim</button> */}
                <button className="btn btn-success" onClick={() => abrirModal()}>Voltar</button>
            </ModalFooter>
        </Modal>
    )
}