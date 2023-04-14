import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import Api from "../../../services/Api";

export default function FormEditar(props) {

    const [abrir, setAbrir] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());
    const [dataExibicao, setDataExibicao] = useState(new Date());

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [eventosData, setEventosData] = useState([]);

    const sexo = [
        { id: "M", nome: 'Masculino' },
        { id: "F", nome: 'Feminino' },
    ];

    useEffect(() => {
        setTreinadoresData(props.treinaData);
    }, [props.treinaData]);

    useEffect(() => {
        buscarPaticipantes();
        setAbrir(props.abrir);
    }, [props.abrir]);

    useEffect(() => {
        setDataInicio(props.dataInicio);
    }, [props.dataInicio]);

    useEffect(() => {
        setDataFim(props.eveDados.eveDataFim);
    }, [props.eveDados.eveDataFim]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    const editarAluno = () => {
        props.funcPut(props.eveDados.aluCodigo);
        abrirModal();
    }

    const buscarPaticipantes = async () => {
        setCarregando(true);
        await Api.get("evento/" + props.eveDados.eveCodigo).then(response => {
            setEventosData(response.data);
            setDataExibicao(response.data.eveDataInicioExibicao);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    return (
        <Modal isOpen={abrir} className="modal-editar">
            <ModalHeader>Editar {props.nome}</ModalHeader>
            <ModalBody>
            <form className="row g-3 form-group">
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="eveNome"
                            value={eventosData.eveNome}
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0">Data Início:</label>
                        <DatePicker
                            className="form-control"
                            name="eveDataInicio"
                            selected={new Date(dataInicio)}
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
                            name="eveDataFim"
                            selected={new Date(dataFim)}
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
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Início Exibição:</label>
                        <DatePicker
                            className="form-control"
                            name="eveDataInicioExibicao"
                            selected={new Date(dataExibicao)}
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
                    <div className="col-md-6 mt-2">
                        <label className="form-label mb-0">Descrição:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Obs."
                            name="eveDescricao"
                            value={eventosData.eveDescricao}
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>
                    <div className="col-2 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                                name="eveExclusivoAluno"
                                checked={eventosData.eveExclusivoAluno}
                                onChange={e => props.funcAtualizaCampoAtivo(e)}
                                value={true} />
                            <label className="form-check-label">Exclusivo Aluno</label>
                        </div>
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