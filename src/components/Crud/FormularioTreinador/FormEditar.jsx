import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { treinadorUrl } from "../../../services/Imagens";

export default function FormEditar(props) {

    const [abrir, setAbrir] = useState(false);

    useEffect(() => {
        setAbrir(props.abrir);
    }, [props.abrir]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    const editarTreinador = () => {
        props.funcPut(props.treDados.treCodigo);
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
                            value={props.treDados.treCodigo}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="treNome"
                            onChange={e => props.funcAtualizaCampo(e)}
                            value={props.treDados.treNome}
                        />
                    </div>
                    <div className="col-6">
                        <label className="form-label mb-0">Telefone:</label>
                        <input type="tel" class="form-control" maxLength={15}
                            name="treFone"
                            onKeyUp={e => props.funcMascara(e)}
                            onChange={e => props.funcAtualizaCampo(e)}
                            value={props.treDados.treFone}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0 mt-2">Email:</label>
                        <input type="email" className="form-control" name="treEmail"
                            onChange={e => props.funcAtualizaCampo(e)} value={props.treDados.treEmail} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Senha:</label>
                        <input type="password" className="form-control" name="treSenha"
                            onChange={e => props.funcAtualizaCampo(e)} value={props.treDados.treSenha} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Confirmar Senha:</label>
                        <input type="password" className="form-control" name="treSenha"
                            onChange={e => props.funcAtualizaCampo(e)} value={props.treDados.treSenha} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Observação:</label>
                        <input type="text" className="form-control" name="treBio"
                            onChange={e => props.funcAtualizaCampo(e)} value={props.treDados.treBio} />
                    </div>
                    <div className="col-2 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                                name="treAtivo"
                                onChange={e => props.funcAtualizaCampoAtivo(e)}
                                checked={props.treDados.treAtivo}
                                value={true}
                            />
                            <label className="form-check-label">Ativo</label>
                        </div>
                    </div>
                    <div className="col-md-4 mt-5">
                        <label className="form-label mb-0">Imagem:</label>
                        <img src={treinadorUrl + props.treDados.treImagem} alt="" />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-success" onClick={() => editarTreinador()}>Salvar</button>{" "}
                <button className="btn btn-danger" onClick={() => abrirModal()}>Cancelar</button>
            </ModalFooter>
        </Modal>
    )
}