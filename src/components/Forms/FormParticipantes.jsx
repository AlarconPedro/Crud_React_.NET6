import React, { useEffect, useState } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import Api from "../../services/Api";

import { Link } from "react-router-dom";

class FormParticipantes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrir: false,
            abrirEditar: false,
            updateDados: true,
            data: []
        }
    }

    componentDidMount() { }

    componentDidUpdate(prevProps) {
        if (prevProps.abrir !== this.props.abrir) {
            this.setState({ abrir: this.props.abrir });
        }
        if (prevProps.abrirEditar !== this.props.abrirEditar) {
            this.setState({ abrirEditar: this.props.abrirEditar });
        }
        if (prevProps.updateDados !== this.props.updateDados) {
            this.setState({ updateDados: this.props.updateDados });
        }
    }

    abrirModal = () => {
        this.setState({ abrir: !this.state.abrir });
        this.props.funcAbrir(this.state.abrir);
    }

    abrirModalEditar = () => {
        this.setState({ abrirEditar: !this.state.abrirEditar });
        this.props.funcAbrirEditar(this.state.abrirEditar);
    }

    getAlunos = async (codigoDesafio) => {
        await Api.get("desafio/alunos/" + codigoDesafio).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <Modal isOpen={this.state.abrir} className="modal-participantes">
                <ModalHeader>Listar Participantes</ModalHeader>
                <ModalBody className="mr-3">
                    <div className="desafio-container">
                        <header>
                            <Link className="text-decoration-none" to={"/desafio/participantes"} state={{ codigo: (this.props.codigoDesafio) }}>
                                <button className="btn btn-success btn-adicionar"><strong>+</strong> Adicionar Alunos</button>
                            </Link>
                        </header>
                        <hr />
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Nome</th>
                                <th className="pl-4 acoes">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((aluno) => (
                                <tr key={aluno.aluCodigo}>
                                    <td className=""><img src={this.props.alunoUrl + aluno.aluImagem} alt="" /></td>
                                    <td className="pt-3">{aluno.aluNome}</td>
                                    <td>
                                        <button className="btn btn-warning">
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger">
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => this.abrirModal()}>Fechar</button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default FormParticipantes;

// export default function FormParticipantes(props) {

//     const [abrir, setAbrir] = useState(false);
//     const [abrirEditar, setAbrirEditar] = useState(false);
//     const [updateAlunos, setUpdateAlunos] = useState(true);

//     const [alunosData, setAlunosData] = useState([]);

//     useEffect(() => {
//         setAbrir(props.abrir);
//     }, [props.abrir]);

//     useEffect(() => {
//         setAbrirEditar(props.abrirEditar);
//     }, [props.abrirEditar]);

//     useEffect(() => {
//         setAlunosData(alunosData);
//     }, [alunosData]);

//     useEffect(() => {
//         if (updateAlunos) {
//             getAlunos();
//             setUpdateAlunos(false);
//         }
//     }, [updateAlunos]);

//     useEffect(() => {
//         getAlunos(props.codigoDesafio);
//     }, [props.codigoDesafio]);

//     const abrirModal = () => {
//         setAbrir(!abrir);
//         props.funcAbrir(abrir);
//     }

//     const getAlunos = async (codigoDesafio) => {
//         await Api.get("desafio/alunos/" + codigoDesafio).then(response => {
//             setAlunosData(response.data);
//         }).catch(error => {
//             console.log(error);
//         });
//     }

    // return (
    //     <Modal isOpen={abrir} className="modal-participantes">
    //         <ModalHeader>Listar Participantes</ModalHeader>
    //         <ModalBody className="mr-3">
    //             <div className="desafio-container">
    //                 <header>
    //                     <Link className="text-decoration-none" to={"/desafio/participantes"} state={{ codigo: (props.codigoDesafio)}}>
    //                         <button className="btn btn-success btn-adicionar"><strong>+</strong> Adicionar Alunos</button>
    //                     </Link>
    //                 </header>
    //                 <hr />
    //             </div>
    //             <table className="table table-striped">
    //                 <thead>
    //                     <tr>
    //                         <th>Avatar</th>
    //                         <th>Nome</th>
    //                         <th className="pl-4 acoes">Ações</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     <div></div>
    //                     {alunosData.map((aluno) => (
    //                         <tr key={aluno.aluCodigo}>
    //                             <td className=""><img src={alunoUrl + aluno.aluImagem} alt="" /></td>
    //                             <td className="pt-3">{aluno.aluNome}</td>
    //                             <td>
    //                                 <button className="btn btn-warning">
    //                                     <i className="fa fa-pencil"></i>
    //                                 </button>{" "}
    //                                 <button className="btn btn-danger">
    //                                     <i className="fa fa-trash"></i>
    //                                 </button>
    //                             </td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </ModalBody>
    //         <ModalFooter>
    //             <button className="btn btn-danger" onClick={() => abrirModal()}>Fechar</button>
    //         </ModalFooter>
    //     </Modal>
    // )
// }