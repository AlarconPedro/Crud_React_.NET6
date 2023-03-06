import React, { useState, useEffect } from "react";

import Mestre from "../../layout/Mestre/Mestre";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Api from "../../services/Api";

import "./AlunosCrud.css";

export default function FilmesCrud() {

    const [alunosData, setAlunosData] = useState([]);

    const [aluno, setAlunos] = useState({
        id: '',
        nome: '',
        email: '',
        idade: ''
    });

    const [nomeBusca, setNomeBusca] = useState({
        nome: ''
    });

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
        delete aluno.id;
        aluno.idade = parseInt(aluno.idade);
        await Api.post("aluno/", aluno).then(response => {
            setAlunos(response.data);
            setUpdateAlunos(true);
            abrirFecharCadastroAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const putAluno = async () => {
        aluno.idade = parseInt(aluno.idade);
        await Api.put("aluno/" + aluno.id, aluno).then(response => {
            var filmesAuxiliar = alunosData;
            filmesAuxiliar.map(filmeMap => {
                if (filmeMap.id === aluno.id) {
                    filmeMap.nome = aluno.nome;
                    filmeMap.email = aluno.email;
                    filmeMap.idade = aluno.idade;
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
        await Api.delete("aluno/" + aluno.id).then(response => {
            setUpdateAlunos(true);
            abrirFecharExcluirAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const getAlunoNome = async () => {
        await Api.get("aluno/" + nomeBusca.nome).then(response => {
            setAlunosData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (updateAlunos) {
            getAlunos();
            setUpdateAlunos(false);
        }
    }, [updateAlunos]);

    return (
        <Mestre icon="user" title="Cadastro Alunos" subtitle="Painel Sou+Fit">
            <div className="filmes-container ">
                <header>
                    <h3>Alunos</h3>
                    <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroAlunos()}><strong>+</strong> Adicionar Alunos</button>
                </header>
                <hr />
                <div className="input-group rounded">
                    <input type="search" className="form-control rounded" name="nome" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={atualizaCampoBusca} />
                    <button className="botaoBusca" onClick={() => getAlunoNome()}>
                        <span className="input-group-text border-0" id="search-addon">
                            <i className="fa fa-search"></i>
                        </span>
                    </button>
                </div>
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
                            <tr key={aluno.id}>
                                <td>{aluno.id}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.email}</td>
                                <td>{aluno.idade}</td>
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

                <Modal isOpen={abrirCadastroAlunos}>
                    <ModalHeader>Incluir Aluno</ModalHeader>
                    <ModalBody>
                        <div className="form-group" name="titulo">
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
                        </div>
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
                                value={aluno && aluno.id} />
                            <label>Nome: </label>
                            <br />
                            <input type="text" className="form-control" name="nome"
                                value={aluno && aluno.nome} onChange={atualizaCampo} />
                            <br />
                            <label>Email: </label>
                            <br />
                            <input type="text" className="form-control" name="email"
                                value={aluno && aluno.email} onChange={atualizaCampo} />
                            <br />
                            <label>Idade: </label>
                            <br />
                            <input type="number" className="form-control" name="idade"
                                value={aluno && aluno.idade} onChange={atualizaCampo} />
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
                        Deseja excluir o Aluno : {aluno && aluno.nome}?
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