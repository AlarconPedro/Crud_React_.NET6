import React, { useEffect, useState } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { medalhaUrlImagem } from "../../services/Imagens";

import FormEditarNivel from "./NiveisEditar";

import Api from "../../services/Api";

export default function FormNivelMedalha(props) {

    const [abrir, setAbrir] = useState(false);
    const [updateNiveis, setUpdateNiveis] = useState(false);

    const [abrirEditarNiveis, setAbrirEditarNiveis] = useState(false);
    const [abrirExcluirNiveis, setAbrirExcluirNiveis] = useState(false);

    const [niveisData, setNiveisData] = useState([]);

    const [nivel, setNivel] = useState({
        medNivCodigo: 0,
        medCodigo: 0,
        medNivMinimo: 0,
        medNivImagem: '',
        medNivId: '',
        medCodigoNavigation: null,
    });

    const abrirFecharEditarNiveis = (abrirEditarNiveis) => {
        setAbrirEditarNiveis(!abrirEditarNiveis);
    }

    const abrirFecharExcluirNiveis = (abrirExcluirNiveis) => {
        setAbrirExcluirNiveis(!abrirExcluirNiveis);
    }

    useEffect(() => {
        setAbrir(props.abrir);
        setUpdateNiveis(!updateNiveis);
    }, [props.abrir]);

    useEffect(() => {
        setNiveisData(props.nivel);
    }, [props.nivel]);

    const abrirModal = () => {
        setAbrir(!abrir);
        props.funcAbrir(abrir);
    }

    const selecionarNivel = (nivel, opcao) => {
        setNivel(nivel);
        (opcao === "Editar") ? abrirFecharEditarNiveis() : abrirFecharExcluirNiveis();
    }

    const putNivel = async (codigo = nivel.medNivCodigo) => {
        await Api.put("nivel/" + codigo, nivel).then((response) => {
            var niveisAuxiliar = niveisData;
            niveisAuxiliar.map((nivelMap) => {
                if (nivelMap.medNivCodigo === codigo) {
                    nivelMap.medNivMinimo = nivel.medNivMinimo;
                    nivelMap.medNivImagem = nivel.medNivImagem;
                }
                return nivelMap;
            });
            setNiveisData(niveisAuxiliar);
            setUpdateNiveis(true);
        }).catch((error) => {
            console.log(error);
        });
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        setNivel({
            ...nivel,
            [name]: value
        });
    }

    return (
        <Modal isOpen={abrir} className="formInfo">
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
                    {niveisData.length === 0 || niveisData === undefined
                        ? <div className="text-center">Nenhum nível cadastrado</div>
                        : <tbody>
                            {niveisData.map((nivel) => (
                                <tr key={nivel.MedCodigo}>
                                    <td className=""><img src={medalhaUrlImagem + nivel.medNivImagem} alt="" /></td>
                                    <td className="pt-3">{nivel.medNivMinimo}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => selecionarNivel(nivel, "Editar")}>
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => selecionarNivel(nivel, "Excluir")}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-danger" onClick={() => abrirModal()}>Fechar</button>
            </ModalFooter>

            <FormEditarNivel
                abrir={abrirEditarNiveis}
                funcAbrir={abrirFecharEditarNiveis}
                funcAtualizaCampo={atualizaCampo}
                funcPutNivel={putNivel}
                nivel={nivel}
            />
        </Modal>
    )
}