import React, { useEffect, useState } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import Api from "../../../services/Api";

import { alunoUrl } from "../../../services/Imagens";

export default function FormParticipantes(props) {

    const [abrir, setAbrir] = useState(false);
    const [abrirEditar, setAbrirEditar] = useState(false);
    const [updateEventos, setUpdateEventos] = useState(true);

    const [eventosData, setEventosData] = useState([]);

    useEffect(() => {
        setAbrir(props.abrir);
    }, [props.abrir]);

    useEffect(() => {
        setAbrirEditar(props.abrirEditar);
    }, [props.abrirEditar]);

    useEffect(() => {
        setEventosData(eventosData);
    }, [eventosData]);

    useEffect(() => {
        if (updateEventos) {
            getEventos();
            setUpdateEventos(false);
        }
    }, [updateEventos]);

    useEffect(() => {
        getEventos(props.codigoDesafio);
    }, [props.codigoDesafio]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    const getEventos = async (codigoEvento) => {
        await Api.get("evento/alunos/" + codigoEvento).then(response => {
            setEventosData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Modal isOpen={abrir} className="formAtividades">
            <ModalHeader>Listar Participantes</ModalHeader>
            <ModalBody className="mr-3">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Modalidade</th>
                            <th>Data/Hora</th>
                            <th>Medida</th>
                            <th>Duração</th>
                            <th>Intensidade</th>
                            <th>Imagens</th>
                            <th className="pl-4 acoes">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <div></div>
                        {eventosData.map((evento) => (
                            <tr key={evento.aluCodigo}>
                                <td className=""><img src={alunoUrl + evento.aluImagem} alt="" /></td>
                                <td className="pt-3">{evento.aluNome}</td>
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