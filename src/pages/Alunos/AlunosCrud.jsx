import React, { useState, useEffect } from "react";

import Mestre from "../../layout/Mestre/Mestre";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";

import FormInserir from "../../components/Crud/FormularioAluno/FormInserir";
import FormEditar from "../../components/Crud/FormularioAluno/FormEditar";
import FormExcluir from "../../components/Crud/FormularioAluno/FormExcluir";
import FormAtividades from "../Atividades/AtividadesCrud";

import { BsJustify } from "react-icons/bs";

import { Link } from "react-router-dom";

import Busca from "../../layout/Objetos/Busca";
import ConverteData from "../../funcoes/ConverteData";

import Modelo from "../Modelo";

import "./AlunosCrud.css";
import { alunoUrl, treinadorUrl } from "../../services/Imagens";

class AlunoCrud extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrir: false,
            carregando: false,
            urlApi: "aluno/",
            alunosData: [],
        }
    }

    // getAlunos = async (skip = 0) => {
    //     setCarregando(true);
    //     await Api.get(`aluno?skip=${skip}`).then(response => {
    //         setAlunosData(response.data);
    //     }).catch(error => {
    //         console.log(error);
    //     });
    //     setCarregando(false);
    // }

    getAlunoNome = async (busca) => {
        this.setState({ carregando: true });
        await Api.get(this.state.urlApi + busca).then(response => {
            this.setState({ alunosData: response.data });
        }).catch(error => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    render() {
        return (
            <Modelo
                urlApi="aluno?skip="
                titulo="Cadastro Alunos"
                subtitulo="Painel Sou+Fit"
                icone="user"
                Cabecalho="Alunos"
                BotaoAdd="Adicionar Alunos"
                getByNome={this.getAlunoNome}
                colunas={[
                    { nome: "Id" },
                    { nome: "Avatar" },
                    { nome: "Nome" },
                    { nome: "Telefone" },
                    { nome: "Idade" },
                    { nome: "Ativo" },
                    { nome: "Atividades" },
                    { nome: "Ações" },
                    // { api: "aluCodigo", nome: "Id" },
                    // { api: "aluImagem", nome: "Avatar" },
                    // { api: "aluNome", nome: "Nome" },
                    // { api: "aluFone", nome: "Telefone" },
                    // { api: "aluDataNasc", nome: "Idade" },
                    // { api: "aluAtivo", nome: "Ativo" },
                    // { api: "aluCodigo", nome: "Atividades" },
                    // { api: "acoes", nome: "Ações" },
                ]}
                variaveis={
                    [
                        "treinador/",
                        "aluno/",
                        "aluno?skip=",
                    ]
                }
            />
        )
    }
}

export default AlunoCrud;

// export default function AlunosCrud(props) {

//     const [carregando, setCarregando] = useState(false);

//     const [dataAtual, setDataAtual] = useState(new Date());

//     const [alunosData, setAlunosData] = useState([]);

//     const [treinadoresData, setTreinadoresData] = useState([]);

//     const [alunoInitialState] = useState({
//         aluCodigo: 0,
//         aluNome: '',
//         aluDataNasc: new Date("01/01/1900"),
//         aluEmail: '',
//         aluSenha: '',
//         treCodigo: '',
//         aluOneSignalId: null,
//         aluImagem: '',
//         aluId: '',
//         aluFone: '',
//         aluSexo: '',
//         aluAtivo: true,
//         aluObs: '',
//         aluStravaCode: null,
//         tbAlunoAtividades: [],
//         tbAlunoDesafios: [],
//         tbAlunoEventos: [],
//         treCodigoNavigation: null,
//     });


//     const [aluno, setAluno] = useState({
//         aluCodigo: 0,
//         aluNome: '',
//         aluDataNasc: new Date(dataAtual),
//         aluEmail: '',
//         aluSenha: '',
//         treCodigo: '',
//         aluOneSignalId: null,
//         aluImagem: '',
//         aluId: '',
//         aluFone: '',
//         aluSexo: '',
//         aluAtivo: true,
//         aluObs: '',
//         aluStravaCode: null,
//         tbAlunoAtividades: [],
//         tbAlunoDesafios: [],
//         tbAlunoEventos: [],
//         treCodigoNavigation: null,
//     });

//     const sexo = [
//         { id: "M", nome: 'Masculino' },
//         { id: "F", nome: 'Feminino' },
//     ];

//     const [nomeBusca, setNomeBusca] = useState({
//         aluNome: ''
//     });

//     const [pagina, setPagina] = useState(1);

//     const [abrirCadastroAlunos, setAbrirCadastroAlunos] = useState(false);
//     const [abrirEditarAlunos, setAbrirEditarAlunos] = useState(false);
//     const [abrirExcluirAlunos, setAbrirExcluirAlunos] = useState(false);
//     const [abrirParticipantes, setAbrirAtividades] = useState(false);
//     const [updateAlunos, setUpdateAlunos] = useState(true);

//     const abrirFecharCadastroAlunos = (abrirCadastroAlunos) => {
//         setAbrirCadastroAlunos(!abrirCadastroAlunos);
//         setAluno(alunoInitialState);
//     }

//     const abrirFecharEditarAlunos = (abrirEditarAlunos) => {
//         setAbrirEditarAlunos(!abrirEditarAlunos);
//     }

//     const abrirFecharExcluirAlunos = (abrirExcluirAlunos) => {
//         setAbrirExcluirAlunos(!abrirExcluirAlunos);
//     }

//     const abrirFecharAtividades = (abrirAtividades) => {
//         setAbrirAtividades(!abrirAtividades);
//     }

//     const mascaraTelefone = (e) => {
//         let input = e.target;
//         input.value = phoneMask(input.value);
//         setAluno({ ...aluno, [e.target.name]: input.value });
//     }

//     const phoneMask = (value) => {
//         if (!value) return ""
//         value = value.replace(/\D/g, '')
//         value = value.replace(/(\d{2})(\d)/, "($1) $2")
//         value = value.replace(/(\d)(\d{4})$/, "$1-$2")
//         return value
//     }

//     const selecionarAluno = (aluno, opcao) => {
//         setAluno(aluno);
//         // (opcao === "Editar") ? abrirFecharEditarAlunos() : abrirFecharExcluirAlunos();
//         if (opcao === "Atividades") {
//             abrirFecharAtividades();
//         } else if (opcao === "Editar") {
//             abrirFecharEditarAlunos();
//         } else {
//             abrirFecharExcluirAlunos();
//         }
//     }

//     const atualizaCampo = e => {
//         const { name, value } = e.target;
//         setAluno({
//             ...aluno,
//             [name]: value
//         });
//     }

//     const atualizaCampoBusca = e => {
//         const { name, value } = e.target;
//         setNomeBusca({
//             ...nomeBusca,
//             [name]: value
//         });
//     }

//     const atualizaCampoAtivo = e => {
//         const { name, value } = e.target;
//         setAluno({
//             ...aluno,
//             [name]: value === "true" ? true : false
//         });
//     }

//     const dataAuxiliar = (date) => {
//         setDataAtual(date);
//         let data = ConverteData(date);
//         console.log(data);
//         setAluno({
//             ...aluno,
//             aluDataNasc: data
//         });
//         return data;
//     }

//     // const converteMd5 = (senha) => {
//     //     var md5 = require('md5');
//     //     return md5(senha);
//     // }

//     const getAlunos = async (skip = 0) => {
//         setCarregando(true);
//         await Api.get(`aluno?skip=${skip}`).then(response => {
//             setAlunosData(response.data);
//         }).catch(error => {
//             console.log(error);
//         });
//         setCarregando(false);
//     }

//     const getTreinadores = async (skip = 0) => {
//         setCarregando(true);
//         await Api.get(`treinador?skip=${skip}`).then(response => {
//             setTreinadoresData(response.data);
//         }).catch(error => {
//             console.log(error);
//         });
//         setCarregando(false);
//     }

//     const getTreinadorId = async (id) => {
//         await Api.get(`treinador/${id}`).then(response => {
//             setTreinadoresData(response.data);
//         }).catch(error => {
//             console.log(error);
//         });
//     }

//     const postAluno = async () => {
//         await dataAuxiliar(dataAtual);
//         await Api.post("aluno/", aluno).then(response => {
//             setAluno(response.data);
//             setUpdateAlunos(true);
//             // abrirFecharCadastroAlunos();
//         }).catch(error => {
//             console.log(error);
//         });
//         setAluno(alunoInitialState);
//     }

//     const putAluno = async (codigo = aluno.aluCodigo) => {
//         await dataAuxiliar(dataAtual);
//         await Api.put("aluno/" + codigo, aluno).then(response => {
//             var alunosAuxiliar = alunosData;
//             alunosAuxiliar.map(alunoMap => {
//                 if (alunoMap.aluCodigo === aluno.aluCodigo) {
//                     alunoMap.aluNome = aluno.aluNome;
//                     alunoMap.aluDataNasc = aluno.aluDataNasc;
//                     alunoMap.aluEmail = aluno.aluEmail;
//                     alunoMap.aluSenha = aluno.aluSenha;
//                     alunoMap.treCodigo = aluno.treCodigo;
//                     alunoMap.aluOneSignalId = aluno.aluOneSignalId;
//                     alunoMap.aluId = aluno.aluId;
//                     alunoMap.aluFone = aluno.aluFone;
//                     alunoMap.aluSexo = aluno.aluSexo;
//                     alunoMap.aluAtivo = aluno.aluAtivo;
//                     alunoMap.aluObs = aluno.aluObs;
//                     alunoMap.aluStravaCode = aluno.aluStravaCode;
//                     alunoMap.aluStravaToken = aluno.aluStravaToken;
//                     alunoMap.aluStravaRefreshToken = aluno.aluStravaRefreshToken;
//                     alunoMap.aluStravaExpiresAt = aluno.aluStravaExpiresAt;
//                     alunoMap.aluStravaExpiresIn = aluno.aluStravaExpiresIn;
//                     alunoMap.aluStravaScope = aluno.aluStravaScope;
//                     alunoMap.aluStravaTokenType = aluno.aluStravaTokenType;
//                 }
//                 return alunoMap;
//             });
//             setAlunosData(alunosAuxiliar);
//             // setAluno(response.data);
//             setUpdateAlunos(true);
//             // abrirFecharEditarAlunos();
//         }).catch(error => {
//             console.log(error);
//         });
//     }

//     const deleteAluno = async (aluno = aluno.aluCodigo) => {
//         await Api.delete("aluno/" + aluno).then(response => {
//             setUpdateAlunos(true);
//             // abrirFecharExcluirAlunos();
//         }).catch(error => {
//             console.log(error);
//         });
//     }

//     const getAlunoNome = async (busca) => {
//         setCarregando(true);
//         await Api.get("aluno/" + busca).then(response => {
//             setAlunosData(response.data);
//         }).catch(error => {
//             console.log(error);
//         });
//         setCarregando(false);
//     }

//     const converterDataToIdade = (data) => {
//         const today = new Date();

//         var idade = data !== "" ? today.getFullYear() - data.substring(0, 4) : "-";
//         const mes = data !== "" ? today.getMonth() - data.substring(5, 7) : "-";

//         if (mes < 0 || (mes === 0 && today.getDate() < data.substring(8, 10))) {
//             idade--;
//         }

//         return data !== "" ? idade : "-";
//     }

//     useEffect(() => {
//         if (updateAlunos) {
//             getAlunos();
//             setUpdateAlunos(false);
//         }
//     }, [updateAlunos]);

//     useEffect(() => {
//         getTreinadores();
//     }, [setAbrirCadastroAlunos]);

//     useEffect(() => {
//         getTreinadorId(aluno.treCodigo);
//     }, [setAbrirEditarAlunos]);

//     function handleDefault(e) {
//         e.preventDefault();
//     }

//     const alterarPagina = (e) => {
//         e === "&gt;" ? pagina > alunosData.length ? avancarPagina()
//             : avancarPagina(pagina * 10)
//             : voltarPagina(pagina * 10);
//     }

//     const avancarPagina = async (skip) => {
//         getAlunos(skip);
//         pagina > alunosData.length ? setPagina(1) :
//             setPagina(pagina + 1);
//     }

//     const voltarPagina = async (skip) => {
//         skip = skip - 20;
//         getAlunos(skip);
//         pagina > 1 ? setPagina(pagina - 1) : setPagina(1);
//     }

//     const verificaSexo = (sexo) => {
//         if (sexo === "M") {
//             return "Masculino";
//         } else if (sexo === "F") {
//             return "Feminino";
//         } else {
//             return "Outro";
//         }
//     }

//     return (
//         <Mestre icon="user" title="Cadastro Alunos" subtitle="Painel Sou+Fit">
//             <div className="alunos-container">
//                 <header>
//                     <h3>Alunos</h3>
//                     <button className="btn btn-success btn-adicionar" onClick={() => abrirFecharCadastroAlunos()}><strong>+</strong> Adicionar Alunos</button>
//                 </header>
//                 <hr />
//                 <Busca buscar={getAlunoNome}/>
//                 <br />
//                 {carregando ? <div className="spinner-border loader" role="status">
//                 </div>
//                     : <table className="table table-striped">
//                         <thead>
//                             <tr>
//                                 {/* <th>Id</th> */}
//                                 <th>Avatar</th>
//                                 <th>Nome</th>
//                                 <th>Telefone</th>
//                                 <th>Idade</th>
//                                 <th>Ativo</th>
//                                 <th>Atividades</th>
//                                 <th className="acoes">Ações</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {alunosData.map((aluno) => (
//                                 <tr key={aluno.aluCodigo}>
//                                     {/* <td>{aluno.aluCodigo}</td> */}
//                                     <td className=""><img src={alunoUrl + aluno.aluImagem} alt="" /></td>
//                                     <td className="pt-3">{aluno.aluNome}</td>
//                                     <td className="pt-3">{aluno.aluFone}</td>
//                                     <td className="pt-3"><div className="idade">{converterDataToIdade(aluno.aluDataNasc ?? "")}</div></td>
//                                     <td className="pt-3">
//                                         <div className="form-check">
//                                             <input className="form-check-input" type="checkbox" checked={aluno.aluAtivo} value={true} />
//                                         </div>
//                                     </td>
//                                     <Link className="text-decoration-none" to={"/atividades"} state={{ codigo: (aluno.aluCodigo)}}>
//                                         <td className="pl-5 pt-3 listar" onClick={() => selecionarAluno(aluno, "Atividades")}><BsJustify /></td>
//                                     </Link>
//                                     <td>
//                                         <button className="btn btn-warning" onClick={() => selecionarAluno(aluno, "Editar")}>
//                                             <i className="fa fa-pencil"></i>
//                                         </button>{" "}
//                                         <button className="btn btn-danger" onClick={() => selecionarAluno(aluno, "Excluir")}>
//                                             <i className="fa fa-trash"></i>
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 }
//                 <hr />
//                 <br />
//                 <div className="d-flex justify-content-center">
//                     <nav aria-label="Page navigation example">
//                         <ul className="pagination">
//                             <li className="page-item" onClick={() => alterarPagina("&lt;")}><a className="page-link">&lt;</a></li>
//                             <li className="page-item active"><p className="page-link">{pagina}</p></li>
//                             <li className="page-item"><a className="page-link" onClick={() => alterarPagina("&gt;")}>&gt;</a></li>
//                         </ul>
//                     </nav>
//                 </div>

//                 {/* <FormAtividades
//                     nome={"Aluno"}
//                     abrir={abrirParticipantes}
//                     aluDados={aluno}
//                     funcAbrir={abrirFecharAtividades}
//                     funcData={dataAuxiliar}
//                     funcMascara={mascaraTelefone}
//                     funcAtualizaCampoAtivo={atualizaCampoAtivo}
//                     funcAtualizaCampo={atualizaCampo}
//                     funcSexo={sexo}
//                     treinaData={treinadoresData}
//                     funcBuscaTreinador={getTreinadorId}
//                 /> */}

//                 <FormInserir
//                     nome={"Aluno"}
//                     abrir={abrirCadastroAlunos}
//                     aluDados={aluno}
//                     funcPost={postAluno}
//                     funcAbrir={abrirFecharCadastroAlunos}
//                     funcData={dataAuxiliar}
//                     funcMascara={mascaraTelefone}
//                     funcAtualizaCampoAtivo={atualizaCampoAtivo}
//                     funcAtualizaCampo={atualizaCampo}
//                     funcSexo={sexo}
//                     treinaData={treinadoresData}
//                     funcBuscaTreinador={getTreinadorId}
//                 />

//                 <FormEditar
//                     nome={"Aluno"}
//                     abrir={abrirEditarAlunos}
//                     aluNome={aluno && aluno.aluNome}
//                     aluDados={aluno}
//                     dataAtual={dataAtual}
//                     funcPut={putAluno}
//                     funcAbrir={abrirFecharEditarAlunos}
//                     funcData={dataAuxiliar}
//                     funcMascara={mascaraTelefone}
//                     funcAtualizaCampoAtivo={atualizaCampoAtivo}
//                     funcAtualizaCampo={atualizaCampo}
//                     funcSexo={sexo}
//                     treinaData={treinadoresData}
//                     funcBuscaTreinador={getTreinadorId}
//                 />

//                 <FormExcluir
//                     nome={"Aluno"}
//                     abrir={abrirExcluirAlunos}
//                     aluNome={aluno && aluno.aluNome}
//                     aluDados={aluno.aluCodigo}
//                     funcDelete={deleteAluno}
//                     funcAbrir={abrirFecharExcluirAlunos}
//                 />
//             </div>
//         </Mestre >
//     );
// }