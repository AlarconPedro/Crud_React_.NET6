import React, { useState, useEffect } from "react";

import Mestre from "../../layout/Mestre/Mestre";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Api from "../../services/Api";

import "./AlunosCrud.css";

export default function FilmesCrud() {

    const [alunosData, setAlunosData] = useState([]);

    const [aluno, setAlunos] = useState({
        aluCodigo: '',
        aluNome: '',
        aluDataNasc: '',
        aluEmail: '',
        aluSenha: '',
        treCodigo: '',
        aluOneSignalId: '',
        aluImagem: '',
        aluId: '',
        aluFone: '',
        aluSexo: '',
        aluAtivo: '',
        aluObs: '',
        aluStravaCode: '',
        tbAlunoAtividades: '',
        tbAlunoDesafios: '',
        tbAlunoEventos: '',
        treCodigoNavigation: '',
    });

    const [nomeBusca, setNomeBusca] = useState({
        aluNome: ''
    });

    const [pagina, setPagina] = useState(1);

    const [abrirCadastroAlunos, setAbrirCadastroAlunos] = useState(false);
    const [abrirEditarAlunos, setAbrirEditarAlunos] = useState(false);
    const [abrirExcluirAlunos, setAbrirExcluirAlunos] = useState(false);
    const [updateAlunos, setUpdateAlunos] = useState(true);

    const abrirFecharCadastroAlunos = () => {
        setAbrirCadastroAlunos(!abrirCadastroAlunos);
    }

    const abrirFecharEditarAlunos = () => {
        setAbrirEditarAlunos(!abrirEditarAlunos);
    }

    const abrirFecharExcluirAlunos = () => {
        setAbrirExcluirAlunos(!abrirExcluirAlunos);
    }

    const selecionarAluno = (aluno, opcao) => {
        setAlunos(aluno);
        (opcao === "Editar") ? abrirFecharEditarAlunos() : abrirFecharExcluirAlunos();
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        setAlunos({
            ...aluno,
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

    const getAlunos = async () => {
        await Api.get("aluno").then(response => {
            setAlunosData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const postAluno = async () => {
        delete aluno.aluCodigo;
        // aluno.idade = parseInt(aluno.idade);
        await Api.post("aluno/", aluno).then(response => {
            setAlunos(response.data);
            setUpdateAlunos(true);
            abrirFecharCadastroAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const putAluno = async () => {
        // aluno.idade = parseInt(aluno.idade);
        await Api.put("aluno/" + aluno.aluCodigo, aluno).then(response => {
            var alunosAuxiliar = alunosData;
            alunosAuxiliar.map(alunoMap => {
                if (alunoMap.aluCodigo === aluno.aluCodigo) {
                    alunoMap.aluNome = aluno.aluNome;
                    alunoMap.aluEmail = aluno.aluEmail;
                    alunoMap.aluDataNasc = aluno.aluDataNasc;
                }
            });
            setAlunos(response.data);
            setUpdateAlunos(true);
            abrirFecharEditarAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteAluno = async () => {
        await Api.delete("aluno/" + aluno.aluCodigo).then(response => {
            setUpdateAlunos(true);
            abrirFecharExcluirAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const getAlunoNome = async () => {
        await Api.get("aluno/" + nomeBusca.aluNome).then(response => {
            setAlunosData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const converterDataToIdade = (data) => {
        const today = new Date();

        var idade = today.getFullYear() - data.substring(0, 4);
        const mes = today.getMonth() - data.substring(5, 7);

        if (mes < 0 || (mes === 0 && today.getDate() < data.substring(8, 10))) {
            idade--;
        }

        return idade;
    }

    useEffect(() => {
        if (updateAlunos) {
            getAlunos();
            setUpdateAlunos(false);
        }
    }, [updateAlunos]);

    function handleDefault(e) {
        e.preventDefault();
    }

    const alterarPagina = (e) => {
        e == "&gt;" ? alunosData.length / 10 < pagina ? setPagina(pagina + 1) :
            setPagina(1) : pagina > 1 ? setPagina(pagina - 1) : 
                setPagina(1);
    }

    return (
        <Mestre icon="user" title="Cadastro Alunos" subtitle="Painel Sou+Fit">
            <div className="alunos-container">
                <header>
                    <h3>Alunos</h3>
                    <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroAlunos()}><strong>+</strong> Adicionar Alunos</button>
                </header>
                <hr />
                <form onSubmit={handleDefault}>
                    <div className="input-group rounded">
                        <input type="search" className="form-control rounded" name="aluNome" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={atualizaCampoBusca} />
                        <button className="botaoBusca" onClick={() => getAlunoNome()} type="submit">
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
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Idade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunosData.map((aluno) => (
                            <tr key={aluno.aluCodigo}>
                                <td>{aluno.aluCodigo}</td>
                                <td>{aluno.aluNome}</td>
                                <td>{aluno.aluEmail}</td>
                                <td>{converterDataToIdade(aluno.aluDataNasc)}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => selecionarAluno(aluno, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => selecionarAluno(aluno, "Excluir")}>
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

                <Modal isOpen={abrirCadastroAlunos} className="modal-incluir">
                    <ModalHeader>Incluir Aluno</ModalHeader>
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
                                <input type="image" className="container border-dark" />
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
                        <button className="btn btn-success" onClick={() => postAluno()}>Salvar</button>{" "}
                        <button className="btn btn-danger" onClick={() => abrirFecharCadastroAlunos()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={abrirEditarAlunos}>
                    <ModalHeader>Editar Aluno</ModalHeader>
                    <ModalBody>
                        <div className="form-group" name="titulo">
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
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" onClick={() => putAluno()}>Salvar</button>{" "}
                        <button className="btn btn-danger" onClick={() => abrirFecharEditarAlunos()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={abrirExcluirAlunos}>
                    <ModalHeader>Excluir Aluno</ModalHeader>
                    <ModalBody>
                        Deseja excluir o Aluno : {aluno && aluno.aluNome}?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => deleteAluno()}>Sim</button>
                        <button className="btn btn-secondary" onClick={() => abrirFecharExcluirAlunos()}>Não</button>
                    </ModalFooter>
                </Modal>
            </div>
        </Mestre>
    );
}

// export default props => (
//     <Main icon="user" title="Filmes" subtitle="Painel Sou+Fit">
//         <div className="filmes-container ">
//             <header>
//                 <h3>Filmes</h3>
//                 <button className="btn btn-success" >+ Adicionar Filme</button>
//             </header>
//             <hr />
//             <div class="input-group rounded">
//                 <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
//                 <span class="input-group-text border-0" id="search-addon">
//                     <i class="fa fa-search"></i>
//                 </span>
//             </div>
//             <br />
//             <table className="table table-striped">
//                 <thead>
//                     <tr>
//                         <th>Id</th>
//                         <th>Nome</th>
//                         <th>Gênero</th>
//                         <th>Duração</th>
//                         <th>Ações</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>1</td>
//                         <td>Nome do Filme</td>
//                         <td>Gênero do Filme</td>
//                         <td>Duração do Filme</td>
//                         <td>
//                             <button className="btn btn-warning">
//                                 <i className="fa fa-pencil"></i>
//                             </button>{" "}
//                             <button className="btn btn-danger">
//                                 <i className="fa fa-trash"></i>
//                             </button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     </Main>
// );