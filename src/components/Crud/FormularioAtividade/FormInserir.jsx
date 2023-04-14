import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

export default function FormInserir(props) {

    const [abrir, setAbrir] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());

    const [treinadoresData, setTreinadoresData] = useState([]);

    const sexo = [
        { id: "M", nome: 'Masculino' },
        { id: "F", nome: 'Feminino' },
    ];

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
        <Modal isOpen={abrir} className="formCadastro">
            <ModalHeader>Incluir {props.nome}</ModalHeader>
            <ModalBody>
                <form className="row g-3 form-group">
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="aluNome" onChange={e => props.funcAtualizaCampo(e)} />
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
                            name="aluSexo" onChange={e => props.funcAtualizaCampo(e)}>
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
                    <div className="col-6">
                        <label className="form-label mb-0 mt-2">Telefone:</label>
                        <input type="tel" className="form-control" placeholder="(00) 00000-0000" maxLength={15}
                            name="aluFone"
                            onKeyUp={e => props.funcMascara(e)}
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0 mt-2">Email:</label>
                        <input type="email" className="form-control" placeholder="exemplo@gmail.com"
                            name="aluEmail" onChange={e => props.funcAtualizaCampo(e)} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Senha:</label>
                        <input type="password" className="form-control" placeholder="****"
                            name="aluSenha" onChange={e => props.funcAtualizaCampo(e)} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Confirmar Senha:</label>
                        <input type="password" className="form-control" placeholder="****"
                            name="aluSenha" onChange={e => props.funcAtualizaCampo(e)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Observação:</label>
                        <input type="text" className="form-control" placeholder="Obs."
                            name="aluObs" onChange={e => props.funcAtualizaCampo(e)} />
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
                    <div className="col-md-4 mt-5">
                        <label className="form-label mb-0">Imagem:</label>
                        <input type="file" className="form-control"
                            name="treImagem" />
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