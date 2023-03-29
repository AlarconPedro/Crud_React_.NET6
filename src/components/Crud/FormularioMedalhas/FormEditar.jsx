import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

export default function FormEditar(props) {

    const [abrir, setAbrir] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());

    const [treinadoresData, setTreinadoresData] = useState([]);

    useEffect(() => {
        setTreinadoresData(props.treinaData);
    }, [props.treinaData]);

    useEffect(() => {
        setAbrir(props.abrir);
    }, [props.abrir]);

    useEffect(() => {
        setDataAtual(props.aluDados.aluDataNasc);
    }, [props.aluDados.aluDataNasc]);

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
                    <div className="col-md-12">
                        <label className="mb-0">Id: </label>
                        <input type="number" className="form-control mb-2" readOnly disabled
                            value={props.aluDados.aluCodigo}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluNome"
                            onChange={e => props.funcAtualizaCampo(e)}
                            value={props.aluNome}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0 mt-2">Treinador:</label>
                        <select className="form-select w-100 h-50"
                            name="treCodigo"
                            selected={treinadoresData}
                            onChange={e => props.funcAtualizaCampo(e)}>
                            {
                                treinadoresData.map((item, index) => {
                                    return (
                                        <option key={item.treCodigo} value={item.treCodigo}>{item.treNome}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Observação:</label>
                        <input type="text" className="form-control" name="aluObs"
                            onChange={e => props.funcAtualizaCampo(e)} value={props.aluDados.aluObs} />
                    </div>
                    <div className="col-md-4 mt-5">
                        <label className="form-label mb-0">Imagem:</label>
                        <input type="image" alt="imagem" className="container border-dark" />
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