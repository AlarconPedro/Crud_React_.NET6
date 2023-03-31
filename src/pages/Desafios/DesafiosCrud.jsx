import React, { useState, useEffect } from "react";

import Mestre from "../../layout/Mestre/Mestre";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import "react-datepicker/dist/react-datepicker.css";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Api from "../../services/Api";
import { desafioUrl } from "../../services/Imagens";

import { BsJustify } from "react-icons/bs";

import "./DesafiosCrud.css";

import FormInserir from "../../components/Crud/FormularioDesafio/FormInserir";
import FormEditar from "../../components/Crud/FormularioDesafio/FormEditar";
import FormExcluir from "../../components/Crud/FormularioDesafio/FormExcluir";
import FormParticipantes from "../../components/Crud/FormularioDesafio/FormParticipantes";

export default function DesafiosCrud() {

    const [carregando, setCarregando] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());
    const [dataFinal, setDataFinal] = useState(new Date());

    const [desafiosData, setDesafiosData] = useState([]);

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [modalidadeData, setModalidadeData] = useState([]);

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
    const [abrirParticipantes, setAbrirParticipantes] = useState(false);
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

    const abrirFecharParticipantes = (abrirParticipantes) => {
        setAbrirParticipantes(!abrirParticipantes);
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

        return [day, month, year].join('/');
    }

    const getModalidades = async () => {
        await Api.get("modalidade").then(response => {
            setModalidadeData(response.data);
        }).catch(error => {
            console.log(error);
        });
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

    useEffect(() => {
        getModalidades();
    }, [setAbrirCadastroDesafios]);  

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
        <Mestre icon="trophy" title="Cadastro Desafios" subtitle="Painel Sou+Fit">
            <div className="desafio-container">
                <header>
                    <h3>Desafios</h3>
                    <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroDesafios()}><strong>+</strong> Adicionar Desafios</button>
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
                                <th>Avatar</th>
                                <th>Nome</th>
                                {/* <th>Tipo</th> */}
                                <th>Data Inicio</th>
                                <th>Data Fim</th>
                                <th>Qtd. Participantes</th>
                                <th>Participantes</th>
                                {/* <th>Disp. Aluno</th> */}
                                {/* <th>Disponível a partir</th> */}
                                <th className="pl-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {desafiosData.map((desafio) => (
                                <tr key={desafio.desCodigo}>
                                    <td className="pt-3"><img src={desafioUrl + desafio.desImagem} alt="" /></td>
                                    <td className="pt-3">{desafio.desNome}</td>
                                    {/* <td className="pl-4">{desafio.desTipoDesafio}</td> */}
                                    <td className="pt-3">{dataInicioExibicao(desafio.desDataInicio)}</td>
                                    <td className="pt-3">{dataInicioExibicao(desafio.desDataFim)}</td>
                                    <td className="pt-3">{2}</td>
                                    <td className="pl-5 pt-3 listarParticipantes" onClick={() => abrirFecharParticipantes()}><BsJustify/></td>
                                    {/* <td className="pl-5">
                                        <div className="form-check">
                                            <input className="form-check-input"  type="checkbox" checked={desafio.desExclusivoAluno} />
                                        </div>
                                    </td> */}
                                    {/* <td className="pl-5">{dataInicioExibicao(desafio.desDataInicioExibicao)}</td> */}
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

                <FormParticipantes
                    abrir={abrirParticipantes}
                    funcAbrir={abrirFecharParticipantes}
                />

                <FormInserir 
                    abrir={abrirCadastroDesafios}
                    funcAbrir={abrirFecharCadastroDesafios}
                    funcPost={postDesafio}
                    modalidades={modalidadeData}
                    funcAtualizaCampo={atualizaCampo}
                    funcAtualizaCampoAtivo={atualizaCampoAtivo}
                    funcDataInicio={dataInicio}
                    funcDataFim={dataFim}
                    funcMascaraTelefone={mascaraTelefone}
                    treinadoresData={treinadoresData}
                    desafio={desafio}
                />

                <FormEditar 
                    abrir={abrirEditarDesafios}
                    funcAbrir={abrirFecharEditarDesafios}
                    funcPut={putDesafio}
                    modalidades={modalidadeData}
                    funcAtualizaCampo={atualizaCampo}
                    funcAtualizaCampoAtivo={atualizaCampoAtivo}
                    funcDataInicio={dataInicio}
                    funcDataFim={dataFim}
                    funcMascaraTelefone={mascaraTelefone}
                    treinadoresData={treinadoresData}   
                    desafio={desafio}
                />

                <FormExcluir 
                    abrir={abrirExcluirDesafios}
                    funcAbrir={abrirFecharExcluirDesafios}
                    funcDelete={deleteDesafio}
                    desafio={desafio}
                />
            </div>
        </Mestre >
    );
}