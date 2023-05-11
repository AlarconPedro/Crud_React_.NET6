import React from "react";


class ControlePaginas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagina: 1,
            dadosApi: [props.dados],
            getAlunos: props.getAlunos,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pagina !== this.props.pagina) {
            this.setState({ pagina: this.props.pagina });
        }
        if (prevProps.dadosApi !== this.props.dadosApi) {
            this.setState({ dadosApi: this.props.dadosApi });
        }
        if (prevProps.getAlunos !== this.props.getAlunos) {
            this.setState({ getAlunos: this.props.getAlunos });
        }
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item" onClick={() => this.alterarPagina("&lt;")}><a className="page-link">&lt;</a></li>
                        <li className="page-item active"><p className="page-link">{this.state.pagina}</p></li>
                        <li className="page-item"><a className="page-link" onClick={() => this.alterarPagina("&gt;")}>&gt;</a></li>
                    </ul>
                </nav>
            </div>
        );
    }

    alterarPagina = (operacao) => {
        if (operacao === "&lt;") {
            if (this.state.pagina > 1) {
                this.voltarPagina(this.state.pagina * 10);
            }
        } else if (operacao === "&gt;") {
            if (this.state.pagina < this.state.dadosApi.length) {
                this.avancarPagina(this.state.pagina * 10);
            }
        }
    }

    avancarPagina = async (skip) => {
        this.state.getAlunos(skip);
        this.state.pagina > this.state.dadosApi.length ? this.setState({ pagina: 1 }) :
        this.setState({ pagina: this.state.pagina + 1 });
    }

    voltarPagina = async (skip) => {
        skip = skip - 20;
        this.state.getAlunos(skip);
        this.state.pagina > 1 ? this.setState({ pagina: this.state.pagina - 1 }) : this.setState({ pagina: 1 });
    }
}

export default ControlePaginas;