import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import Mestre from "../../layout/Mestre/Mestre";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";

import FormInserir from "../../components/Crud/FormularioEventos/FormInserir";
import FormEditar from "../../components/Crud/FormularioEventos/FormEditar";
import FormExcluir from "../../components/Crud/FormularioEventos/FormExcluir";

import "./EventosCrud.css";

export default function EventosCrud() {

    const [carregando, setCarregando] = useState(false);

    const [dataAtual, setDataAtual] = useState(new Date());

    const [eventosData, setEventosData] = useState([]);

    const [treinadoresData, setTreinadoresData] = useState([]);

    const [eventoInitialState] = useState({
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


    const [evento, setEvento] = useState({
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

    const [nomeBusca, setNomeBusca] = useState({
        aluNome: ''
    });

    const [pagina, setPagina] = useState(1);

    const [abrirCadastroEventos, setAbrirCadastroEventos] = useState(false);
    const [abrirEditarEventos, setAbrirEditarEventos] = useState(false);
    const [abrirExcluirEventos, setAbrirExcluirEventos] = useState(false);
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

    const mascaraTelefone = (e) => {
        let input = e.target;
        input.value = phoneMask(input.value);
        setEvento({ ...evento, [e.target.name]: input.value });
    }

    const phoneMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{4})$/, "$1-$2")
        return value
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
        setDataAtual(date);
        console.log(date);
        var data = new Date(date),
            month = '' + (data.getMonth() + 1),
            day = '' + (data.getDate() + 1),
            year = data.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        setEvento({
            ...evento,
            aluDataNasc: [year, month, day].join('-')
        });
        return [day, month, year].join('-');
    }

    // const converteMd5 = (senha) => {
    //     var md5 = require('md5');
    //     return md5(senha);
    // }


    const getEventos = async (skip = 0) => {
        setCarregando(true);
        await Api.get(`aluno?skip=${skip}`).then(response => {
            setEventosData(response.data);
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
            // setAluno(response.data);
            setUpdateEventos(true);
            // abrirFecharEditarAlunos();
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

    useEffect(() => {
        getTreinadores();
    }, [setAbrirCadastroEventos]);

    useEffect(() => {
        getTreinadorId(evento.treCodigo);
    }, [setAbrirEditarEventos]);

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
                    : 
                    <div></div>
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
                    nome={"Eventos"}
                    abrir={abrirCadastroEventos}
                    aluDados={evento}
                    funcPost={postEvento}
                    funcAbrir={abrirFecharCadastroEventos}
                    funcData={dataAuxiliar}
                    funcMascara={mascaraTelefone}
                    funcAtualizaCampoAtivo={atualizaCampoAtivo}
                    funcAtualizaCampo={atualizaCampo}
                    treinaData={treinadoresData}
                    funcBuscaTreinador={getTreinadorId}
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
                    funcMascara={mascaraTelefone}
                    funcAtualizaCampoAtivo={atualizaCampoAtivo}
                    funcAtualizaCampo={atualizaCampo}
                    treinaData={treinadoresData}
                    funcBuscaTreinador={getTreinadorId}
                />

                <FormExcluir
                    nome={"Eventos"}
                    abrir={abrirExcluirEventos}
                    aluNome={evento && evento.aluNome}
                    aluDados={evento.aluCodigo}
                    funcDelete={deleteEvento}
                    funcAbrir={abrirFecharExcluirAlunos}
                />
            </div>
        </Mestre >
    );
}