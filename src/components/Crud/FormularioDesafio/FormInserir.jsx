import React, { useState, useEffect } from "react";

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
        setTreinadoresData(props.treinadoresData);
    }, [props.treinadoresData]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    const inserirDesafio = () => {
        props.funcPost();
        abrirModal();
    }

    return (
        <Modal isOpen={abrir} className="modal-incluir">
            <ModalHeader>Incluir Desafio</ModalHeader>
            <ModalBody>
                <form className="row g-3 form-group">
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desNome"
                        onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label mb-0">Data Início:</label>
                        <DatePicker
                            className="form-control"
                            name="desDataInicio"
                            selected={new Date(props.desafio.desDataInicio)}
                            onChange={date => props.funcDataInicio(date)}
                            dateFormat={"dd/MM/yyyy"}
                            timeFormat="yyyy-MM-dd"
                            customInput={
                                <InputMask
                                    type="text"
                                    mask="99/99/9999"
                                />
                            }
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0">Data Fim:</label>
                        <DatePicker
                            className="form-control"
                            name="aluDataNasc"
                            selected={new Date(props.desafio.desDataFim)}
                            onChange={date => props.funcDataFim(date)}
                            dateFormat={"dd/MM/yyyy"}
                            timeFormat="yyyy-MM-dd"
                            customInput={
                                <InputMask
                                    type="text"
                                    mask="99/99/9999"
                                />
                            }
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0 mt-2">Treinador:</label>
                        <select className="form-select w-100 h-50"
                            name="treCodigo"
                            onChange={e => props.funcAtualizaCampo(e)}
                            >
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
                    <div className="col-2 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                                name="aluAtivo"
                                onChange={e => props.funcAtualizaCampoAtivo(e)}
                                value={true} />
                            <label className="form-check-label">Ativo</label>
                        </div>
                    </div>
                    <div className="col-md-6 mt-2">
                        <label className="form-label mb-0">Observação:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Obs."
                            name="aluObs"
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-success" type="submit" onClick={() => inserirDesafio()}>Salvar</button>{" "}
                <button className="btn btn-danger" onClick={() => abrirModal()}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}