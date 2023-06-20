import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import "react-datepicker/dist/react-datepicker.css";

import { BsJustify } from "react-icons/bs";

import Api from "../../services/Api";

import FormNivelMedalha from "../../Forms/Niveis/FormNivelMedalha";

import FormInserir from "../../Forms/FormInserir";
import FormEditar from "../../Forms/FormEditar";
import FormExcluir from "../../Forms/FormExcluir";

import Modelo from "../../Forms/Modelo";
import CheckBox from "../../Layout/Componentes/CheckBox";

import "./MedalhasCrud.css";

export default function MedalhasCrud() {

    const [carregando, setCarregando] = useState(false);

    const [medalhasData, setMedalhasData] = useState([]);
    const [niveisData, setNiveisData] = useState([]);

    const [modalidadeData, setModalidadeData] = useState([]);

    const [medalhaInitialState] = useState({
        medCodigo: 0,
        medNome: '',
        medTipoDesafio: '',
        tbMedalhaModalidades: [],
        tbMedalhaNivels: [],
    });

    const [medalha, setMedalha] = useState({
        medCodigo: 0,
        medNome: '',
        medTipoDesafio: '',
        tbMedalhaModalidades: [],
        tbMedalhaNivels: [],
    });

    const tipoMedidas = [
        { id: "1", nome: "Distância(KM)" },
        { id: "2", nome: "Tempo(Horas)" },
        { id: "3", nome: "Frequência(Dias)" },
    ];

    const [abrirCadastroMedalhas, setAbrirCadastroMedalhas] = useState(false);
    const [abrirEditarMedalhas, setAbrirEditarMedalhas] = useState(false);
    const [abrirExcluirMedalhas, setAbrirExcluirMedalhas] = useState(false);
    const [abrirNivelMedalhas, setAbrirNivelMedalhas] = useState(false);
    const [updateMedalhas, setUpdateMedalhas] = useState(true);

    const abrirFecharCadastroMedalhas = (abrirCadastroMedalhas) => {
        setMedalha(medalhaInitialState);
        setAbrirCadastroMedalhas(!abrirCadastroMedalhas);
    }

    const abrirFecharEditarMedalhas = (abrirEditarMedalhas) => {
        setAbrirEditarMedalhas(!abrirEditarMedalhas);
    }

    const abrirFecharExcluirMedalhas = (abrirExcluirMedalhas) => {
        setAbrirExcluirMedalhas(!abrirExcluirMedalhas);
    }

    const abrirFecharNiveis = (abrirNivelMedalhas) => {
        setAbrirNivelMedalhas(!abrirNivelMedalhas);
    }

    const selecionarMedalha = (medalha, opcao) => {
        setMedalha(medalha);
        (opcao === "Editar") ? abrirFecharEditarMedalhas() : abrirFecharExcluirMedalhas();
    }

    const selecionaMedalahaNivel = async (medalha, abrirNivelMedalhas) => {
        await setMedalha(medalha);
        await getMedalhaNivel(medalha.medCodigo);
        abrirFecharNiveis(abrirNivelMedalhas);
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        setMedalha({
            ...medalha,
            [name]: value
        });
    }

    const getMedalhas = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`medalha?skip=${skip}`).then(response => {
            setMedalhasData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const getModalidades = async () => {
        await Api.get("modalidade").then(response => {
            setModalidadeData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const postMedalha = async () => {
        await Api.post("medalha/", medalha).then(response => {
            setMedalha(response.data);
            setUpdateMedalhas(true);
            // abrirFecharCadastroAlunos();
        }).catch(error => {
            console.log(error);
        });
        setMedalha(medalhaInitialState);
    }

    const deleteMedalha = async (aluno = aluno.aluCodigo) => {
        await Api.delete("medalha/" + aluno).then(response => {
            setUpdateMedalhas(true);
            // abrirFecharExcluirAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const getMedalhaNome = async (buscar) => {
        setCarregando(true);
        await Api.get("medalha/" + buscar).then(response => {
            setMedalhasData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const getMedalhaNivel = async (medCodigo) => {
        await Api.get("nivel/" + medCodigo).then(response => {
            setNiveisData(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (updateMedalhas) {
            getMedalhas();
            setUpdateMedalhas(false);
        }
    }, [updateMedalhas]);

    useEffect(() => {
        getModalidades();
    }, [setAbrirCadastroMedalhas]);

    return (
        <React.Fragment>
            <FormNivelMedalha
                nome={"Nível Medalha"}
                abrir={abrirNivelMedalhas}
                nivel={niveisData}
                funcAbrir={abrirFecharNiveis}
                funcAtualizaCampo={atualizaCampo}
            />

            <Modelo
                urlApi="medalha?skip="
                titulo="Cadastro Medalhas"
                subtitulo="Painel Sou+Fit"
                icone="certificate"
                tipoContainer="form-container"
                Cabecalho="Medalhas"
                BotaoAdd="Adicionar Medalha"
                dadosApi={medalhasData}
                getDados={getMedalhas}
                getByNome={getMedalhaNome}
                funcAbrirCadastro={abrirFecharCadastroMedalhas}
                colunas={[
                    { nome: "Nome" },
                    { nome: "Níveis" },
                    { nome: "Tipo" },
                ]}
            >
                <tbody>
                    {medalhasData.map((medalha) => (
                        <tr key={medalha.medCodigo}>
                            <td>{medalha.medNome}</td>
                            <td className="pl-4 listar" onClick={() => selecionaMedalahaNivel(medalha, abrirNivelMedalhas)}><BsJustify /></td>
                            <td>{medalha.medTipoDesafio}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => selecionarMedalha(medalha, "Editar")}>
                                    <i className="fa fa-pencil"></i>
                                </button>{" "}
                                <button className="btn btn-danger" onClick={() => selecionarMedalha(medalha, "Excluir")}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Modelo>

            <FormInserir
                nome={"Medalha"}
                abrir={abrirCadastroMedalhas}
                funcAbrir={abrirFecharCadastroMedalhas}
                funcPost={postMedalha}
            >
                <form className="row g-3 form-group">
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="medNome" onChange={e => this.atualizaCampo(e)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Tipo de Medida:</label>
                        <select className="form-select w-100 h-50 mb-4"
                            name="medTipoMedida"
                            onChange={e => this.atualizaCampo(e)}>
                            <option value=""></option>
                            {
                                tipoMedidas.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.nome}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="selecionarModalidade ml-2">
                        <label className="form-label mb-0 ml-2 mt-3">Modalidade:</label>
                        {

                            modalidadeData.map((modalidade) => {
                                return (
                                    <CheckBox
                                        nome={modalidade.modNome}
                                        codigo={modalidade.modCodigo}
                                        // codigoSelecionado={this.state.medalha.medCodigo}
                                        url={`medalha/modalidade/${medalha.medCodigo}`}
                                    />
                                )
                            })
                        }
                    </div>
                    {/* <ComponenteText
                        tamanho="col-md-6"
                        label="Nome:"
                        name="aluNome"
                        type="text"
                        placeholder="Nome Sobrenome"
                        onChange={atualizaCampo}
                    />
                    <ComponenteComboBox
                        tamanho="col-md-6"
                        label="Tipo de Medida:"
                        name="medTipoMedida"
                        onChange={atualizaCampo}
                        value={medalha.medCodigo}
                        options={tipoMedidas}
                    />
                    <div className="selecionarModalidade col-12 ml-2">
                        <label className="form-label mb-0 ml-2 mt-3">Modalidade:</label>
                        {

                            modalidadeData.map((modalidade) => {
                                return (
                                    <CheckBox
                                        nome={modalidade.modNome}
                                        codigo={modalidade.modCodigo}
                                        // codigoSelecionado={this.state.medalha.medCodigo}
                                        url={`medalha/modalidade/${medalha.medCodigo}`}
                                    />
                                )
                            })
                        }
                    </div> */}
                </form>
            </FormInserir>

            <FormEditar
                nome={"Medalha"}
                abrir={abrirEditarMedalhas}
                funcAbrir={abrirFecharEditarMedalhas}
                funcPut={updateMedalhas}
            >
                <form className="row g-3 form-group">
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="medNome"
                            value={medalha.medNome}
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Tipo de Medida:</label>
                        <select className="form-select w-100 h-50 mb-4"
                            name="medTipoDesafio"
                            value={medalha.medTipoDesafio}
                            onChange={e => this.atualizaCampo(e)}>
                            <option value=""></option>
                            {
                                tipoMedidas.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.nome}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="selecionarModalidade ml-2">
                        <label className="form-label mb-0 ml-2 mt-3">Modalidade:</label>
                        {
                            modalidadeData.map((modalidade) => {
                                return (
                                    <CheckBox
                                        nome={modalidade.modNome}
                                        codigo={modalidade.modCodigo}
                                        // codigoSelecionado={this.state.medalha.medCodigo}
                                        url={`medalha/modalidade/${medalha.medCodigo}`}
                                    />
                                )
                            })
                        }
                    </div>
                    {/* <ComponenteText
                        tamanho="col-md-6"
                        label="Nome:"
                        name="medNome"
                        type="text"
                        value={medalha.medNome}
                        placeholder="Nome Sobrenome"
                        onChange={atualizaCampo}
                    />
                    <ComponenteComboBox
                        tamanho="col-md-6"
                        label="Tipo de Medida:"
                        name="medTipoMedida"
                        onChange={atualizaCampo}
                        value={medalha.medCodigo}
                        options={tipoMedidas}
                    />
                    <div className="selecionarModalidade col-12 ml-2">
                        <label className="form-label mb-0 ml-2 mt-3">Modalidade:</label>
                        {
                            modalidadeData.map((modalidade) => {
                                return (
                                    <CheckBox
                                        nome={modalidade.modNome}
                                        codigo={modalidade.modCodigo}
                                        // codigoSelecionado={this.state.medalha.medCodigo}
                                        url={`medalha/modalidade/${medalha.medCodigo}`}
                                    />
                                )
                            })
                        }
                    </div> */}
                </form>
            </FormEditar>

            <FormExcluir
                nome={"Medalha"}
                dados={medalha.medNome}
                abrir={abrirExcluirMedalhas}
                funcAbrir={abrirFecharExcluirMedalhas}
                funcDelete={deleteMedalha}
            />
        </React.Fragment>
    );
}