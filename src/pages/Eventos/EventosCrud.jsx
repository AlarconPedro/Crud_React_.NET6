import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import Mestre from "../../layout/Mestre/Mestre";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";

import FormInserir from "../../components/Crud/FormularioEventos/FormInserir";
import FormEditar from "../../components/Crud/FormularioEventos/FormEditar";
import FormExcluir from "../../components/Crud/FormularioEventos/FormExcluir";

import { eventoUrl } from "../../services/Imagens";
import { BsJustify } from "react-icons/bs";

import "./EventosCrud.css";

export default function EventosCrud() {

    const [carregando, setCarregando] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());

    const [eventosData, setEventosData] = useState([]);

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [eventoInitialState] = useState({
        eveCodigo: 0,
        eveNome: '',
        eveDescricao: '',
        eveDataInicio: new Date("01/01/1900"),
        eveDataFim: new Date("01/01/1900"),
        eveImagem: '',
        eveId: '',
        treCodigo: 0,
        eveExclusivoAluno: false,
        eveDataInicioExibicao: new Date("01/01/1900"),
        tbAlunoEventos: [],
        treCodigoNavigation: null,
    });


    const [evento, setEvento] = useState({
        eveCodigo: 0,
        eveNome: '',
        eveDescricao: '',
        eveDataInicio: new Date("01/01/1900"),
        eveDataFim: new Date("01/01/1900"),
        eveImagem: '',
        eveId: '',
        treCodigo: 0,
        eveExclusivoAluno: false,
        eveDataInicioExibicao: new Date("01/01/1900"),
        tbAlunoEventos: [],
        treCodigoNavigation: null,
    });

    const [nomeBusca, setNomeBusca] = useState({
        aluNome: ''
    });

    const [pagina, setPagina] = useState(1);

    const [abrirCadastroEventos, setAbrirCadastroEventos] = useState(false);
    const [abrirEditarEventos, setAbrirEditarEventos] = useState(false);
    const [abrirExcluirEventos, setAbrirExcluirEventos] = useState(false);
    const [abrirParticipantes, setAbrirParticipantes] = useState(false);
    const [updateEventos, setUpdateEventos] = useState(true);

    const abrirFecharCadastroEventos = (abrirCadastroEventos) => {
        setAbrirCadastroEventos(!abrirCadastroEventos);
        setEvento(eventoInitialState);
    }

    const abrirFecharEditarEventos = (abrirEditarEventos) => {
        setAbrirEditarEventos(!abrirEditarEventos);
    }

    const abrirFecharExcluirAlunos = (abrirExcluirAlunos) => {
        setAbrirExcluirEventos(!abrirExcluirAlunos);
    }

    const abrirFecharParticipantes = (abrirParticipantes) => {
        setAbrirParticipantes(!abrirParticipantes);
    }

    const selecionarEvento = (evento, opcao) => {
        setEvento(evento);
        (opcao === "Editar") ? abrirFecharEditarEventos() : abrirFecharExcluirAlunos();
    }

    const atualizaCampo = e => {
        const { name, value } = e.target;
        setEvento({
            ...evento,
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
        setEvento({
            ...evento,
            [name]: value === "true" ? true : false
        });
    }

    const dataAuxiliar = (date) => {
        console.log(date);
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

    const getEventos = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`evento?skip=${skip}`).then(response => {
            setEventosData(response.data);
        }).catch(error => {
            console.log(error);
        });
        setCarregando(false);
    }

    const postEvento = async () => {
        await dataAuxiliar(dataAtual);
        await Api.post("aluno/", evento).then(response => {
            setEvento(response.data);
            setUpdateEventos(true);
            // abrirFecharCadastroAlunos();
        }).catch(error => {
            console.log(error);
        });
        setEvento(eventoInitialState);
    }

    const putEvento = async (codigo = evento.aluCodigo) => {
        await dataAuxiliar(dataAtual);
        await Api.put("aluno/" + codigo, evento).then(response => {
            var alunosAuxiliar = eventosData;
            alunosAuxiliar.map(alunoMap => {
                if (alunoMap.aluCodigo === evento.aluCodigo) {
                    alunoMap.aluNome = evento.aluNome;
                    alunoMap.aluDataNasc = evento.aluDataNasc;
                    alunoMap.aluEmail = evento.aluEmail;
                    alunoMap.aluSenha = evento.aluSenha;
                    alunoMap.treCodigo = evento.treCodigo;
                    alunoMap.aluOneSignalId = evento.aluOneSignalId;
                    alunoMap.aluImagem = evento.aluImagem;
                    alunoMap.aluId = evento.aluId;
                    alunoMap.aluFone = evento.aluFone;
                    alunoMap.aluSexo = evento.aluSexo;
                    alunoMap.aluAtivo = evento.aluAtivo;
                    alunoMap.aluObs = evento.aluObs;
                    alunoMap.aluStravaCode = evento.aluStravaCode;
                    alunoMap.aluStravaToken = evento.aluStravaToken;
                    alunoMap.aluStravaRefreshToken = evento.aluStravaRefreshToken;
                    alunoMap.aluStravaExpiresAt = evento.aluStravaExpiresAt;
                    alunoMap.aluStravaExpiresIn = evento.aluStravaExpiresIn;
                    alunoMap.aluStravaScope = evento.aluStravaScope;
                    alunoMap.aluStravaTokenType = evento.aluStravaTokenType;
                }
                return alunoMap;
            });
            setEventosData(alunosAuxiliar);
            setUpdateEventos(true);
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteEvento = async (aluno = aluno.aluCodigo) => {
        await Api.delete("aluno/" + aluno).then(response => {
            setUpdateEventos(true);
            // abrirFecharExcluirAlunos();
        }).catch(error => {
            console.log(error);
        });
    }

    const getAlunoNome = async () => {
        setCarregando(true);
        await Api.get("aluno/" + nomeBusca.aluNome).then(response => {
            setEventosData(response.data);
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
        if (updateEventos) {
            getEventos();
            setUpdateEventos(false);
        }
    }, [updateEventos]);

    function handleDefault(e) {
        e.preventDefault();
    }

    const alterarPagina = (e) => {
        e === "&gt;" ? pagina > eventosData.length ? avancarPagina()
            : avancarPagina(pagina * 10)
            : voltarPagina(pagina * 10);
    }

    const avancarPagina = async (skip) => {
        getEventos(skip);
        pagina > eventosData.length ? setPagina(1) :
            setPagina(pagina + 1);
    }

    const voltarPagina = async (skip) => {
        skip = skip - 20;
        getEventos(skip);
        pagina > 1 ? setPagina(pagina - 1) : setPagina(1);
    }

    return (
        <Mestre icon="bullhorn" title="Cadastro Eventos" subtitle="Painel Sou+Fit">
            <div className="alunos-container">
                <header>
                    <h3>Eventos</h3>
                    <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroEventos()}><strong>+</strong> Adicionar Eventos</button>
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
                                <th>Imagem</th>
                                <th>Nome</th>
                                <th className="pl-4">Inicio</th>
                                <th className="pl-4">Fim</th>
                                <th>Só Alunos</th>
                                <th>Qtd. Participantes</th>
                                <th>Participantes</th>
                                <th className="pl-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventosData.map((evento) => (
                                <tr key={evento.eveCodigo}>
                                    <td className="pt-3"><img src={eventoUrl + evento.eveImagem} alt="" /></td>
                                    <td className="pt-3">{evento.eveNome}</td>
                                    <td className="pt-3">{dataAuxiliar(evento.eveDataInicio)}</td>
                                    <td className="pt-3">{dataAuxiliar(evento.eveDataFim)}</td>
                                    <td className="pt-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" checked={evento.eveExclusivoAluno} value={true} />
                                        </div>
                                    </td>
                                    <td className="pt-3 pl-5">{evento.total}</td>
                                    <td className="pl-5 pt-3 listar" onClick={() => abrirFecharParticipantes()}><BsJustify /></td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => selecionarEvento(evento, "Editar")}>
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => selecionarEvento(evento, "Excluir")}>
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

                {/* <FormInserir
                    nome={"Eventos"}
                    abrir={abrirCadastroEventos}
                    aluDados={evento}
                    funcPost={postEvento}
                    funcAbrir={abrirFecharCadastroEventos}
                    funcData={dataAuxiliar}
                    funcAtualizaCampoAtivo={atualizaCampoAtivo}
                    funcAtualizaCampo={atualizaCampo}
                />

                <FormEditar
                    nome={"Eventos"}
                    abrir={abrirEditarEventos}
                    aluNome={evento && evento.aluNome}
                    aluDados={evento}
                    dataAtual={dataAtual}
                    funcPut={putEvento}
                    funcAbrir={abrirFecharEditarEventos}
                    funcData={dataAuxiliar}
                    funcAtualizaCampoAtivo={atualizaCampoAtivo}
                    funcAtualizaCampo={atualizaCampo}
                />

                <FormExcluir
                    nome={"Eventos"}
                    abrir={abrirExcluirEventos}
                    aluNome={evento && evento.aluNome}
                    aluDados={evento.aluCodigo}
                    funcDelete={deleteEvento}
                    funcAbrir={abrirFecharExcluirAlunos}
                /> */}
            </div>
        </Mestre >
    );
}