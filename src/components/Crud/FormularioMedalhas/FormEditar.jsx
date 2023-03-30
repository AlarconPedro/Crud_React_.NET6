import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function FormEditar(props) {

    const [abrir, setAbrir] = useState(false);

    const [modalidadesData, setModalidadesData] = useState([]);

    const tipoMedida = [
        { treCodigo: 1, treNome: "Distância(KM)" },
        { treCodigo: 2, treNome: "Tempo(Horas)" },
        { treCodigo: 3, treNome: "Frequência(Dias)" },
    ];

    useEffect(() => {
        setAbrir(props.abrir);
    }, [props.abrir]);

    useEffect(() => {
        setModalidadesData(props.modalidades);
    }, [props.modalidades]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    const editarAluno = () => {
        props.funcPut(props.aluDados.aluCodigo);
        abrirModal();
    }

    return (
        <Modal isOpen={abrir} className="modal-editar">
            <ModalHeader>Editar {props.nome}</ModalHeader>
            <ModalBody>
                <form className="row g-3 form-group">
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluNome" onChange={e => props.funcAtualizaCampo(e)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Tipo de Medida:</label>
                        <select className="form-select w-100 h-50 pb-4"
                            name="treCodigo"
                            onChange={e => props.funcAtualizaCampo(e)}>
                            <option value=""></option>
                            {

                            }
                        </select>
                    </div>
                    <div className="selecionarModalidade ml-2">
                        <label className="form-label mb-0 ml-2 mt-3">Modalidade:</label>
                        {
                            modalidadesData.map((modalidade) => {
                                return (
                                    <div className="form-check" key={modalidade.modCodigo}>
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" for="flexCheckDefault">
                                            {modalidade.modNome}
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-success" onClick={() => editarAluno()}>Salvar</button>{" "}
                <button className="btn btn-danger" onClick={() => abrirModal()}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}