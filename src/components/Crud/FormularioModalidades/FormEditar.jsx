import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import { modalidadeUrl } from "../../../services/Imagens";

export default function FormEditar(props) {

    const [abrir, setAbrir] = useState(false);

    const [treinadoresData, setTreinadoresData] = useState([]);

    useEffect(() => {
        setTreinadoresData(props.treinaData);
    }, [props.treinaData]);

    useEffect(() => {
        setAbrir(props.abrir);
    }, [props.abrir]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    const editarAluno = () => {
        props.funcPut(props.modDados.aluCodigo);
        abrirModal();
    }

    return (
        <Modal isOpen={abrir} className="modal-editar">
            <ModalHeader>Editar {props.nome}</ModalHeader>
            <ModalBody>
            <form className="row g-3 form-group">
                    <div className="col-md-5">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="modNome" onChange={e => props.funcAtualizaCampo(e)} 
                            value={props.modDados.modNome}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label mb-0">Tipo Desafio:</label>
                        <select className="form-select w-100 h-50"
                            name="treCodigo"
                            onChange={e => props.funcAtualizaCampo(e)}>
                            <option value=""></option>
                            {
                                treinadoresData.map((item, index) => {
                                    return (
                                        <option key={index} value={item.treCodigo}>{item.treNome}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0">Tipo Medida:</label>
                        <select className="form-select w-100 h-50"
                            name="treCodigo"
                            onChange={e => props.funcAtualizaCampo(e)}>
                            <option value=""></option>
                            {
                                treinadoresData.map((item, index) => {
                                    return (
                                        <option key={index} value={item.treCodigo}>{item.treNome}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="col-md-4 mt-5">
                        <label className="form-label mb-0">Imagem:</label>
                        {/* <input type="image" alt="imagem" className="container border-dark" /> */}
                        <img src={modalidadeUrl + props.modDados.modImagem} alt="" />
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