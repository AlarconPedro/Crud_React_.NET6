import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { atividadeUrl } from "../../../services/Imagens";

import Api from "../../../services/Api";

export default function FormImagens(props) {

    const [abrir, setAbrir] = useState(false);

    const [imagemData, setImagemData] = useState([]);

    useEffect(() => {
        buscarImagem();
        setAbrir(props.abrir);
    }, [props.abrir]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    const buscarImagem = async () => {
        await Api.get("aluno/atividades/imagens/" + props.codigo).then(response => {
            setImagemData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Modal isOpen={abrir}>
            <ModalHeader>{props.nome}</ModalHeader>
            <ModalBody>
                <form className="row g-3 form-group">
                    <div className="col-md-4 mt-5">
                        <label className="form-label mb-0">Imagem:</label>
                        {imagemData.map((imagem) => {
                            console.log(imagem);
                            return (
                                <img key={imagem.aluAtiImgCodigo} className="imagem" src={atividadeUrl + imagem.aluAtiImgImagem} alt="" />
                            )
                        })
                        }
                        {/* {imagemData.forEach(element => {
                            console.log(element);
                            <img className="imagem" src={atividadeUrl + element} alt="" />
                        })} */}
                        {/* {imagemData.map((imagem) => (
                            <img className="imagem" src={atividadeUrl + imagem} alt="" />
                        ))} */}
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                {/* <button className="btn btn-danger" onClick={() => deletarAluno()}>Sim</button> */}
                <button className="btn btn-success" onClick={() => abrirModal()}>Voltar</button>
            </ModalFooter>
        </Modal>
    )
}