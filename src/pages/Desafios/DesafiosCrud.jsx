import React, { useState, useEffect } from "react";

import Mestre from "../../layout/Mestre/Mestre";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import "react-datepicker/dist/react-datepicker.css";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Api from "../../services/Api";

import "./DesafiosCrud.css";

import FormInserir from "../../components/Crud/FormularioDesafio/FormInserir";

export default function DesafiosCrud() {

    const [carregando, setCarregando] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());
    const [dataFinal, setDataFinal] = useState(new Date());

    const [desafiosData, setDesafiosData] = useState([]);

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [desafioInitialState] = useState({
        desCodigo: 0,
        desNome: '',
        desDescricao: '',
        desDataInicio: new Date("01/01/1900"),
        desDataFim: new Date("01/01/1900"),
        desTipoDesafio: '',
        desMedidaDesafio: '',
        treCodigo: '',
        desImagem: '',
        desId: '',
        desExclusivoAluno: false,
        desDataInicioExibicao: new Date("01/01/1900"),
        tbAlunoDesafios: [],
        tbDesafioModalidades: [],
        treCodigoNavigation: null,
    });


    const [desafio, setDesafio] = useState({
        desCodigo: 0,
        desNome: '',
        desDescricao: '',
        desDataInicio: (dataAtual),
        desDataFim: (dataFinal),
        desTipoDesafio: '',
        desMedidaDesafio: '',
        treCodigo: '',
        desImagem: '',
        desId: '',
        desExclusivoAluno: false,
        desDataInicioExibicao: (dataAtual),
        tbAlunoDesafios: [],
        tbDesafioModalidades: [],
        treCodigoNavigation: null,
    });

    const [nomeBusca, setNomeBusca] = useState({
        desNome: ''
    });

    const [pagina, setPagina] = useState(1);

    const [abrirCadastroDesafios, setAbrirCadastroDesafios] = useState(false);
    const [abrirEditarDesafios, setAbrirEditarDesafios] = useState(false);
    const [abrirExcluirDesafios, setAbrirExcluirDesafios] = useState(false);
    const [updateDesafios, setUpdateDesafios] = useState(true);

    const abrirFecharCadastroDesafios = (abrirCadastroDesafios) => {
        setAbrirCadastroDesafios(!abrirCadastroDesafios);
        setDesafio(desafioInitialState);
    }

    const abrirFecharEditarDesafios = () => {
        setAbrirEditarDesafios(!abrirEditarDesafios);
    }

    const abrirFecharExcluirDesafios = () => {
        setAbrirExcluirDesafios(!abrirExcluirDesafios);
    }

    const selecionarDesafio = (desafio, opcao) => {
        setDesafio(desafio);
        (opcao === "Editar") ? abrirFecharEditarDesafios() : abrirFecharExcluirDesafios();
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        console.log(name, value);
        setDesafio({
            ...desafio,
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
        setDesafio({
            ...desafio,
            [name]: value === "true" ? true : false
        });
    }

    const dataFim = (date) => {
        setDataFinal(date);
        var data = new Date(date),
            month = '' + (data.getMonth() + 1),
            day = '' + (data.getDate() + 1),
            year = data.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        setDesafio({
            ...desafio,
            desDataFim: [year, month, day].join('-')
        });
    }

    const dataInicio = (date) => {
        setDataAtual(date);
        var data = new Date(date),
            month = '' + (data.getMonth() + 1),
            day = '' + (data.getDate() + 1),
            year = data.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        setDesafio({
            ...desafio,
            desDataInicio: [year, month, day].join('-')
        });
        return [day, month, year].join('-');
    }

    const dataInicioExibicao = (date) => {
        var data = new Date(date),
            month = '' + (data.getMonth() + 1),
            day = '' + (data.getDate() + 1),
            year = data.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('-');
    }

    const getDesafios = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`desafio?skip=${skip}`).then(response => {
            setDesafiosData(response.data);
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

    const postDesafio = async () => {
        await dataInicio(dataAtual);
        await Api.post("aluno/", desafio).then(response => {
            setDesafio(response.data);
            setUpdateDesafios(true);
            abrirFecharCadastroDesafios();
        }).catch(error => {
            console.log(error);
        });
        setDesafio(desafioInitialState);
    }

    const putDesafio = async () => {
        await dataInicio(dataAtual);
        await Api.put("aluno/" + desafio.desCodigo, desafio).then(response => {
            var desafiosAuxiliar = desafiosData;
            desafiosAuxiliar.map(desafioMap => {
                if (desafioMap.desCodigo === desafio.desCodigo) {
                    desafioMap.desNome = desafio.desNome;
                    desafioMap.desDataInicio = desafio.desDataInicio;
                    desafioMap.desDataFim = desafio.desDataFim;
                    desafioMap.desTipoDesafio = desafio.desTipoDesafio;
                    desafioMap.desMedidaDesafio = desafio.desMedidaDesafio;
                    desafioMap.treCodigo = desafio.treCodigo;
                    desafioMap.desImagem = desafio.desImagem;
                    desafioMap.desId = desafio.desId;
                    desafioMap.desExclusivoAluno = desafio.desExclusivoAluno;
                    desafioMap.desAtivo = desafio.desAtivo;
                }
                return desafioMap;
            });
            setDesafiosData(desafiosAuxiliar);
            setDesafio(response.data);
            setUpdateDesafios(true);
            abrirFecharEditarDesafios();
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteDesafio = async () => {
        await Api.delete("aluno/" + desafio.desCodigo).then(response => {
            setUpdateDesafios(true);
            abrirFecharExcluirDesafios();
        }).catch(error => {
            console.log(error);
        });
    }

    const getDesafioNome = async () => {
        setCarregando(true);
        await Api.get("aluno/" + nomeBusca.desNome).then(response => {
            setDesafiosData(response.data);
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
        if (updateDesafios) {
            getDesafios();
            setUpdateDesafios(false);
        }
    }, [updateDesafios]);

    useEffect(() => {
        getTreinadores();
    }, [setAbrirCadastroDesafios]);

    useEffect(() => {
        getTreinadorId(desafio.treCodigo);
    }, [setAbrirEditarDesafios]);

    function handleDefault(e) {
        e.preventDefault();
    }

    const alterarPagina = (e) => {
        e === "&gt;" ? pagina > desafiosData.length ? avancarPagina()
            : avancarPagina(pagina * 10)
            : voltarPagina(pagina * 10);
    }

    const avancarPagina = async (skip) => {
        getDesafios(skip);
        pagina > desafiosData.length ? setPagina(1) :
            setPagina(pagina + 1);
    }

    const voltarPagina = async (skip) => {
        skip = skip - 20;
        getDesafios(skip);
        pagina > 1 ? setPagina(pagina - 1) : setPagina(1);
    }

    const mascaraTelefone = (e) => {
        let input = e.target;
        input.value = phoneMask(input.value);
        setDesafio({ ...desafio, [e.target.name]: input.value });
    }

    const phoneMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{3})$/, "$1-$2")
        return value
    }

    return (
        <Mestre icon="user" title="Cadastro Desafios" subtitle="Painel Sou+Fit">
            <div className="alunos-container">
                <header>
                    <h3>Desafios</h3>
                    <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroDesafios()}><strong>+</strong> Adicionar Alunos</button>
                </header>
                <hr />
                <form onSubmit={handleDefault}>
                    <div className="input-group rounded">
                        <input type="search" className="form-control rounded" name="aluNome" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={atualizaCampoBusca} />
                        <button className="botaoBusca" onClick={() => getDesafioNome()} type="submit">
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
                                <th>Tipo Desafio</th>
                                <th>Data Inicio</th>
                                <th>Data Fim</th>
                                <th>Ativo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {desafiosData.map((desafio) => (
                                <tr key={desafio.desCodigo}>
                                    <td>{desafio.desCodigo}</td>
                                    <td>{desafio.desNome}</td>
                                    <td>{desafio.desTipoDesafio}</td>
                                    <td>{desafio.desDataInicio}</td>
                                    <td>{desafio.desDataFim}</td>
                                    <td>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" checked={desafio.aluAtivo} />
                                        </div>
                                    </td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => selecionarDesafio(desafio, "Editar")}>
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => selecionarDesafio(desafio, "Excluir")}>
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

                {/* <Modal isOpen={abrirCadastroDesafios} className="modal-incluir">
                    <ModalHeader>Incluir Aluno</ModalHeader>
                    <ModalBody>
                        <form className="row g-3 form-group">
                            <div className="col-md-6">
                                <label className="form-label mb-0">Nome:</label>
                                <input type="text" className="form-control" placeholder="Nome Sobrenome"
                                    name="aluNome" onChange={atualizaCampo} />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label mb-0">Data Início:</label>
                                <DatePicker
                                    className="form-control"
                                    name="aluDataNasc"
                                    selected={new Date(desafio.desDataInicio)}
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
                                <label className="form-label mb-0">Data Fim:</label>
                                <DatePicker
                                    className="form-control"
                                    name="aluDataNasc"
                                    selected={new Date(desafio.desDataFim)}
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
                        <button className="btn btn-success" type="submit" onClick={() => postDesafio()}>Salvar</button>{" "}
                        <button className="btn btn-danger" onClick={() => abrirFecharCadastroDesafios()}>Cancelar</button>
                    </ModalFooter>
                </Modal> */}

                <FormInserir 
                    abrir={abrirCadastroDesafios}
                    funcAbrir={abrirFecharCadastroDesafios}
                    funcPost={postDesafio}
                    funcAtualizaCampo={atualizaCampo}
                    funcAtualizaCampoAtivo={atualizaCampoAtivo}
                    funcDataInicio={dataInicio}
                    funcDataFim={dataFim}
                    funcMascaraTelefone={mascaraTelefone}
                    treinadoresData={treinadoresData}
                    desafio={desafio}
                />

                <Modal isOpen={abrirEditarDesafios} className="modal-editar">
                    <ModalHeader>Editar Aluno</ModalHeader>
                    <ModalBody>
                        <form className="row g-3 form-group">
                            <div className="col-md-12">
                                <label className="mb-0">Id: </label>
                                <input type="number" className="form-control mb-2" readOnly disabled
                                    value={desafio && desafio.aluCodigo}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mb-0">Nome:</label>
                                <input type="text" className="form-control" placeholder="Nome Sobrenome"
                                    name="aluNome"
                                    onChange={atualizaCampo}
                                    value={desafio && desafio.aluNome}
                                />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mb-0">Data Nascimento:</label>
                                <DatePicker
                                    className="form-control"
                                    name="aluDataNasc"
                                    selected={new Date(dataAtual)}
                                    onChange={date => dataInicio(date)}
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
                            {/* <div className="col-md-3">
                                <label className="form-label mb-0">Sexo:</label>
                                <select className="form-select w-100 h-50"
                                    name="aluSexo"
                                    value={desafio && desafio.aluSexo}
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
                            </div> */}
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
                                    value={desafio && desafio.aluFone}      
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mb-0 mt-2">Email:</label>
                                <input type="email" className="form-control" name="aluEmail"
                                    onChange={atualizaCampo} value={desafio && desafio.aluEmail} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mb-0 mt-2">Senha:</label>
                                <input type="password" className="form-control" name="aluSenha"
                                    onChange={atualizaCampo} value={desafio && desafio.aluSenha} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label mb-0 mt-2">Confirmar Senha:</label>
                                <input type="password" className="form-control" name="aluNome"
                                    onChange={atualizaCampo} value={desafio && desafio.aluSenha} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mb-0">Observação:</label>
                                <input type="text" className="form-control" name="aluObs"
                                    onChange={atualizaCampo} value={desafio && desafio.aluObs} />
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
                        <button className="btn btn-success" onClick={() => putDesafio()}>Salvar</button>{" "}
                        <button className="btn btn-danger" onClick={() => abrirFecharEditarDesafios()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={abrirExcluirDesafios}>
                    <ModalHeader>Excluir Aluno</ModalHeader>
                    <ModalBody>
                        Deseja excluir o Aluno : {desafio && desafio.aluNome}?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => deleteDesafio()}>Sim</button>
                        <button className="btn btn-secondary" onClick={() => abrirFecharExcluirDesafios()}>Não</button>
                    </ModalFooter>
                </Modal>
            </div>
        </Mestre >
    );
}