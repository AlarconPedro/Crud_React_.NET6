import React, { useEffect, useState } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import Api from "../../../services/Api";

import { medalhaUrl } from "../../../services/Imagens";

export default function FormNivelMedalha(props) {

    const [abrir, setAbrir] = useState(false);
    const [updateNiveis, setUpdateNiveis] = useState(false);

    const [niveisData, setNiveisData] = useState([]);

    useEffect(() => {
        setAbrir(props.abrir);
        setUpdateNiveis(!updateNiveis);
    }, [props.abrir]);

    // useEffect(() => {
    //     setNiveisData(niveisData);
    // }, [niveisData]);

    useEffect(() => {
        setNiveisData(props.medalha);
    }, [props.medalha]);

    useEffect(() => {
        if (updateNiveis) {
            getNiveis(props.medalha.MedCodigo);
            console.log(props.medalha.MedCodigo);
            setUpdateNiveis(false);
        }
    }, [updateNiveis]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    const getNiveis = async (id) => {
        await Api.get(`nivel/${id}`).then(response => {
            setNiveisData(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Modal isOpen={abrir} className="modal-participantes">
            <ModalHeader>{props.nome}</ModalHeader>
            <ModalBody className="mr-3">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Nível</th>
                            <th className="pl-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {niveisData.map((niveis) => (
                            <tr key={niveis.MedCodigo}>
                                <td className=""><img src={medalhaUrl + niveis.MedNivImagem} alt="" /></td>
                                <td className="pt-3">{niveis.MedNivMinimo}</td>
                                <td>
                                    <button className="btn btn-warning">
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-danger" onClick={() => abrirModal()}>Fechar</button>
            </ModalFooter>
        </Modal>
    )
}