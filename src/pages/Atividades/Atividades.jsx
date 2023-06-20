import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";

import { atividadeUrl, alunoUrl } from "../../services/RotasApi";

import FormInserir from "../../Forms/FormInserir";
import FormEditar from "../../Forms/FormEditar";
import FormExcluir from "../../Forms/FormExcluir";
import FormImagens from "../../Forms/FormImagens";

import { BsJustify } from "react-icons/bs";

import ConverteData from "../../Funcoes/ConverteData";
import ConverteTempo from "../../Funcoes/ConverteTempo";
import ConverteDistancia from "../../Funcoes/ConverteDistancia";

import ComponenteData from "../../Layout/Componentes/ComponenteData";
import ComponenteText from "../../Layout/Componentes/ComponenteText";

import "./Atividades.css";
import Modelo from "../../Forms/Modelo";

export default function Atividades(props) {

    const location = useLocation();
    const { codigo } = location.state;

    const [carregando, setCarregando] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());

    const [atividadesData, setAtividadesData] = useState([]);

    const [atividadeInitialState] = useState({
        modCodigo: 0,
        modNome: '',
        aluAtiCodigo: 0,
        aluAtiDataHora: new Date("01/01/1990"),
        aluAtiMedida: 0,
        aluAtiDuracaoSeg: 0,
        aluAtiObs: '',
        aluAtiIntensidade: 0,
        aluAtiID: '',
        aluAtiStrava: '',
        aluAtiTipo: '',
        aluAtiVelocidade: 0,
        aluAtiElevacao: 0,
        aluAtiCalorias: 0,
        aluAtiFC: 0,
        aluAtiCadencia: 0,
        aluAtiPotencia: 0,
        aluAtiDescricao: '',
        aluAtiCidade: '',
        aluAtiEstado: '',
        total: 0,
    });


    const [atividade, setAtividade] = useState({
        modCodigo: 0,
        modNome: '',
        aluAtiCodigo: 0,
        aluAtiDataHora: new Date(dataAtual),
        aluAtiMedida: 0,
        aluAtiDuracaoSeg: 0,
        aluAtiObs: '',
        aluAtiIntensidade: 0,
        aluAtiID: '',
        aluAtiStrava: '',
        aluAtiTipo: '',
        aluAtiVelocidade: 0,
        aluAtiElevacao: 0,
        aluAtiCalorias: 0,
        aluAtiFC: 0,
        aluAtiCadencia: 0,
        aluAtiPotencia: 0,
        aluAtiDescricao: '',
        aluAtiCidade: '',
        aluAtiEstado: '',
        total: 0,
    });

    const [abrirCadastroAtividades, setAbrirCadastroAtividades] = useState(false);
    const [abrirEditarAtividades, setAbrirEditarAtividades] = useState(false);
    const [abrirExcluirAtividades, setAbrirExcluirAtividades] = useState(false);
    const [abrirImagens, setAbrirImagens] = useState(false);
    const [updateAtividades, setUpdateAtividades] = useState(true);

    const abrirFecharCadastroAtividades = (abrirCadastroAtividades) => {
        setAbrirCadastroAtividades(!abrirCadastroAtividades);
        setAtividade(atividadeInitialState);
    }

    const abrirFecharEditarAtividades = (abrirEditarAtividades) => {
        setAbrirEditarAtividades(!abrirEditarAtividades);
    }

    const abrirFecharExcluirAtividades = (abrirExcluirAtividades) => {
        setAbrirExcluirAtividades(!abrirExcluirAtividades);
    }

    const abrirFecharImagens = (abrirImagens) => {
        setAbrirImagens(!abrirImagens);
    }

    const selecionarAtividade = (atividade, opcao) => {
        setAtividade(atividade);
        if (opcao === "Imagens") {
            // setAtividade({
            //     ...atividade,
            //     aluAtiCodigo: atividade.aluAtiCodigo
            // });
            abrirFecharImagens();
        } else if (opcao === "Editar") {
            abrirFecharEditarAtividades();
        } else {
            abrirFecharExcluirAtividades();
        }
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        setAtividade({
            ...atividade,
            [name]: value
        });
    }

    const dataAuxiliar = (date) => {
        setDataAtual(date);
        let data = ConverteData(date);
        setAtividade({
            ...atividade,
            aluAtiDataHora: data
        });
        return data;
    }

    const getAtividades = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`${atividadeUrl}alunoid/${codigo}?skip=${skip}`).then(response => {
            setAtividadesData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const getAtividadeId = async () => {
        await Api.get(`${atividadeUrl}${atividade.aluAtiCodigo}`).then(response => {
            setAtividade(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const postAtividade = async () => {
        await dataAuxiliar(dataAtual);
        await Api.post(alunoUrl, atividade).then(response => {
            setAtividade(response.data);
            setUpdateAtividades(true);
            // abrirFecharCadastroAlunos();
        }).catch(error => {
            console.log(error);
        });
        setAtividade(atividadeInitialState);
    }

    const putAtividade = async () => {
        await dataAuxiliar(dataAtual);
        await Api.put(alunoUrl + codigo, atividade).then(response => {
            var alunosAuxiliar = atividadesData;
            alunosAuxiliar.map(alunoMap => {
                if (alunoMap.aluCodigo === atividade.aluCodigo) {
                    alunoMap.aluNome = atividade.aluNome;
                    alunoMap.aluDataNasc = atividade.aluDataNasc;
                    alunoMap.aluEmail = atividade.aluEmail;
                    alunoMap.aluSenha = atividade.aluSenha;
                    alunoMap.treCodigo = atividade.treCodigo;
                    alunoMap.aluOneSignalId = atividade.aluOneSignalId;
                    alunoMap.aluId = atividade.aluId;
                    alunoMap.aluFone = atividade.aluFone;
                    alunoMap.aluSexo = atividade.aluSexo;
                    alunoMap.aluAtivo = atividade.aluAtivo;
                    alunoMap.aluObs = atividade.aluObs;
                    alunoMap.aluStravaCode = atividade.aluStravaCode;
                    alunoMap.aluStravaToken = atividade.aluStravaToken;
                    alunoMap.aluStravaRefreshToken = atividade.aluStravaRefreshToken;
                    alunoMap.aluStravaExpiresAt = atividade.aluStravaExpiresAt;
                    alunoMap.aluStravaExpiresIn = atividade.aluStravaExpiresIn;
                    alunoMap.aluStravaScope = atividade.aluStravaScope;
                    alunoMap.aluStravaTokenType = atividade.aluStravaTokenType;
                }
                return alunoMap;
            });
            setAtividadesData(alunosAuxiliar);
            // setAluno(response.data);
            setUpdateAtividades(true);
            // abrirFecharEditarAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const getAtividadesNome = async (nome) => {
        setCarregando(true);
        await Api.get(`${atividadeUrl}alunoid/${codigo}/` + nome).then(response => {
            setAtividadesData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const deleteAtividade = async () => {
        await Api.delete(alunoUrl + codigo).then(response => {
            setUpdateAtividades(true);
            // abrirFecharExcluirAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (updateAtividades) {
            getAtividades();
            setUpdateAtividades(false);
        }
    }, [updateAtividades]);

    useEffect(() => {
        getAtividadeId();
    }, [atividade.aluAtiCodigo]);

    return (
        <React.Fragment>
            <Modelo
                urlApi={`${atividadeUrl}${codigo}?skip=`}
                titulo="Cadastro Atividades"
                subtitulo="Painel Sou+Fit"
                icone="user"
                tipoContainer="form-container"
                Cabecalho="Atividades"
                BotaoAdd="Adicionar Atividade"
                dadosApi={atividadesData}
                getDados={getAtividades}
                getByNome={getAtividadesNome}
                funcAbrirCadastro={abrirFecharCadastroAtividades}
                colunas={[
                    { nome: "Modalidade" },
                    { nome: "Data/Hora" },
                    { nome: "Medida" },
                    { nome: "Duração" },
                    { nome: "Intensidade" },
                    { nome: "Imagens" },
                ]}
            >
                {carregando ? <div className="spinner-border loader" role="status" />
                    :
                    <tbody>
                        {atividadesData.map((atividade) => (
                            <tr key={atividade.modCodigo}>
                                <td className="pt-3">{atividade.modNome}</td>
                                <td className="pt-3">{ConverteData(atividade.aluAtiDataHora)}</td>
                                <td className="pt-3">{ConverteDistancia(atividade.aluAtiMedida)}</td>
                                <td className="pt-3">{ConverteTempo(atividade.aluAtiDuracaoSeg)}</td>
                                <td className="pt-3">{atividade.aluAtiIntensidade}</td>
                                {/* <td className="pt-3">{atividade.modNome}</td> */}
                                {/* <td className=""><img src={alunoUrl + atividade.aluAtiImgImagem} alt="" /></td> */}
                                <td className="pt-3 listar" onClick={() => selecionarAtividade(atividade, "Imagens")}><BsJustify /></td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => selecionarAtividade(atividade, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => selecionarAtividade(atividade, "Excluir")}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            </Modelo>

            <FormImagens
                nome={"Atividade Imagens"}
                abrir={abrirImagens}
                codigo={atividade.aluAtiCodigo}
                funcAbrir={abrirFecharImagens}
            // imagens={atividade.aluAtiImgImagem}
            />

            <FormInserir
                nome={"Atividade"}
                abrir={abrirCadastroAtividades}
                funcAbrir={abrirFecharCadastroAtividades}
                funcPost={postAtividade}
            >
                <form className="row g-3 form-group">
                    <ComponenteText 
                        tamanho="col-md-12"
                        label="Nome:"
                        name="aluNome"
                        type="text"
                        placeholder="Nome Sobrenome"
                        value={atividade.aluNome}
                        onChange={e => atualizaCampo(e)}
                    />
                    <ComponenteData
                        tamanho="col-md-3"
                        label="Data/Hora:"
                        name="aluDataNasc"
                        value={atividade.aluDataNasc}
                        selected={new Date(dataAtual)}
                        selecionaData={date => atualizaCampo(date)}
                    />
                    <ComponenteText 
                        tamanho="col-md-3"
                        label="Medida:"
                        name="aluNome"
                        type="text"
                        placeholder="Nome Sobrenome"
                        value={atividade.aluNome}
                        onChange={e => atualizaCampo(e)}
                    />
                    <ComponenteText 
                        tamanho="col-md-3"
                        label="Duração:"
                        name="aluEmail"
                        type="text"
                        placeholder="Nome Sobrenome"
                        value={atividade.aluNome}
                        onChange={e => atualizaCampo(e)}
                    />
                    <ComponenteText 
                        tamanho="col-md-3"
                        label="Intensidade:"
                        name="aluEmail"
                        type="text"
                        placeholder="Nome Sobrenome"
                        value={atividade.aluNome}
                        onChange={e => atualizaCampo(e)}
                    />
                    <ComponenteText 
                        tamanho="col-md-12"
                        label="Observação:"
                        name="aluObs"
                        type="text"
                        placeholder="Obs."
                        value={atividade.aluNome}
                        onChange={e => atualizaCampo(e)}
                    />
                </form>
            </FormInserir>

            <FormEditar
                nome={"Atividade"}
                abrir={abrirEditarAtividades}
                funcAbrir={abrirFecharEditarAtividades}
                funcPut={putAtividade}
            >
                <form className="row g-3 form-group">
                    {/* <div className="col-md-12">
                        <label className="mb-0">Id: </label>
                        <input type="number" className="form-control mb-2" readOnly disabled
                            value={atividade.aluAtiCodigo}
                        />
                    </div> */}
                    <ComponenteText 
                        tamanho="col-md-6"
                        label="Modalidade:"
                        name="modNome"
                        type="text"
                        placeholder="Modalidade"
                        value={atividade.modNome}
                        onChange={e => atualizaCampo(e)}
                    />
                    <ComponenteText 
                        tamanho="col-md-6"
                        label="Descrição:"
                        name="aluNome"
                        type="text"
                        placeholder="Descrição"
                        value={atividade.aluAtiDescricao}
                        onChange={e => atualizaCampo(e)}
                    />
                    <ComponenteData
                        tamanho="col-md-3"
                        label="Data/Hora:"
                        name="aluDataNasc"
                        value={atividade.aluAtiDataHora}
                        selected={new Date(dataAtual)}
                        selecionaData={date => atualizaCampo(date)}
                        onChange={e => atualizaCampo(e)}
                    />
                    <ComponenteText 
                        tamanho="col-md-3"
                        label="Medida:"
                        name="aluNome"
                        type="text"
                        placeholder="Nome Sobrenome"
                        value={atividade.aluAtiMedida}
                        onChange={e => atualizaCampo(e)}
                    />
                    <ComponenteText 
                        tamanho="col-md-3"
                        label="Duração:"
                        name="aluAtiDuracaoSeg"
                        type="text"
                        placeholder="Nome Sobrenome"
                        value={atividade.aluAtiDuracaoSeg}
                        onChange={e => atualizaCampo(e)}
                    />
                    <ComponenteText 
                        tamanho="col-md-3"
                        label="Intensidade:"
                        name="aluAtiIntensidade"
                        type="text"
                        placeholder="Nome Sobrenome"
                        value={atividade.aluAtiIntensidade}
                        onChange={e => atualizaCampo(e)}
                    />
                    <ComponenteText 
                        tamanho="col-md-3"
                        label="Cidade:"
                        name="aluAtiCidade"
                        type="text"
                        placeholder="Umuarama - PR"
                        value={atividade.aluAtiCidade}
                        onChange={e => atualizaCampo(e)}
                    />
                    <ComponenteText 
                        tamanho="col-md-1"
                        label="UF:"
                        name="aluAtiEstado"
                        type="text"
                        value={atividade.aluAtiEstado}
                        onChange={e => atualizaCampo(e)}
                    />
                    <ComponenteText 
                        tamanho="col-md-12"
                        label="Observação:"
                        name="aluAtiObs"
                        type="text"
                        // placeholder="Nome Sobrenome"
                        value={atividade.aluAtiObs}
                        onChange={e => atualizaCampo(e)}
                    />
                </form>
            </FormEditar>

            <FormExcluir
                nome={"Atividade"}
                abrir={abrirExcluirAtividades}
                dados={atividade.aluCodigo}
                funcDelete={deleteAtividade}
                funcAbrir={abrirFecharExcluirAtividades}
            />
        </React.Fragment>
    );
}