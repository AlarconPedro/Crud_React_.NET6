import React, { useState, useEffect }  from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

export default function FormInserir(props) {

    const [abrir, setAbrir] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());

    const [treinadoresData, setTreinadoresData] = useState([]);

    useEffect(() => {
        setAbrir(props.abrir);
    }, [props.abrir]);

    useEffect(() => {
        setTreinadoresData(props.treinaData);
    }, [props.treinaData]);

     useEffect(() => {
        setDataAtual(props.aluDados.aluDataNasc);
    }, [props.aluDados.aluDataNasc]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    const inserirAluno = () => {
        props.funcPost();
        abrirModal();
    }

    return (
        <Modal isOpen={abrir} className="modal-incluir">
            <ModalHeader>Incluir {props.nome}</ModalHeader>
            <ModalBody>
                <form className="row g-3 form-group">
                    <div className="col-md-5">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluNome" onChange={e => props.funcAtualizaCampo(e)} />
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
                        <input type="image" alt="imagem" className="container border-dark" />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-success" type="submit" onClick={() => inserirAluno()}>Salvar</button>{" "}
                <button className="btn btn-danger" onClick={() => abrirModal()}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}