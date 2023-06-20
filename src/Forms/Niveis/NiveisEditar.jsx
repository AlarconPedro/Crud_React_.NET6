import React, { useEffect, useState } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { medalhaUrlImagem } from "../../services/Imagens";

export default function FormEditarNivelMedalha(props) {

    const [abrir, setAbrir] = useState(false);

    const [niveis, setNiveis] = useState({});

    useEffect(() => {
        setNiveis(props.nivel);
    }, [props.nivel]);

    useEffect(() => {
        setAbrir(props.abrir);
    }, [props.abrir]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    const updateNivel = () => {
        props.funcPutNivel(niveis.medNivCodigo);
        abrirModal();
    }

    return (
        <Modal isOpen={abrir} className="formInfo">
            <ModalHeader>Editar Nível</ModalHeader>
            <ModalBody>
                <form className="row g-3 form-group">
                    <div className="col-md-12">
                        <label className="form-label mb-0">Mínimo:</label>
                        <input type="text" className="form-control" 
                            placeholder="0"
                            name="medNivMinimo"
                            value={niveis.medNivMinimo} 
                            onChange={e => props.funcAtualizaCampo(e)} />
                    </div>
                    <div className="col-md-12 mt-5 imgEditar">
                        <label className="form-label mb-0">Imagem:</label>
                        {/* <input type="image" alt="imagem" className="container border-dark" /> */}
                        <img src={medalhaUrlImagem + niveis.medNivImagem} alt="" />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-success" type="submit" onClick={() => updateNivel()}>Salvar</button>{" "}
                <button className="btn btn-danger" onClick={() => abrirModal()}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}