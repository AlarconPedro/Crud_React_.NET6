import React, { useState, useEffect }  from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

export default function FormInserir(props) {

    const [abrir, setAbrir] = useState(false);

    const [treinadoresData, setTreinadoresData] = useState([]);

    useEffect(() => {
        setAbrir(props.abrir);
    }, [props.abrir]);

    useEffect(() => {
        setTreinadoresData(props.treinaData);
    }, [props.treinaData]);

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
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="treNome" onChange={e => props.funcAtualizaCampo(e)} />
                    </div>
                    <div className="col-6">
                        <label className="form-label mb-0">Telefone:</label>
                        <input type="tel" className="form-control" placeholder="(00) 00000-0000" maxLength={15}
                            name="treFone"
                            onKeyUp={e => props.funcMascara(e)}
                            onChange={e => props.funcAtualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0 mt-2">Email:</label>
                        <input type="email" className="form-control" placeholder="exemplo@gmail.com"
                            name="treEmail" onChange={e => props.funcAtualizaCampo(e)} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Senha:</label>
                        <input type="password" className="form-control" placeholder="****"
                            name="treSenha" onChange={e => props.funcAtualizaCampo(e)} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Confirmar Senha:</label>
                        <input type="password" className="form-control" placeholder="****"
                            name="treSenha" onChange={e => props.funcAtualizaCampo(e)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Observação:</label>
                        <input type="text" className="form-control" placeholder="Obs."
                            name="treBio" onChange={e => props.funcAtualizaCampo(e)} />
                    </div>
                    <div className="col-2 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                                name="treAtivo"
                                onChange={e => props.funcAtualizaCampoAtivo(e)}
                                value={true} />
                            <label className="form-check-label">Ativo</label>
                        </div>
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