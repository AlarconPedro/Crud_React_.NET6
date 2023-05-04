import React, { useState, useEffect } from "react";

import Mestre from "../../layout/Mestre/Mestre";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";

import FormInserir from "../../components/Crud/FormularioTreinador/FormInserir";
import FormEditar from "../../components/Crud/FormularioTreinador/FormEditar";
import FormExcluir from "../../components/Crud/FormularioTreinador/FormExcluir";

import "./TreinadoresCrud.css";
import { treinadorUrl } from "../../services/Imagens";

import Busca from "../../layout/Objetos/Busca";

export default function AlunosCrud() {

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

    const [pagina, setPagina] = useState(1);

    const [abrirCadastroTreinadores, setAbrirCadastroTreinadores] = useState(false);
    const [abrirEditarTreinadores, setAbrirEditarTreinadores] = useState(false);
    const [abrirExcluirTreinadores, setAbrirExcluirTreinadores] = useState(false);
    const [updateTreinadores, setUpdateTreinadores] = useState(true);

    const abrirFecharCadastroTreinadores = (abrirCadastroTreinadores) => {
        setAbrirCadastroTreinadores(!abrirCadastroTreinadores);
        setTreinador(treinadorInitialState);
    }

    const abrirFecharEditarTreinadores = (abrirEditarTreinadores) => {
        setAbrirEditarTreinadores(!abrirEditarTreinadores);
    }

    const abrirFecharExcluirTreinadores = (abrirExcluirTreinadores) => {
        setAbrirExcluirTreinadores(!abrirExcluirTreinadores);
    }

    const mascaraTelefone = (e) => {
        let input = e.target;
        input.value = phoneMask(input.value);
        setTreinador({ ...treinador, [e.target.name]: input.value });
    }

    const phoneMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{4})$/, "$1-$2")
        return value
    }

    const selecionaImagem = (e) => {
        console.log(e.target.files[0]); // Imagem
        setTreinador({ ...treinador, treImagem: e.target.files[0] });
    }

    const selecionarTreinador = (treinador, opcao) => {
        setTreinador(treinador);
        (opcao === "Editar") ? abrirFecharEditarTreinadores() : abrirFecharExcluirTreinadores();
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
            // abrirFecharCadastroAlunos();
        }).catch(error => {
            console.log(error);
        });
        setUpdateTreinadores(!updateTreinadores);
        setTreinador(treinadorInitialState);
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

    const deleteTreinador = async (treinador = treinador.treCodigo) => {
        await Api.delete("treinador/" + treinador).then(response => {
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

    const alterarPagina = (e) => {
        e === "&gt;" ? pagina > treinadoresData.length ? avancarPagina()
            : avancarPagina(pagina * 10)
            : voltarPagina(pagina * 10);
    }

    const avancarPagina = async (skip) => {
        getTreinadores(skip);
        pagina > treinadoresData.length ? setPagina(1) :
            setPagina(pagina + 1);
    }

    const voltarPagina = async (skip) => {
        skip = skip - 20;
        getTreinadores(skip);
        pagina > 1 ? setPagina(pagina - 1) : setPagina(1);
    }

    return (
        <Mestre icon="graduation-cap" title="Cadastro Treinadores" subtitle="Painel Sou+Fit">
            <div className="treinadores-container">
                <header>
                    <h3>Treinadores</h3>
                    <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroTreinadores()}><strong>+</strong> Adicionar Treinador</button>
                </header>
                <hr />
                <Busca buscar={getTreinadorNome}/>
                <br />
                {carregando ? <div className="spinner-border loader" role="status">
                </div>
                    : <table className="table table-striped">
                        <thead>
                            <tr>
                                {/* <th>Id</th> */}
                                <th>Avatar</th>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Ativo</th>
                                <th className="acoes">Ações</th>
                            </tr>
                        </thead>
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
                    </table>
                }
                <hr />
                <br />
                <div className="d-flex justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item" onClick={() => alterarPagina("&lt;")}><a className="page-link">&lt;</a></li>
                            <li className="page-item active"><p className="page-link">{pagina}</p></li>
                            <li className="page-item"><a className="page-link" onClick={() => alterarPagina("&gt;")}>&gt;</a></li>
                        </ul>
                    </nav>
                </div>

                <FormInserir
                    nome={"Treinador"}
                    abrir={abrirCadastroTreinadores}
                    treDados={treinador}
                    funcPost={postTreinador}
                    funcAbrir={abrirFecharCadastroTreinadores}
                    funcMascara={mascaraTelefone}
                    funcSelectImagem={selecionaImagem}
                    funcAtualizaCampoAtivo={atualizaCampoAtivo}
                    funcAtualizaCampo={atualizaCampo}
                    treinaData={treinadoresData}
                    funcBuscaTreinador={getTreinadorId}
                />

                <FormEditar
                    nome={"Treinador"}
                    abrir={abrirEditarTreinadores}
                    treNome={treinador && treinador.treNome}
                    treDados={treinador}
                    funcPut={putTreinador}
                    funcAbrir={abrirFecharEditarTreinadores}
                    funcSelectImagem={selecionaImagem}
                    funcMascara={mascaraTelefone}
                    funcAtualizaCampoAtivo={atualizaCampoAtivo}
                    funcAtualizaCampo={atualizaCampo}
                    treinaData={treinadoresData}
                    funcBuscaTreinador={getTreinadorId}
                />

                <FormExcluir
                    nome={"Treinador"}
                    abrir={abrirExcluirTreinadores}
                    aluNome={treinador && treinador.treNome}
                    aluDados={treinador.treCodigo}
                    funcDelete={deleteTreinador}
                    funcAbrir={abrirFecharExcluirTreinadores}
                />
            </div>
        </Mestre >
    );
}