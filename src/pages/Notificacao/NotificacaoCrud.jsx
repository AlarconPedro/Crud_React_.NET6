import React, { useState, useEffect } from "react";

import Mestre from "../../layout/Mestre/Mestre";

import "react-datepicker/dist/react-datepicker.css";

import Api from "../../services/Api";

import "./NotificacaoCrud.css";

export default function AlunosCrud() {

    const [carregando, setCarregando] = useState(false);

    const [alunosData, setAlunosData] = useState([]);

    const [aluno, setAluno] = useState({
        aluCodigo: 0,
        aluNome: '',
        aluOneSignalId: null,
        aluImagem: '',
        aluId: '',
        aluAtivo: true,
        aluStravaCode: null,
        tbAlunoAtividades: [],
        tbAlunoDesafios: [],
        tbAlunoEventos: [],
        treCodigoNavigation: null,
    });

    const atualizaCampo = e => {
        const { name, value } = e.target;
        setAluno({
            ...aluno,
            [name]: value
        });
    }

    const getAlunos = async () => {
        await Api.get(`aluno/`).then(response => {
            setAlunosData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
            getAlunos();
    }, []);

    function handleDefault(e) {
        e.preventDefault();
    }

    return (
        <Mestre icon="bell" title="Enviar Notificações" subtitle="Painel Sou+Fit">
            <div className="alunos-container">
                <form onSubmit={handleDefault}>
                    <h6><strong>Alunos:</strong></h6>
                    <div className="col-md-6 pl-0">
                        <select className="form-select w-100 h-50 pb-3">
                            <option value=""></option>
                            {
                                alunosData.map((aluno) => {
                                    return (
                                        aluno.aluOneSignalId !== null ?
                                        <option value={aluno.aluCodigo}>{aluno.aluNome}</option>
                                        : null
                                    )
                                })
                            }
                        </select>
                    </div>
                    <br />
                    <h6><strong>Mensagem:</strong></h6>
                    <div className="col-md-6 pl-0">
                        <input type="text" className="form-control" placeholder="Digite sua mensagem" /*onChange={e => setNomeBusca({ aluNome: e.target.value })} *//>
                    </div>
                    <br />
                </form>
                <hr />
                <div className="col-md-6 pl-0">
                    <button className="btn btn-primary">Enviar</button>
                </div>
            </div>
        </Mestre >
    );
}