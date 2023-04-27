import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import Api from "../../../services/Api";

export default function FormInserir(props) {

    const [abrir, setAbrir] = useState(false);

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [modalidadesData, setModalidadesData] = useState([]);

    useEffect(() => {
        setAbrir(props.abrir);
    }, [props.abrir]);

    useEffect(() => {
        setModalidadesData(props.modalidades);
    }, [props.modalidades]);

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
                            value={props.desafio.desNome}
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
                            name="desDataFim"
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
                    <div className="col-md-4 mt-2">
                        <label className="form-label mb-0">Tipo do Desafio:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desTipoDesafio"
                            value={props.desafio.desNome}
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-4 mt-2">
                        <label className="form-label mb-0">Tipo da Medida:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desTipoMedida"
                            value={props.desafio.desNome}
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-4 mt-2">
                        <label className="form-label mb-0">Medida:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desMedidaDesafio"
                            value={props.desafio.desNome}
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-6 mt-2">
                        <label className="form-label mb-0">Descrição:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Obs."
                            name="desDescricao"
                            value={props.desafio.desObs}
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Disponível a Partir:</label>
                        <DatePicker
                            className="form-control"
                            name="desDataInicioExibicao"
                            selected={new Date(props.desafio.desDataInicioExibicao)}
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
                    <div className="col-2 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                                name="desExclusivoAluno"
                                onChange={e => props.funcAtualizaCampoAtivo(e)}
                                checked={props.desafio.desExclusivoAluno}
                                value={true} />
                            <label className="form-check-label">Exclusivo Aluno</label>
                        </div>
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
                <button className="btn btn-success" type="submit" onClick={() => inserirDesafio()}>Salvar</button>{" "}
                <button className="btn btn-danger" onClick={() => abrirModal()}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}