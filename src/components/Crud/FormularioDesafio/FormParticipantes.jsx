import React, { useEffect, useState } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import Api from "../../../services/Api";

import { desafioUrl } from "../../../services/Imagens";

export default function FormParticipantes(props) {

    const [abrir, setAbrir] = useState(false);
    const [updateAlunos, setUpdateAlunos] = useState(true);

    const [alunosData, setAlunosData] = useState([]);

    useEffect(() => {
        setAbrir(props.abrir);
    }, [props.abrir]);

    useEffect(() => {
        setAlunosData(props.alunos);
    }, [alunosData]);

    useEffect(() => {
        if (updateAlunos) {
            getAlunos();
            setUpdateAlunos(false);
        }
    }, [updateAlunos]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    // const getAlunos = () => {
    //     Api.get(`aluno`)
    //         .then((response) => {
    //             setAlunosData(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     setUpdateAlunos(true);
    // }

    const getAlunos = async (skip = 0) => {
        await Api.get(`aluno?skip=${skip}`).then(response => {
            setAlunosData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Modal isOpen={abrir} className="modal-incluir">
            <ModalHeader>Listar Participantes</ModalHeader>
            <ModalBody className="mr-3">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Nome</th>
                            <th className="pl-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunosData.map((aluno) => (
                            <tr key={aluno.aluCodigo}>
                                <td className=""><img src={desafioUrl + aluno.aluImagem} alt="" /></td>
                                <td className="pt-3">{aluno.aluNome}</td>
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
                {/* <button className="btn btn-success" onClick={props.funcPost}>Inserir</button> */}
                <button className="btn btn-danger" onClick={() => abrirModal()}>Fechar</button>
            </ModalFooter>
        </Modal>
    )
}