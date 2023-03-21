import React, { useState, useEffect } from "react";

import Mestre from "../../layout/Mestre/Mestre";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import "react-datepicker/dist/react-datepicker.css";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Api from "../../services/Api";

import "./AlunosCrud.css";

export default function AlunosCrud() {

    const [carregando, setCarregando] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());

    const [alunosData, setAlunosData] = useState([]);

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [alunoInitialState] = useState({
        aluCodigo: 0,
        aluNome: '',
        aluDataNasc: new Date("01/01/1900"),
        aluEmail: '',
        aluSenha: '',
        treCodigo: '',
        aluOneSignalId: null,
        aluImagem: '',
        aluId: '',
        aluFone: '',
        aluSexo: '',
        aluAtivo: true,
        aluObs: '',
        aluStravaCode: null,
        tbAlunoAtividades: [],
        tbAlunoDesafios: [],
        tbAlunoEventos: [],
        treCodigoNavigation: null,
    });


    const [aluno, setAluno] = useState({
        aluCodigo: 0,
        aluNome: '',
        aluDataNasc: new Date(dataAtual),
        aluEmail: '',
        aluSenha: '',
        treCodigo: '',
        aluOneSignalId: null,
        aluImagem: '',
        aluId: '',
        aluFone: '',
        aluSexo: '',
        aluAtivo: true,
        aluObs: '',
        aluStravaCode: null,
        tbAlunoAtividades: [],
        tbAlunoDesafios: [],
        tbAlunoEventos: [],
        treCodigoNavigation: null,
    });

    const sexo = [
        { id: "M", nome: 'Masculino' },
        { id: "F", nome: 'Feminino' },
    ];

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
        setAluno(alunoInitialState);
    }

    const abrirFecharEditarAlunos = () => {
        setAbrirEditarAlunos(!abrirEditarAlunos);
    }

    const abrirFecharExcluirAlunos = () => {
        setAbrirExcluirAlunos(!abrirExcluirAlunos);
    }

    const selecionarAluno = (aluno, opcao) => {
        setAluno(aluno);
        (opcao === "Editar") ? abrirFecharEditarAlunos() : abrirFecharExcluirAlunos();
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        console.log(name, value);
        setAluno({
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

    const atualizaCampoAtivo = e => {
        const { name, value } = e.target;
        setAluno({
            ...aluno,
            [name]: value === "true" ? true : false
        });
    }

    const dataAuxiliar = (date) => {
        setDataAtual(date);
        var data = new Date(date),
            month = '' + (data.getMonth() + 1),
            day = '' + (data.getDate() + 1),
            year = data.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        setAluno({
            ...aluno,
            aluDataNasc: [year, month, day].join('-')
        });
        return [day, month, year].join('-');
    }

    // const converteMd5 = (senha) => {
    //     var md5 = require('md5');
    //     return md5(senha);
    // }


    const getAlunos = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`aluno?skip=${skip}`).then(response => {
            setAlunosData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
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

    const postAluno = async () => {
        await dataAuxiliar(dataAtual);
        await Api.post("aluno/", aluno).then(response => {
            setAluno(response.data);
            setUpdateAlunos(true);
            abrirFecharCadastroAlunos();
        }).catch(error => {
            console.log(error);
        });
        setAluno(alunoInitialState);
    }

    const putAluno = async () => {
        await dataAuxiliar(dataAtual);
        await Api.put("aluno/" + aluno.aluCodigo, aluno).then(response => {
            var alunosAuxiliar = alunosData;
            alunosAuxiliar.map(alunoMap => {
                if (alunoMap.aluCodigo === aluno.aluCodigo) {
                    alunoMap.aluNome = aluno.aluNome;
                    alunoMap.aluDataNasc = aluno.aluDataNasc;
                    alunoMap.aluEmail = aluno.aluEmail;
                    alunoMap.aluSenha = aluno.aluSenha;
                    alunoMap.treCodigo = aluno.treCodigo;
                    alunoMap.aluOneSignalId = aluno.aluOneSignalId;
                    alunoMap.aluImagem = aluno.aluImagem;
                    alunoMap.aluId = aluno.aluId;
                    alunoMap.aluFone = aluno.aluFone;
                    alunoMap.aluSexo = aluno.aluSexo;
                    alunoMap.aluAtivo = aluno.aluAtivo;
                    alunoMap.aluObs = aluno.aluObs;
                    alunoMap.aluStravaCode = aluno.aluStravaCode;
                    alunoMap.aluStravaToken = aluno.aluStravaToken;
                    alunoMap.aluStravaRefreshToken = aluno.aluStravaRefreshToken;
                    alunoMap.aluStravaExpiresAt = aluno.aluStravaExpiresAt;
                    alunoMap.aluStravaExpiresIn = aluno.aluStravaExpiresIn;
                    alunoMap.aluStravaScope = aluno.aluStravaScope;
                    alunoMap.aluStravaTokenType = aluno.aluStravaTokenType;
                }
                return alunoMap;
            });
            setAlunosData(alunosAuxiliar);
            setAluno(response.data);
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
        setCarregando(true);
        await Api.get("aluno/" + nomeBusca.aluNome).then(response => {
            setAlunosData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
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
        if (updateAlunos) {
            getAlunos();
            setUpdateAlunos(false);
        }
    }, [updateAlunos]);

    useEffect(() => {
        getTreinadores();
    }, [setAbrirCadastroAlunos]);

    useEffect(() => {
        getTreinadorId(aluno.treCodigo);
    }, [setAbrirEditarAlunos]);

    function handleDefault(e) {
        e.preventDefault();
    }

    const alterarPagina = (e) => {
        e === "&gt;" ? pagina > alunosData.length ? avancarPagina()
            : avancarPagina(pagina * 10)
            : voltarPagina(pagina * 10);
    }

    const avancarPagina = async (skip) => {
        getAlunos(skip);
        pagina > alunosData.length ? setPagina(1) :
            setPagina(pagina + 1);
    }

    const voltarPagina = async (skip) => {
        skip = skip - 20;
        getAlunos(skip);
        pagina > 1 ? setPagina(pagina - 1) : setPagina(1);
    }

    const mascaraTelefone = (e) => {
        let input = e.target;
        input.value = phoneMask(input.value);
        setAluno({ ...aluno, [e.target.name]: input.value });
    }

    const phoneMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{3})$/, "$1-$2")
        return value
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
                {carregando ? <div className="spinner-border loader" role="status">
                </div>
                    : <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Idade</th>
                                <th>Ativo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunosData.map((aluno) => (
                                <tr key={aluno.aluCodigo}>
                                    <td>{aluno.aluCodigo}</td>
                                    <td>{aluno.aluNome}</td>
                                    <td>{aluno.aluFone}</td>
                                    <td><div className="idade">{converterDataToIdade(aluno.aluDataNasc ?? "")}</div></td>
                                    <td>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" checked={aluno.aluAtivo} />
                                        </div>
                                    </td>
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
                {/* <div className="w-100">
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
                </div> */}

                <Modal isOpen={abrirCadastroAlunos} className="modal-incluir">
                    <ModalHeader>Incluir Aluno</ModalHeader>
                    <ModalBody>
                        <form className="row g-3 form-group">
                            <div className="col-md-6">
                                <label className="form-label mb-0">Nome:</label>
                                <input type="text" className="form-control" placeholder="Nome Sobrenome"
                                    name="aluNome" onChange={atualizaCampo} />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label mb-0">Data Nascimento:</label>
                                <DatePicker
                                    className="form-control"
                                    name="aluDataNasc"
                                    selected={new Date(aluno.aluDataNasc)}
                                    onChange={date => dataAuxiliar(date)}
                                    dateFormat={"dd/MM/yyyy"}
                                    timeFormat="yyyy-MM-dd"
                                    customInput={
                                        <InputMask
                                            type="text"
                                            mask="99/99/9999"
                                        />
                                    }
                                />
                                {/* <input type="date" className="form-control"
                                    name="aluDataNasc" onChange={atualizaCampo} /> */}
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mb-0">Sexo:</label>
                                <select className="form-select w-100 h-50"
                                    name="aluSexo" onChange={atualizaCampo}>
                                    <option value=""></option>
                                    {
                                        sexo.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.nome}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mb-0 mt-2">Treinador:</label>
                                <select className="form-select w-100 h-50"
                                    name="treCodigo"
                                    onChange={atualizaCampo}>
                                    <option value=""></option>
                                    {
                                        treinadoresData.map((item, index) => {
                                            return (
                                                <option key={index} value={item.treCodigo}>{item.treNome}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-6">
                                <label className="form-label mb-0 mt-2">Telefone:</label>
                                <input type="tel" className="form-control" placeholder="(00) 00000-0000" maxLength={15}
                                    name="aluFone"
                                    onChange={mascaraTelefone}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mb-0 mt-2">Email:</label>
                                <input type="email" className="form-control" placeholder="exemplo@gmail.com"
                                    name="aluEmail" onChange={atualizaCampo} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mb-0 mt-2">Senha:</label>
                                <input type="password" className="form-control" placeholder="****"
                                    name="aluSenha" onChange={atualizaCampo} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mb-0 mt-2">Confirmar Senha:</label>
                                <input type="password" className="form-control" placeholder="****"
                                    name="aluSenha" onChange={atualizaCampo} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mb-0">Observação:</label>
                                <input type="text" className="form-control" placeholder="Obs."
                                    name="aluObs" onChange={atualizaCampo} />
                            </div>
                            <div className="col-2 mt-5">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck"
                                        name="aluAtivo"
                                        onChange={atualizaCampoAtivo}
                                        value={true} />
                                    <label className="form-check-label">Ativo</label>
                                </div>
                            </div>
                            <div className="col-md-4 mt-5">
                                <label className="form-label mb-0">Imagem:</label>
                                <input type="image" alt="imagem" className="container border-dark" />
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-success" type="submit" onClick={() => postAluno()}>Salvar</button>{" "}
                        <button className="btn btn-danger" onClick={() => abrirFecharCadastroAlunos()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={abrirEditarAlunos} className="modal-editar">
                    <ModalHeader>Editar Aluno</ModalHeader>
                    <ModalBody>
                        <form className="row g-3 form-group">
                            <div className="col-md-12">
                                <label className="mb-0">Id: </label>
                                <input type="number" className="form-control mb-2" readOnly disabled
                                    value={aluno && aluno.aluCodigo}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mb-0">Nome:</label>
                                <input type="text" className="form-control" placeholder="Nome Sobrenome"
                                    name="aluNome"
                                    onChange={atualizaCampo}
                                    value={aluno && aluno.aluNome}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mb-0">Data Nascimento:</label>
                                <DatePicker
                                    className="form-control"
                                    name="aluDataNasc"
                                    selected={new Date(dataAtual)}
                                    onChange={date => dataAuxiliar(date)}
                                    dateFormat={"dd/MM/yyyy"}
                                    timeFormat="yyyy-MM-dd"
                                    customInput={
                                        <InputMask
                                            type="text"
                                            mask="99/99/9999"
                                        />
                                    }
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mb-0">Sexo:</label>
                                <select className="form-select w-100 h-50"
                                    name="aluSexo"
                                    value={aluno && aluno.aluSexo}
                                    onChange={atualizaCampo}>
                                    <option value=""></option>
                                    {
                                        sexo.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.nome}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mb-0 mt-2">Treinador:</label>
                                <select className="form-select w-100 h-50"
                                    name="treCodigo"
                                    selected={treinadoresData}
                                    onChange={atualizaCampo}>
                                    {
                                        treinadoresData.map((item, index) => {
                                            return (
                                                <option key={item.treCodigo} value={item.treCodigo}>{item.treNome}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-6">
                                <label className="form-label mb-0 mt-2">Telefone:</label>
                                <input type="tel" class="form-control" maxLength={15}
                                    name="aluFone"
                                    onKeyDown={mascaraTelefone}
                                    onChange={atualizaCampo}
                                    value={aluno && aluno.aluFone}      
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mb-0 mt-2">Email:</label>
                                <input type="email" className="form-control" name="aluEmail"
                                    onChange={atualizaCampo} value={aluno && aluno.aluEmail} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mb-0 mt-2">Senha:</label>
                                <input type="password" className="form-control" name="aluSenha"
                                    onChange={atualizaCampo} value={aluno && aluno.aluSenha} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mb-0 mt-2">Confirmar Senha:</label>
                                <input type="password" className="form-control" name="aluNome"
                                    onChange={atualizaCampo} value={aluno && aluno.aluSenha} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mb-0">Observação:</label>
                                <input type="text" className="form-control" name="aluObs"
                                    onChange={atualizaCampo} value={aluno && aluno.aluObs} />
                            </div>
                            <div className="col-2 mt-5">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck"
                                        name="aluAtivo"
                                        onChange={atualizaCampoAtivo}
                                        value={true}
                                    />
                                    <label className="form-check-label">Ativo</label>
                                </div>
                            </div>
                            <div className="col-md-4 mt-5">
                                <label className="form-label mb-0">Imagem:</label>
                                <input type="image" alt="imagem" className="container border-dark" />
                            </div>
                        </form>
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
        </Mestre >
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