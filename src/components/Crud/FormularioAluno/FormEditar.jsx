import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import { alunoUrl } from "../../../services/Imagens";

export default function FormEditar(props) {

    const [abrir, setAbrir] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());

    const [treinadoresData, setTreinadoresData] = useState([]);

    const sexo = [
        { id: "M", nome: 'Masculino' },
        { id: "F", nome: 'Feminino' },
    ];

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
        <Modal isOpen={abrir} className="formCadastro">
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
                    <div className="col-md-3">
                        <label className="form-label mb-0">Data Nascimento:</label>
                        <DatePicker
                            className="form-control"
                            name="aluDataNasc"
                            selected={new Date(dataAtual)}
                            onChange={date => props.funcData(date)}
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
                        <label className="form-label mb-0">Sexo:</label>
                        <select className="form-select w-100 h-50"
                            name="aluSexo"
                            value={props.aluDados.aluSexo}
                            onChange={e => props.funcAtualizaCampo(e)}>
                            <option value=""></option>
                            {
                                sexo.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.nome}</option>
                                    )
                                })
                            }
                        </select>
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
                    <div className="col-6">
                        <label className="form-label mb-0 mt-2">Telefone:</label>
                        <input type="tel" class="form-control" maxLength={15}
                            name="aluFone"
                            onKeyUp={e => props.funcMascara(e)}
                            onChange={e => props.funcAtualizaCampo(e)}
                            value={props.aluDados.aluFone}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0 mt-2">Email:</label>
                        <input type="email" className="form-control" name="aluEmail"
                            onChange={e => props.funcAtualizaCampo(e)} value={props.aluDados.aluEmail} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Senha:</label>
                        <input type="password" className="form-control" name="aluSenha"
                            onChange={e => props.funcAtualizaCampo(e)} value={props.aluDados.aluSenha} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Confirmar Senha:</label>
                        <input type="password" className="form-control" name="aluNome"
                            onChange={e => props.funcAtualizaCampo(e)} value={props.aluDados.aluSenha} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Observação:</label>
                        <input type="text" className="form-control" name="aluObs"
                            onChange={e => props.funcAtualizaCampo(e)} value={props.aluDados.aluObs} />
                    </div>
                    <div className="col-2 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                                name="aluAtivo"
                                checked={props.aluDados.aluAtivo}
                                onChange={e => props.funcAtualizaCampoAtivo(e)}
                                value={true}
                            />
                            <label className="form-check-label">Ativo</label>
                        </div>
                    </div>
                    <div className="col-md-4 mt-5">
                        <label className="form-label mb-0">Imagem:</label>
                        {/* <input type="image" alt="imagem" className="container border-dark" /> */}
                        <img src={alunoUrl + props.aluDados.aluImagem} alt="" />
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