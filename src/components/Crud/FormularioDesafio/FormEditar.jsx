import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import { desafioUrl } from "../../../services/Imagens";

import Api from "../../../services/Api";

import "./FormCss.css";

export default function FormEditar(props) {

    const [abrir, setAbrir] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const [dataInicio, setDataInicio] = useState(new Date());
    const [dataFim, setDataFim] = useState(new Date());
    const [dataExibicao, setDataExibicao] = useState(new Date());

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [modalidadesData, setModalidadesData] = useState([]);

    const [modalidadeDesafio, setModalidadeDesafio] = useState([
        { modNome: ""}
    ]);

    const [desafiosData, setDesafiosData] = useState([]);

    useEffect(() => {
        buscaDesafio();
        setAbrir(props.abrir);
        buscarModalidadesDesafio(props.desCodigo, props.modalidades.modCodigo);
    }, [props.abrir]);

    useEffect(() => {
        setDataInicio(props.dataInicio);
    }, [props.dataInicio]);

    useEffect(() => {
        setDataFim(props.dataFim);
    }, [props.desDataFim]);

    useEffect(() => {
        setModalidadesData(props.modalidades);
    }, [props.modalidades]);

    useEffect(() => {
        setTreinadoresData(props.treinadoresData);
    }, [props.treinadoresData]);

    useEffect(() => {
        setDesafiosData(props.desafio);
    }, [props.desafio]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    const editarAluno = () => {
        props.funcPut(props.aluDados.aluCodigo);
        abrirModal();
    }

    const buscarModalidadesDesafio = async (desCodigo, modCodigo = 0) => {
        setCarregando(true);
        await Api.get(`desafio/modalidades/${desCodigo}/${modCodigo}`).then(response => {
            setModalidadeDesafio(response.data);
            console.log(response.data);
            // listarModalidades();
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const buscaDesafio = async () => {
        setCarregando(true);
        await Api.get("desafio/" + props.desCodigo).then(response => {
            setDesafiosData(response.data);
            setDataExibicao(response.data.desDataInicioExibicao);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    // async function listarModalidades() {
    //     modalidadesData.forEach(async modalidade => {
    //         await buscarModalidadesDesafio(props.desCodigo, modalidade.modCodigo);
    //         console.log(modalidadeDesafio);
    //     });
        // return (
        //     modalidadesData.map((modalidade) => {
        //         return (
        //             <div className="form-check" key={modalidade.modCodigo}>
        //                 <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
        //                 <label className="form-check-label" for="flexCheckDefault">
        //                     {modalidade.modNome}
        //                 </label>
        //             </div>
        //         )
        //     })
        // )
    // }

    return (
        <Modal isOpen={abrir} className="modal-editar">
            <ModalHeader>Editar Aluno</ModalHeader>
            <ModalBody>
                <form className="row g-3 form-group">
                    <div className="col-md-12">
                        <label className="mb-0">Id: </label>
                        <input type="number" className="form-control mb-2" readOnly disabled
                            value={desafiosData.desCodigo}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desNome"
                            value={desafiosData.desNome}
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>

                    <div className="col-md-3">
                        <label className="form-label mb-0">Data Início:</label>
                        <DatePicker
                            className="form-control"
                            name="desDataInicio"
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
                            name="desDataFim"
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
                    <div className="col-md-4 mt-2">
                        <label className="form-label mb-0">Tipo do Desafio:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desTipoDesafio"
                            value={desafiosData.desTipoDesafio}
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-4 mt-2">
                        <label className="form-label mb-0">Tipo da Medida:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desTipoMedida"
                            value={desafiosData.desTipoMedida}
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-4 mt-2">
                        <label className="form-label mb-0">Medida:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Nome Desafio"
                            name="desMedidaDesafio"
                            value={desafiosData.desMedidaDesafio}
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-6 mt-2">
                        <label className="form-label mb-0">Observação:</label>
                        <input type="text"
                            className="form-control"
                            placeholder="Obs."
                            name="desObs"
                            value={desafiosData.desObs}
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Disponível a Partir:</label>
                        <DatePicker
                            className="form-control"
                            name="desDataInicioExibicao"
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
                    <div className="col-2 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                                name="desExclusivoAluno"
                                onChange={e => props.funcAtualizaCampoAtivo(e)}
                                checked={desafiosData.desExclusivoAluno}
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
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                            checked={modalidade.modNome === modalidadeDesafio.modNome ? true : false}
                                        />
                                        <label className="form-check-label" for="flexCheckDefault">
                                            {modalidade.modNome}
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="col-md-5"></div>
                    <div className="col-md-4 mt-5 logoDesafio">
                        <label className="form-label mb-0">Imagem:</label>
                        <img className="imagem" src={desafioUrl + desafiosData.desImagem} alt="" />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-success" onClick={() => props.funcPut()}>Salvar</button>{" "}
                <button className="btn btn-danger" onClick={() => abrirModal()}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}