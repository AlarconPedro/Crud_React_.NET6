import React, { useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";

import FormInserir from "../../components/Forms/FormInserir";
import FormEditar from "../../components/Forms/FormEditar";
import FormExcluir from "../../components/Forms/FormExcluir";

import Modelo from "../../components/Layout/Modelo";

import "./TreinadoresCrud.css";
import { treinadorUrl } from "../../services/Imagens";

import MascaraTelefone from "../../funcoes/MascaraTelefone";

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
        await Api.get(`treinador?skip=${skip}`).then(response => {
            setTreinadoresData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const getTreinadorId = async (id) => {
        await Api.get(`treinador/${id}`).then(response => {
            setTreinadoresData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const postTreinador = async () => {
        await Api.post("treinador/", treinador).then(response => {
            setTreinador(response.data);
        }).catch(error => {
            console.log(error);
        });
        setUpdateTreinadores(!updateTreinadores);
        setTreinador(treinadorInitialState);
        abrirFecharCadastroTreinadores(true);
    }

    const putTreinador = async (codigo = treinador.treCodigo) => {
        await Api.put("treinador/" + codigo, treinador).then(response => {
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
        await Api.delete("treinador/" + treinador.treCodigo).then(response => {
            abrirFecharExcluirTreinadores(true);
            setUpdateTreinadores(true);
        }).catch(error => {
            console.log(error);
        });
    }

    const getTreinadorNome = async (busca) => {
        setCarregando(true);
        await Api.get("treinador/" + busca).then(response => {
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
                urlApi="treinador?skip="
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
                                <td className=""><img src={treinadorUrl + treinador.treImagem} alt="" /></td>
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
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="treNome" onChange={e => atualizaCampo(e)} />
                    </div>
                    <div className="col-6">
                        <label className="form-label mb-0">Telefone:</label>
                        <input type="tel" className="form-control" placeholder="(00) 00000-0000" maxLength={15}
                            name="treFone"
                            onKeyUp={e => mascaraTelefone(e)}
                            onChange={e => atualizaCampo(e)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0 mt-2">Email:</label>
                        <input type="email" className="form-control" placeholder="exemplo@gmail.com"
                            name="treEmail" onChange={e => atualizaCampo(e)} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Senha:</label>
                        <input type="password" className="form-control" placeholder="****"
                            name="treSenha" onChange={e => atualizaCampo(e)} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Confirmar Senha:</label>
                        <input type="password" className="form-control" placeholder="****"
                            name="treSenha" onChange={e => atualizaCampo(e)} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Observação:</label>
                        <input type="text" className="form-control" placeholder="Obs."
                            name="treBio" onChange={e => atualizaCampo(e)} />
                    </div>
                    <div className="col-2 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                                name="treAtivo"
                                onChange={e => atualizaCampoAtivo(e)}
                                value={true} />
                            <label className="form-check-label">Ativo</label>
                        </div>
                    </div>
                    <div className="col-md-4 mt-5">
                        <label className="form-label mb-0">Imagem:</label>
                        <input type="file" alt="imagem"
                            className="container border-dark"
                            name="aluImagem"
                            accept="image/png, image/gif, image/jpeg"
                        // onChange={e => props.funcSelectImagem(e)}
                        />
                    </div>
                </form>
            </FormInserir>

            <FormEditar
                nome={"Treinador"}
                abrir={abrirEditarTreinadores}
                funcAbrir={abrirFecharEditarTreinadores}
                funcPut={putTreinador}
            >
                <form className="row g-3 form-group">
                    <div className="col-md-12">
                        <label className="mb-0">Id: </label>
                        <input type="number" className="form-control mb-2" readOnly disabled
                            value={treinador.treCodigo}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Nome:</label>
                        <input type="text" className="form-control" placeholder="Nome Sobrenome"
                            name="treNome"
                            onChange={e => atualizaCampo(e)}
                            value={treinador.treNome}
                        />
                    </div>
                    <div className="col-6">
                        <label className="form-label mb-0">Telefone:</label>
                        <input type="tel" class="form-control" maxLength={15}
                            name="treFone"
                            onKeyUp={e => mascaraTelefone(e)}
                            onChange={e => atualizaCampo(e)}
                            value={treinador.treFone}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0 mt-2">Email:</label>
                        <input type="email" className="form-control" name="treEmail"
                            onChange={e => atualizaCampo(e)} value={treinador.treEmail} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Senha:</label>
                        <input type="password" className="form-control" name="treSenha"
                            onChange={e => atualizaCampo(e)} value={treinador.treSenha} />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label mb-0 mt-2">Confirmar Senha:</label>
                        <input type="password" className="form-control" name="treSenha"
                            onChange={e => atualizaCampo(e)} value={treinador.treSenha} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mb-0">Observação:</label>
                        <input type="text" className="form-control" name="treBio"
                            onChange={e => atualizaCampo(e)} value={treinador.treBio} />
                    </div>
                    <div className="col-2 mt-5">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck"
                                name="treAtivo"
                                onChange={e => atualizaCampoAtivo(e)}
                                checked={treinador.treAtivo}
                                value={true} />
                            <label className="form-check-label">Ativo</label>
                        </div>
                    </div>
                    <div className="col-md-4 mt-5">
                        <label className="form-label mb-0">Imagem:</label>
                        <input type="file" className="form-control"
                            name="treImagem"
                        // onChange={e => props.funcSelectImagem(e)} 
                        />
                        {treinador.treImagem === null
                            ? <div></div>
                            : <img src={treinadorUrl + treinador.treImagem} alt="imagem" />}
                    </div>
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