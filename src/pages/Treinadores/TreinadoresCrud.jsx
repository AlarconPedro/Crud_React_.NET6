import React, { useState, useEffect } from "react";

import Mestre from "../../layout/Mestre/Mestre";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Api from "../../services/Api";

import "./TreinadoresCrud.css";

export default function TreinadoresCrud() {

    const [carregando, setCarregando] = useState(false);

    const [treinadoresData, setTreinadorData] = useState([]);

    const [treinador, setTreinador] = useState({
        treCodigo: '',
        treNome: '',
        treEmail: '',
        treSenha: '',
        treOneSignalId: '',
        treImagem: '',
        treId: '',
        treFone: '',
        treAtivo: '',
        treBio: '',
    });

    const [nomeBusca, setNomeBusca] = useState({
        aluNome: ''
    });

    const [pagina, setPagina] = useState(1);

    const [abrirCadastroTreinadores, setAbrirCadastroTreinadores] = useState(false);
    const [abrirEditarTreinadores, setAbrirEditarTreinadores] = useState(false);
    const [abrirExcluirTreinadores, setAbrirExcluirTreinadores] = useState(false);
    const [updateTreinadores, setUpdateTreinadores] = useState(true);

    const abrirFecharCadastroTreinadores = () => {
        setAbrirCadastroTreinadores(!abrirCadastroTreinadores);
    }

    const abrirFecharEditarTreinadores = () => {
        setAbrirEditarTreinadores(!abrirEditarTreinadores);
    }

    const abrirFecharExcluirTreinadores = () => {
        setAbrirExcluirTreinadores(!abrirExcluirTreinadores);
    }

    const selecionarTreinador = (treinador, opcao) => {
        setTreinador(treinador);
        (opcao === "Editar") ? abrirFecharEditarTreinadores() : abrirFecharExcluirTreinadores();
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
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

    const getTreinadores = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`treinador?skip=${skip}`).then(response => {
            setTreinadorData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const postTreinador = async () => {
        delete treinador.aluCodigo;
        // aluno.idade = parseInt(aluno.idade);
        await Api.post("treinador/", treinador).then(response => {
            setTreinador(response.data);
            setUpdateTreinadores(true);
            abrirFecharCadastroTreinadores();
        }).catch(error => {
            console.log(error);
        });
    }

    const putTreinador = async () => {
        // aluno.idade = parseInt(aluno.idade);
        await Api.put("treinador/" + treinador.treCodigo, treinador).then(response => {
            var treinadorAuxiliar = treinadoresData;
            treinadorAuxiliar.map(treinadorMap => {
                if (treinadorMap.aluCodigo === treinador.aluCodigo) {
                    treinadorMap.aluNome = treinador.aluNome;
                    treinadorMap.aluEmail = treinador.aluEmail;
                    treinadorMap.aluDataNasc = treinador.aluDataNasc;
                }
                return treinadorMap;
            });
            setTreinador(response.data);
            setUpdateTreinadores(true);
            abrirFecharEditarTreinadores();
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteTreinador = async () => {
        await Api.delete("treinador/" + treinador.treCodigo).then(response => {
            setUpdateTreinadores(true);
            abrirFecharExcluirTreinadores();
        }).catch(error => {
            console.log(error);
        });
    }

    const getTreinadorNome = async () => {
        await Api.get("treinador/" + nomeBusca.treNome).then(response => {
            setTreinadorData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const converterDataToIdade = (data) => {
        const today = new Date();

        var idade = data !== "" ? today.getFullYear() - data.substring(0, 4) : "-";
        const mes = data !== "" ? today.getMonth() - data.substring(5, 7) : "-";

        if (mes < 0 || (mes === 0 && today.getDate() < data.substring(8, 10))) {
            idade--;
        }

        return data !== "" ? idade : "-";
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

    const verificaSexo = (sexo) => {
        if (sexo === "M") {
            return "Masculino";
        } else if (sexo === "F") {
            return "Feminino";
        } else {
            return "Outro";
        }
    }

    return (
        <Mestre icon="user" title="Cadastro Treinadores" subtitle="Painel Sou+Fit">
            <div className="treinadores-container">
                <header>
                    <h3>Treinadores</h3>
                    <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroTreinadores()}><strong>+</strong> Adicionar Treinadores</button>
                </header>
                <hr />
                <form onSubmit={handleDefault}>
                    <div className="input-group rounded">
                        <input type="search" className="form-control rounded" name="aluNome" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={atualizaCampoBusca} />
                        <button className="botaoBusca" onClick={() => getTreinadorNome()} type="submit">
                            <span className="input-group-text border-0" id="search-addon">
                                <i className="fa fa-search"></i>
                            </span>
                        </button>
                    </div>
                </form>
                <br />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {/* <th>Id</th> */}
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Idade</th>
                            <th>Ativo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    {/* <div class="spinner-border m-5" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div> */}
                    <tbody>
                        {treinadoresData.map((treinador) => (
                            console.log(treinador),
                            <tr key={treinador.treCodigo}>
                                {/* <td>{treinador.treCodigo}</td> */}
                                <td className="pt-3">{treinador.treNome}</td>
                                <td className="pt-3">{treinador.treFone}</td>
                                <td className="pt-3"><div className="idade">{converterDataToIdade(treinador.aluDataNasc ?? "")}</div></td>
                                <td className="pt-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={treinador.treAtivo} />
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
                <hr />
                <br />
                <div className="w-100">
                    <div className="d-flex justify-content-center">
                        <div className="row">
                            <div className="col-4 paginacao">
                                <button className="btn btn-primary" onClick={() => alterarPagina("&lt;")}>&lt;</button>
                            </div>
                            <div className="col-4 pagina">
                                <p>{pagina}</p>
                            </div>
                            <div className="col-4 paginacao">
                                <button className="btn btn-primary" onClick={() => alterarPagina("&gt;")}>&gt;</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal isOpen={abrirCadastroTreinadores} className="modal-incluir">
                    <ModalHeader>Incluir Treinador</ModalHeader>
                    <ModalBody>
                        <form class="row g-3 form-group">
                            <div class="col-md-6">
                                <label for="inputName" class="form-label mb-0">Nome:</label>
                                <input type="text" class="form-control" placeholder="Nome Sobrenome"
                                    name="aluNome" onChange={atualizaCampo} />
                            </div>
                            <div class="col-md-3">
                                <label class="form-label mb-0">Data Nascimento:</label>
                                <input type="date" class="form-control"
                                    name="aluDataNasc" onChange={atualizaCampo} />
                            </div>
                            <div class="col-md-3">
                                <label class="form-label mb-0">Sexo:</label>
                                <select class="form-select w-100 h-50" >
                                    <option selected>Prefiro não informar</option>
                                    <option>Masculino</option>
                                    <option>Feminino</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="inputName" class="form-label mb-0 mt-2">Treinador:</label>
                                <select class="form-select w-100 h-50" >
                                    <option selected>Escolha um Treinador</option>
                                    <option>Roni</option>
                                </select>
                            </div>
                            <div class="col-6">
                                <label for="tel" class="form-label mb-0 mt-2">Telefone:</label>
                                <input type="tel" class="form-control" placeholder="(00) 00000-0000"
                                    name="aluFone" onChange={atualizaCampo} />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label mb-0 mt-2">Email:</label>
                                <input type="email" class="form-control" placeholder="exemplo@gmail.com"
                                    name="aluEmail" onChange={atualizaCampo} />
                            </div>
                            <div class="col-md-3">
                                <label for="inputPassword4" class="form-label mb-0 mt-2">Senha:</label>
                                <input type="password" class="form-control" placeholder="****"
                                    name="aluSenha" onChange={atualizaCampo} />
                            </div>
                            <div class="col-md-3">
                                <label for="inputPassword4" class="form-label mb-0 mt-2">Confirmar Senha:</label>
                                <input type="password" class="form-control" placeholder="****"
                                    name="aluNome" onChange={atualizaCampo} />
                            </div>
                            <div class="col-md-6">
                                <label for="inputName" class="form-label mb-0">Observação:</label>
                                <input type="text" class="form-control" placeholder="Obs."
                                    name="aluObs" onChange={atualizaCampo} />
                            </div>
                            <div class="col-2 mt-5">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="gridCheck"
                                        name="aluAtivo" onChange={atualizaCampo} />
                                    <label class="form-check-label" for="gridCheck">Ativo</label>
                                </div>
                            </div>
                            <div class="col-md-4 mt-5">
                                <label for="inputState" class="form-label mb-0">Imagem:</label>
                                <input type="image" alt="imagem" className="container border-dark" />
                            </div>
                        </form>
                        {/* <div className="form-group" name="titulo">
                            <label>Nome</label>
                            <br />
                            <input type="text" className="form-control" name="nome" onChange={atualizaCampo} />
                            <br />
                            <label>Email</label>
                            <br />
                            <input type="text" className="form-control" name="email" onChange={atualizaCampo} />
                            <br />
                            <label>Idade</label>
                            <br />
                            <input type="number" className="form-control" name="idade" onChange={atualizaCampo} />
                        </div> */}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" onClick={() => postTreinador()}>Salvar</button>{" "}
                        <button className="btn btn-danger" onClick={() => abrirFecharCadastroTreinadores()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={abrirEditarTreinadores} className="modal-editar">
                    <ModalHeader>Editar Treinador</ModalHeader>
                    <ModalBody>
                        <form class="row g-3 form-group">
                            <div className="col-md-12">
                                <label className="mb-0">Id: </label>
                                <input type="number" className="form-control mb-2" readOnly disabled
                                    value={treinador && treinador.aluCodigo} />
                            </div>
                            <div className="col-md-6">
                                <label for="inputName" class="form-label mb-0">Nome:</label>
                                <input type="text" class="form-control" placeholder="Nome Sobrenome"
                                    name="aluNome" onChange={atualizaCampo} value={treinador && treinador.aluNome} />
                            </div>
                            <div class="col-md-3">
                                <label class="form-label mb-0">Data Nascimento:</label>
                                <input type="date" class="form-control"
                                    name="aluDataNasc" onChange={atualizaCampo} value={treinador && treinador.aluDataNasc} />
                            </div>
                            <div class="col-md-3">
                                <label class="form-label mb-0">Sexo:</label>
                                <select class="form-select w-100 h-50" value={verificaSexo(treinador && treinador.aluSexo)} onChange={atualizaCampo}>
                                    <option></option>
                                    <option>Masculino</option>
                                    <option>Feminino</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="inputName" class="form-label mb-0 mt-2">Treinador:</label>
                                <select class="form-select w-100 h-50" >
                                    <option selected>Escolha um Treinador</option>
                                    <option>Roni</option>
                                </select>
                            </div>
                            <div class="col-6">
                                <label for="tel" class="form-label mb-0 mt-2">Telefone:</label>
                                <input type="tel" class="form-control" name="aluFone"
                                    onChange={atualizaCampo} value={treinador && treinador.aluFone} />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label mb-0 mt-2">Email:</label>
                                <input type="email" class="form-control" name="aluEmail"
                                    onChange={atualizaCampo} value={treinador && treinador.aluEmail} />
                            </div>
                            <div class="col-md-3">
                                <label for="inputPassword4" class="form-label mb-0 mt-2">Senha:</label>
                                <input type="password" class="form-control" name="aluSenha"
                                    onChange={atualizaCampo} value={treinador && treinador.aluSenha} />
                            </div>
                            <div class="col-md-3">
                                <label for="inputPassword4" class="form-label mb-0 mt-2">Confirmar Senha:</label>
                                <input type="password" class="form-control" name="aluNome"
                                    onChange={atualizaCampo} value={treinador && treinador.aluSenha} />
                            </div>
                            <div class="col-md-6">
                                <label for="inputName" class="form-label mb-0">Observação:</label>
                                <input type="text" class="form-control" name="aluObs"
                                    onChange={atualizaCampo} value={treinador && treinador.aluObs} />
                            </div>
                            <div class="col-2 mt-5">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="gridCheck"
                                        name="aluAtivo" onChange={atualizaCampo} checked={treinador && treinador.aluAtivo} />
                                    <label class="form-check-label" for="gridCheck">Ativo</label>
                                </div>
                            </div>
                            <div class="col-md-4 mt-5">
                                <label for="inputState" class="form-label mb-0">Imagem:</label>
                                <input type="image" alt="imagem" className="container border-dark" />
                            </div>
                        </form>
                        {/* <div className="form-group" name="titulo">
                            <label>Id: </label>
                            <br />
                            <input type="number" className="form-control" readOnly disabled
                                value={aluno && aluno.aluCodigo} />
                            <label>Nome: </label>
                            <br />
                            <input type="text" className="form-control" name="nome"
                                value={aluno && aluno.aluNome} onChange={atualizaCampo} />
                            <br />
                            <label>Email: </label>
                            <br />
                            <input type="text" className="form-control" name="email"
                                value={aluno && aluno.aluEmail} onChange={atualizaCampo} />
                            <br />
                            <label>Idade: </label>
                            <br />
                            <input type="number" className="form-control" name="idade"
                                value={aluno && aluno.aluDataNasc} onChange={atualizaCampo} />
                        </div> */}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" onClick={() => putTreinador()}>Salvar</button>{" "}
                        <button className="btn btn-danger" onClick={() => abrirFecharEditarTreinadores()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={abrirExcluirTreinadores}>
                    <ModalHeader>Excluir Treinador</ModalHeader>
                    <ModalBody>
                        Deseja excluir o Aluno : {treinador && treinador.aluNome}?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => deleteTreinador()}>Sim</button>
                        <button className="btn btn-secondary" onClick={() => abrirFecharExcluirTreinadores()}>Não</button>
                    </ModalFooter>
                </Modal>
            </div>
        </Mestre>
    )
}