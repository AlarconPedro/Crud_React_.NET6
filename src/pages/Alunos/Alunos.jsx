import React from "react";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";
import { alunoUrl, treinadorUrl, alunoImagemUrl, atividadeUrl } from "../../services/RotasApi";

import FormInserir from "../../Forms/FormInserir";
import FormEditar from "../../Forms/FormEditar";
import FormExcluir from "../../Forms/FormExcluir";
import Modelo from "../../Forms/Modelo";

import { BsJustify } from "react-icons/bs";

import { Link } from "react-router-dom";

import ConverteData from "../../Funcoes/ConverteData";
import MascaraTelefone from "../../Funcoes/MascaraTelefone";

import ComponenteData from "../../Layout/Componentes/ComponenteData";
import ComponenteText from "../../Layout/Componentes/ComponenteText";
import ComponenteAtivo from "../../Layout/Componentes/ComponenteAtivo";
import ComponenteImagem from "../../Layout/Componentes/ComponenteImagem";
import ComponenteComboBox from "../../Layout/Componentes/ComponenteComboBox";

import "./Alunos.css";
import { alunoUrlImagem } from "../../services/Imagens";

class Aluno extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrir: false,
            abrirAtividades: false,
            abrirCadastro: false,
            abrirEditar: false,
            abrirExcluir: false,
            carregando: false,
            updateAlunos: false,
            alunosData: [],
            treinadoresData: [],
            imagemUpload: null,
            sexo: [
                { id: "M", nome: 'Masculino' },
                { id: "F", nome: 'Feminino' },
            ],
            alunoInitialState: {
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
                aluAtivo: false,
                aluObs: '',
                aluStravaCode: null,
                tbAlunoAtividades: [],
                tbAlunoDesafios: [],
                tbAlunoEventos: [],
                treCodigoNavigation: null,
            },
            aluno: {
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
                aluAtivo: false,
                aluObs: '',
                aluStravaCode: null,
                tbAlunoAtividades: [],
                tbAlunoDesafios: [],
                tbAlunoEventos: [],
                treCodigoNavigation: null,
            }
        }
    }

    abrirFecharCadastro = () => {
        this.setState({ abrirCadastro: !this.state.abrirCadastro });
        this.setState({ aluno: this.state.alunoInitialState });
        this.getTreinadores();
    }

    abrirFecharAtividades = (abrirAtividades) => {
        this.setState({ abrirAtividades: !abrirAtividades });
    }

    abrirFecharEditar = (abrirEditar) => {
        this.setState({ abrirEditar: !abrirEditar || !this.state.abrirEditar });
    }

    abrirFecharExcluir = (abrirExcluir) => {
        this.setState({ abrirExcluir: !this.state.abrirExcluir });
    }

    converterDataToIdade = (data) => {
        const today = new Date();

        var idade = data !== "" ? today.getFullYear() - data.substring(0, 4) : "-";
        const mes = data !== "" ? today.getMonth() - data.substring(5, 7) : "-";

        if (mes < 0 || (mes === 0 && today.getDate() < data.substring(8, 10))) {
            idade--;
        }

        return data !== "" ? idade : "-";
    }

    selecionarAluno = (aluno, opcao) => {
        this.setState({ aluno: aluno });
        if (opcao === "Atividades") {
            this.abrirFecharAtividades();
        } else if (opcao === "Editar") {
            this.abrirFecharEditar();
            this.getAlunoId(aluno.aluCodigo);
            this.getTreinadores();
        } else {
            this.abrirFecharExcluir();
        }
    }

    selecionarImagem = (imagem) => {
        const imgUpload = imagem;
        this.setState({ imagemUpload: imgUpload });
    }

    getAlunos = async (skip = 0) => {
        this.setState({ carregando: true });
        await Api.get(`${alunoUrl}?skip=${skip}`).then(response => {
            this.setState({ alunosData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getAlunoId = async (id) => {
        this.setState({ carregando: true });
        await Api.get(`${alunoUrl}${id}`).then(response => {
            this.setState({ aluno: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getAlunoNome = async (busca) => {
        this.setState({ carregando: true });
        await Api.get(alunoUrl + busca).then(response => {
            this.setState({ alunosData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getTreinadores = async () => {
        this.setState({ carregando: true });
        await Api.get(`${treinadorUrl}treinadores`).then(response => {
            this.setState({ treinadoresData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getTreinadorId = async (id) => {
        this.setState({ carregando: true });
        await Api.get(`${treinadorUrl}${id}`).then(response => {
            this.setState({ treinadoresData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    postDados = async () => {
        var retornoCaminho = await this.postImagemAluno();
        await this.postAluno(retornoCaminho);
    }

    postAluno = async (caminho) => {
        this.state.aluno.aluImagem = caminho;
        await Api.post(alunoUrl, this.state.aluno).then(response => {
            this.setState({ aluno: response.data });
            this.setState({ updateAlunos: true });
            this.abrirFecharCadastro();
        }).catch(error => {
            console.log(error);
        });
        this.setState({ aluno: this.state.alunoInitialState });
    }

    postImagemAluno = async () => {
        var imgUpload = null;
        await Api.post(alunoImagemUrl, this.state.imagemUpload).then(response => {
            if (response.status == 200) {
                imgUpload = response.data;
            } else {
                console.log("Erro ao salvar imagem");
            }
        });
        return imgUpload;
    }

    updateDados = async () => {
        var retornoCaminho = await this.postImagemAluno();
        await this.putAluno(retornoCaminho);
    }

    putAluno = async (caminho) => {
        this.state.aluno.aluImagem = caminho;
        var data = await ConverteData(this.state.aluno.aluDataNasc);
        this.setState({ aluno: { ...this.state.aluno, aluDataNasc: data } });
        await Api.put(alunoUrl + this.state.aluno.aluCodigo, this.state.aluno).then(response => {
            this.setState({ updateAlunos: true });
            this.abrirFecharEditar();
        }).catch(error => {
            console.log(error);
        });
        this.setState({ aluno: this.state.alunoInitialState });
        this.setState({ updateAlunos: true })
    }

    deleteAluno = async () => {
        await Api.delete(alunoUrl + this.state.aluno.aluCodigo).then(response => {
            this.setState({ updateAlunos: true });
            this.abrirFecharExcluir();
        }).catch(error => {
            console.log(error);
        });
        this.setState({ aluno: this.state.alunoInitialState });
    }

    atualizaCampo = (e) => {
        const { name, value } = e.target;
        this.setState({ aluno: { ...this.state.aluno, [name]: value } });
    }

    atualizaCampoAtivo = (e) => {
        this.setState({ aluno: { ...this.state.aluno, aluAtivo: e.target.checked } });
    }

    atualizaCampoData = e => {
        this.setState({ aluno: { ...this.state.aluno, aluDataNasc: e } });
    }

    adicionarMascara = e => {
        this.setState({ aluno: { ...this.state.aluno, [e.target.name]: MascaraTelefone(e) } });
    }

    componentDidMount() {
        this.setState({ carregando: false });
        this.getAlunos();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.alunosData !== this.state.alunosData) {
            this.setState({ carregando: false });
        }
        if (prevState.aluno !== this.state.aluno) {
            this.setState({ carregando: false });
        }
        if (prevState.updateAlunos !== this.state.updateAlunos) {
            this.getAlunos();
            this.setState({ updateAlunos: false });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Modelo
                    urlApi={`${atividadeUrl}}?skip=`}
                    titulo="Cadastro Alunos"
                    subtitulo="Painel Sou+Fit"
                    icone="user"
                    tipoContainer="form-container"
                    Cabecalho="Alunos"
                    BotaoAdd="Adicionar Alunos"
                    dadosApi={this.state.alunosData}
                    getDados={this.getAlunos}
                    getByNome={this.getAlunoNome}
                    funcAbrirCadastro={this.abrirFecharCadastro}
                    colunas={[
                        { nome: "Avatar" },
                        { nome: "Nome" },
                        { nome: "Telefone" },
                        { nome: "Idade" },
                        { nome: "Ativo" },
                        { nome: "Atividades" },
                    ]}
                >
                    {this.state.carregando ? <div className="spinner-border loader" role="status" />
                        :
                        <tbody>
                            {this.state.alunosData.map((aluno) => (
                                <tr key={aluno.aluCodigo}>
                                    <td className=""><img src={alunoUrlImagem + aluno.aluImagem} alt="" /></td>
                                    {/* <td className=""><img src={"D:/Desenvolvimento/C%23/API%20Alunos/API%20Alunos/" + aluno.aluImagem} alt="" /></td> */}
                                    <td className="pt-3">{aluno.aluNome}</td>
                                    <td className="pt-3">{aluno.aluFone}</td>
                                    <td className="pt-3"><div className="idade">{this.converterDataToIdade(aluno.aluDataNasc ?? "")}</div></td>
                                    <td className="pt-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" checked={aluno.aluAtivo} value={true} />
                                        </div>
                                    </td>
                                    <Link className="text-decoration-none" to={"/atividades"} state={{ codigo: (aluno.aluCodigo) }}>
                                        <td className="pl-5 pt-3 listar" onClick={() => this.selecionarAluno(aluno, "Atividades")}><BsJustify /></td>
                                    </Link>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => this.selecionarAluno(aluno, "Editar")}>
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => this.selecionarAluno(aluno, "Excluir")}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </Modelo>

                <FormInserir
                    nome={"Aluno"}
                    abrir={this.state.abrirCadastro}
                    funcAbrir={this.abrirFecharCadastro}
                    // funcPost={this.postAluno}
                    funcPost={this.postDados}
                >
                    <form className="row g-3 form-group">
                        <ComponenteText
                            tamanho="col-md-6"
                            label="Nome:"
                            name="aluNome"
                            type="text"
                            placeholder="Nome Sobrenome"
                            onChange={(e) => this.atualizaCampo(e)}
                        />
                        <ComponenteData
                            tamanho="col-md-3"
                            label="Data Nascimento:"
                            name="aluDataNasc"
                            value={this.state.aluno.aluDataNasc}
                            selected={new Date(this.state.aluno.aluDataNasc)}
                            selecionaData={this.atualizaCampoData}
                        />
                        <ComponenteComboBox
                            tamanho="col-md-3"
                            label="Sexo:"
                            name="aluSexo"
                            onChange={this.atualizaCampo}
                            value={this.state.aluno.aluSexo}
                            options={this.state.sexo}
                        />
                        <ComponenteComboBox
                            tamanho="col-md-6"
                            label="Treinador:"
                            name="treCodigo"
                            onChange={this.atualizaCampo}
                            value={this.state.aluno.treCodigo}
                            options={this.state.treinadoresData}
                            optionNome="treNome"
                        />
                        <ComponenteText
                            tamanho="col-6"
                            label="Telefone:"
                            name="aluFone"
                            placeholder="(00) 00000-0000"
                            maxLength="15"
                            type="tel"
                            selected={this.state.aluno.aluPeso}
                            onChange={(e) => this.atualizaCampo(e)}
                            adicionarMascara={this.adicionarMascara}
                        />
                        <ComponenteText
                            tamanho="col-md-6"
                            label="Email:"
                            name="aluEmail"
                            type="email"
                            placeholder="exemplo@gmail.com"
                            onChange={(e) => this.atualizaCampo(e)}
                        />
                        <ComponenteText
                            tamanho="col-md-3"
                            label="Senha:"
                            name="aluSenha"
                            type="password"
                            placeholder="****"
                            onChange={(e) => this.atualizaCampo(e)}
                        />
                        <ComponenteText
                            tamanho="col-md-3"
                            label="Confirmar Senha:"
                            name="aluSenha"
                            type="password"
                            placeholder="****"
                            onChange={(e) => this.atualizaCampo(e)}
                        />
                        <ComponenteText
                            tamanho="col-md-6"
                            label="Observação:"
                            name="aluObs"
                            type="text"
                            placeholder="Obs."
                            onChange={(e) => this.atualizaCampo(e)}
                        />
                        <ComponenteAtivo
                            tamanho="col-1 mt-5"
                            label="Ativo:"
                            name="aluAtivo"
                            onChange={this.atualizaCampoAtivo}
                            value={true}
                        />
                        <ComponenteImagem
                            tamanho="col-md-4 mt-5"
                            label="Imagem:"
                            name="aluImagem"
                            type="file"
                            selecionaImagem={this.selecionarImagem}
                        />
                    </form>
                </FormInserir>

                <FormEditar
                    nome={"Aluno"}
                    abrir={this.state.abrirEditar}
                    funcAbrir={this.abrirFecharEditar}
                    funcPut={this.putAluno}
                >
                    <form className="row g-3 form-group">
                        {/* <div className="col-md-12">
                            <label className="mb-0">Id: </label>
                            <input type="number" className="form-control mb-2" readOnly disabled
                                value={this.state.aluno.aluCodigo}
                            />
                        </div> */}
                        <ComponenteText
                            tamanho="col-md-6"
                            label="Nome:"
                            name="aluNome"
                            type="text"
                            placeholder="Nome Sobrenome"
                            value={this.state.aluno.aluNome}
                            onChange={(e) => this.atualizaCampo(e)}
                        />
                        <ComponenteData
                            tamanho="col-md-3"
                            label="Data Nascimento:"
                            name="aluDataNasc"
                            value={this.state.aluno.aluDataNasc}
                            selected={new Date(this.state.aluno.aluDataNasc)}
                            selecionaData={this.atualizaCampoData}
                        />
                        <ComponenteComboBox
                            tamanho="col-md-3"
                            label="Sexo:"
                            name="aluSexo"
                            onChange={this.atualizaCampo}
                            value={this.state.aluno.aluSexo}
                            options={this.state.sexo}
                        />
                        <ComponenteComboBox
                            tamanho="col-md-6"
                            label="Treinador:"
                            name="treCodigo"
                            onChange={this.atualizaCampo}
                            value={this.state.aluno.treCodigo}
                            options={this.state.treinadoresData}
                            optionNome="treNome"
                        />
                        <ComponenteText
                            tamanho="col-6"
                            label="Telefone:"
                            name="aluFone"
                            placeholder="(00) 00000-0000"
                            maxLength="15"
                            type="tel"
                            value={this.state.aluno.aluFone}
                            onChange={(e) => this.atualizaCampo(e)}
                            adicionarMascara={this.adicionarMascara}
                        />
                        <ComponenteText
                            tamanho="col-md-6"
                            label="Email:"
                            name="aluEmail"
                            type="email"
                            value={this.state.aluno.aluEmail}
                            onChange={(e) => this.atualizaCampo(e)}
                        />
                        <ComponenteText
                            tamanho="col-md-3"
                            label="Senha:"
                            name="aluSenha"
                            type="password"
                            value={this.state.aluno.aluSenha}
                            placeholder="****"
                            onChange={(e) => this.atualizaCampo(e)}
                        />
                        <ComponenteText
                            tamanho="col-md-3"
                            label="Confirmar Senha:"
                            name="aluSenha"
                            type="password"
                            value={this.state.aluno.aluSenha}
                            placeholder="****"
                            onChange={(e) => this.atualizaCampo(e)}
                        />
                        <ComponenteText
                            tamanho="col-md-6"
                            label="Observação:"
                            name="aluObs"
                            type="text"
                            value={this.state.aluno.aluObs}
                            placeholder="Obs."
                            onChange={(e) => this.atualizaCampo(e)}
                        />
                        <ComponenteAtivo
                            tamanho="col-1 mt-5"
                            label="Ativo:"
                            name="aluAtivo"
                            checked={this.state.aluno.aluAtivo}
                            onChange={this.atualizaCampoAtivo}
                            value={this.state.aluno.aluAtivo}
                        />
                        <ComponenteImagem
                            tamanho="col-md-4 mt-5"
                            label="Imagem:"
                            name="aluImagem"
                            type="file"
                            urlImagem={alunoUrlImagem + this.state.aluno.aluImagem}
                        />
                    </form>
                </FormEditar>

                <FormExcluir
                    nome={"Aluno"}
                    abrir={this.state.abrirExcluir}
                    dados={this.state.aluno.aluNome}
                    funcDelete={this.deleteAluno}
                    funcAbrir={this.abrirFecharExcluir}
                />
            </React.Fragment>
        )
    }
}

export default Aluno;