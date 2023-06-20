import React, { useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";
import { treinadorUrl } from "../../services/RotasApi";

import FormInserir from "../../Forms/FormInserir";
import FormEditar from "../../Forms/FormEditar";
import FormExcluir from "../../Forms/FormExcluir";

import Modelo from "../../Forms/Modelo";

import "./TreinadoresCrud.css";
import { treinadorUrlImagem } from "../../services/Imagens";

import MascaraTelefone from "../../Funcoes/MascaraTelefone";

import ComponenteText from "../../Layout/Componentes/ComponenteText";
import ComponenteAtivo from "../../Layout/Componentes/ComponenteAtivo";
import ComponenteImagem from "../../Layout/Componentes/ComponenteImagem";

export default function TreinadoresCrud() {

    const [carregando, setCarregando] = useState(false);

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [treinadorInitialState] = useState({
        treCodigo: 0,
        treNome: '',
        treEmail: '',
        treSenha: '',
        treOneSignalId: null,
        treImagem: '',
        treId: '',
        treFone: '',
        treAtivo: true,
        treBio: '',
        tbAlunos: [],
        tbDesafios: [],
        tbEventos: [],
        tbTreinadorRedeSocials: null,
    });


    const [treinador, setTreinador] = useState({
        treCodigo: 0,
        treNome: '',
        treEmail: '',
        treSenha: '',
        treOneSignalId: null,
        treImagem: '',
        treId: '',
        treFone: '',
        treAtivo: true,
        treBio: '',
        tbAlunos: [],
        tbDesafios: [],
        tbEventos: [],
        tbTreinadorRedeSocials: null,
    });

    const [nomeBusca, setNomeBusca] = useState({
        treNome: ''
    });

    const [abrirCadastroTreinadores, setAbrirCadastroTreinadores] = useState(false);
    const [abrirEditarTreinadores, setAbrirEditarTreinadores] = useState(false);
    const [abrirExcluirTreinadores, setAbrirExcluirTreinadores] = useState(false);
    const [updateTreinadores, setUpdateTreinadores] = useState(true);

    const abrirFecharCadastroTreinadores = (abrir) => {
        setAbrirCadastroTreinadores(!abrir || !abrirCadastroTreinadores);
        setTreinador(treinadorInitialState);
    }

    const abrirFecharEditarTreinadores = (abrirEditarTreinadores) => {
        setAbrirEditarTreinadores(!abrirEditarTreinadores);
    }

    const abrirFecharExcluirTreinadores = (abrirExcluirTreinadores) => {
        setAbrirExcluirTreinadores(!abrirExcluirTreinadores);
    }

    const selecionaImagem = (e) => {
        console.log(e.target.files[0]); // Imagem
        setTreinador({ ...treinador, treImagem: e.target.files[0] });
    }

    const selecionarTreinador = (treinador, opcao) => {
        setTreinador(treinador);
        if (opcao === "Editar") {
            abrirFecharEditarTreinadores();
        } else {
            abrirFecharExcluirTreinadores();
        }
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        console.log(name, value);
        setTreinador({
            ...treinador,
            [name]: value
        });
    }

    const atualizaCampoBusca = e => {
        const { name, value } = e.target;
        setNomeBusca({
            ...nomeBusca,
            [name]: value
        });
    }

    const atualizaCampoAtivo = e => {
        const { name, value } = e.target;
        setTreinador({
            ...treinador,
            [name]: value === "true" ? true : false
        });
    }

    const mascaraTelefone = e => {
        MascaraTelefone(e);
        setTreinador({
            ...treinador,
            [e.target.name]: e.target.value
        });
    }

    const getTreinadores = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`${treinadorUrl}?skip=${skip}`).then(response => {
            setTreinadoresData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const getTreinadorId = async (id) => {
        await Api.get(`${treinadorUrl}${id}`).then(response => {
            setTreinadoresData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const postTreinador = async () => {
        await Api.post(treinadorUrl, treinador).then(response => {
            setTreinador(response.data);
        }).catch(error => {
            console.log(error);
        });
        setUpdateTreinadores(!updateTreinadores);
        setTreinador(treinadorInitialState);
        abrirFecharCadastroTreinadores(true);
    }

    const putTreinador = async (codigo = treinador.treCodigo) => {
        await Api.put(treinadorUrl + codigo, treinador).then(response => {
            var treinadoresAuxiliar = treinadoresData;
            treinadoresAuxiliar.map(treinadorMap => {
                if (treinadorMap.treCodigo === treinador.treCodigo) {
                    treinadorMap.treNome = treinador.treNome;
                    treinadorMap.treEmail = treinador.aluEmail;
                    treinadorMap.treSenha = treinador.aluSenha;
                    treinadorMap.treOneSignalId = treinador.aluOneSignalId;
                    treinadorMap.treId = treinador.aluId;
                    treinadorMap.treFone = treinador.aluFone;
                    treinadorMap.treAtivo = treinador.aluAtivo;
                    treinadorMap.treBio = treinador.aluObs;
                }
                return treinadorMap;
            });
            setTreinadoresData(treinadoresAuxiliar);
            setUpdateTreinadores(true);
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteTreinador = async () => {
        await Api.delete(treinadorUrl + treinador.treCodigo).then(response => {
            abrirFecharExcluirTreinadores(true);
            setUpdateTreinadores(true);
        }).catch(error => {
            console.log(error);
        });
    }

    const getTreinadorNome = async (busca) => {
        setCarregando(true);
        await Api.get(treinadorUrl + busca).then(response => {
            setTreinadoresData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    useEffect(() => {
        if (updateTreinadores) {
            getTreinadores();
            setUpdateTreinadores(false);
        }
    }, [updateTreinadores]);

    function handleDefault(e) {
        e.preventDefault();
    }

    return (
        <React.Fragment>
            <Modelo
                urlApi={`${treinadorUrl}?skip=`}
                titulo="Cadastro Treinadores"
                subtitulo="Painel Sou+Fit"
                icone="graduation-cap"
                tipoContainer="form-container"
                Cabecalho="Treinadores"
                BotaoAdd="Adicionar Treinador"
                dadosApi={treinadoresData}
                getDados={getTreinadores}
                getByNome={getTreinadorNome}
                funcAbrirCadastro={abrirFecharCadastroTreinadores}
                colunas={[
                    { nome: "Avatar" },
                    { nome: "Nome" },
                    { nome: "Telefone" },
                    { nome: "Ativo" },
                ]}
            >
                {carregando ? <div className="spinner-border loader" role="status"></div>
                    :
                    <tbody>
                        {treinadoresData.map((treinador) => (
                            <tr key={treinador.treCodigo}>
                                {/* <td>{aluno.aluCodigo}</td> */}
                                <td className=""><img src={treinadorUrlImagem + treinador.treImagem} alt="" /></td>
                                <td className="pt-3">{treinador.treNome}</td>
                                <td className="pt-3">{treinador.treFone}</td>
                                <td className="pt-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={treinador.treCodigo} value={true} />
                                    </div>
                                </td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => selecionarTreinador(treinador, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => selecionarTreinador(treinador, "Excluir")}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            </Modelo>

            <FormInserir
                nome={"Treinador"}
                abrir={abrirCadastroTreinadores}
                funcAbrir={abrirFecharCadastroTreinadores}
                funcPost={postTreinador}
            >
                <form className="row g-3 form-group">
                    <ComponenteText
                        tamanho="col-md-6"
                        label="Nome:"
                        name="treNome"
                        type="text"
                        placeholder="Nome Sobrenome"
                        onChange={(e) => atualizaCampo(e)}
                    />
                    <ComponenteText
                        tamanho="col-6"
                        label="Telefone:"
                        name="treFone"
                        placeholder="(00) 00000-0000"
                        maxLength="15"
                        type="tel"
                        atualizaCampo={(e) => atualizaCampo(e)}
                        adicionarMascara={mascaraTelefone}
                    />
                    <ComponenteText
                        tamanho="col-md-6"
                        label="Email:"
                        name="treEmail"
                        type="email"
                        placeholder="exemplo@gmail.com"
                        onChange={(e) => atualizaCampo(e)}
                    />
                    <ComponenteText
                        tamanho="col-md-3"
                        label="Senha:"
                        name="treSenha"
                        type="password"
                        placeholder="****"
                        onChange={(e) => atualizaCampo(e)}
                    />
                    <ComponenteText
                        tamanho="col-md-3"
                        label="Confirmar Senha:"
                        name="treSenha"
                        type="password"
                        placeholder="****"
                        onChange={(e) => atualizaCampo(e)}
                    />
                    <ComponenteText
                        tamanho="col-md-6"
                        label="Observação:"
                        name="treBio"
                        type="text"
                        placeholder="Obs."
                        onChange={(e) => atualizaCampo(e)}
                    />
                    <ComponenteAtivo
                        tamanho="col-1 mt-5"
                        label="Ativo:"
                        name="treAtivo"
                        onChange={atualizaCampoAtivo}
                        value={true}
                    />
                    <ComponenteImagem
                        tamanho="col-md-4 mt-5"
                        label="Imagem:"
                        name="treImagem"
                        type="file"
                    />
                </form>
            </FormInserir>

            <FormEditar
                nome={"Treinador"}
                abrir={abrirEditarTreinadores}
                funcAbrir={abrirFecharEditarTreinadores}
                funcPut={putTreinador}
            >
                <form className="row g-3 form-group">
                    {/* <div className="col-md-12">
                        <label className="mb-0">Id: </label>
                        <input type="number" className="form-control mb-2" readOnly disabled
                            value={treinador.treCodigo}
                        />
                    </div> */}
                    <ComponenteText
                        tamanho="col-md-6"
                        label="Nome:"
                        name="treNome"
                        type="text"
                        placeholder="Nome Sobrenome"
                        value={treinador.treNome}
                        onChange={(e) => atualizaCampo(e)}
                    />
                    <ComponenteText
                        tamanho="col-6"
                        label="Telefone:"
                        name="treFone"
                        placeholder="(00) 00000-0000"
                        maxLength="15"
                        type="tel"
                        value={treinador.treFone}
                        atualizaCampo={(e) => atualizaCampo(e)}
                        adicionarMascara={mascaraTelefone}
                    />
                    <ComponenteText
                        tamanho="col-md-6"
                        label="Email:"
                        name="treEmail"
                        type="email"
                        value={treinador.treEmail}
                        onChange={(e) => atualizaCampo(e)}
                    />
                    <ComponenteText
                        tamanho="col-md-3"
                        label="Senha:"
                        name="treSenha"
                        type="password"
                        value={treinador.treSenha}
                        placeholder="****"
                        onChange={(e) => atualizaCampo(e)}
                    />
                    <ComponenteText
                        tamanho="col-md-3"
                        label="Confirmar Senha:"
                        name="treSenha"
                        type="password"
                        value={treinador.treSenha}
                        placeholder="****"
                        onChange={(e) => atualizaCampo(e)}
                    />
                    <ComponenteText
                        tamanho="col-md-6"
                        label="Observação:"
                        name="treBio"
                        type="text"
                        value={treinador.treBio}
                        placeholder="Obs."
                        onChange={(e) => atualizaCampo(e)}
                    />
                    <ComponenteAtivo
                        tamanho="col-1 mt-5"
                        label="Ativo:"
                        name="treAtivo"
                        checked={treinador.treAtivo}
                        onChange={atualizaCampoAtivo}
                        value={true}
                    />
                    <ComponenteImagem
                        tamanho="col-md-4 mt-5"
                        label="Imagem:"
                        name="treImagem"
                        type="file"
                        urlImagem={treinadorUrlImagem + treinador.treImagem}
                    />
                </form>
            </FormEditar>

            <FormExcluir
                nome={"Treinador"}
                abrir={abrirExcluirTreinadores}
                dados={treinador.treNome}
                funcAbrir={abrirFecharExcluirTreinadores}
                funcDelete={deleteTreinador}
            />
        </React.Fragment>
    );
}