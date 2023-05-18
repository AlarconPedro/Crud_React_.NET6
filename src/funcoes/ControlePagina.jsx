import React from "react";


class ControlePaginas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagina: 1,
            dadosApi: [props.dados],
            getDados: props.getDados,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.pagina !== this.props.pagina) {
            this.setState({ pagina: this.props.pagina });
        }
        if (prevProps.dadosApi !== this.props.dadosApi) {
            this.setState({ dadosApi: this.props.dadosApi });
        }
        if (prevProps.getDados !== this.props.getDados) {
            this.setState({ getDados: this.props.getDados });
        }
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item" onClick={() => this.alterarPagina("&lt;")}><a className="page-link"><strong>&lt;</strong></a></li>
                        <li className="page-item active"><p className="page-link">{this.state.pagina}</p></li>
                        <li className="page-item"><a className="page-link" onClick={() => this.alterarPagina("&gt;")}><strong>&gt;</strong></a></li>
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
            let total = this.state.dadosApi[0];
            let quantidade = (total.total / 10);
            if (this.state.pagina < quantidade) {
                this.avancarPagina(this.state.pagina * 10);
            }
        }
    }

    avancarPagina = async (skip) => {
        let total = this.state.dadosApi[0];
        let quantidade = (total.total / 10);
        this.state.getDados(skip);
        this.state.pagina > quantidade ? this.setState({ pagina: 1 }) :
        this.setState({ pagina: this.state.pagina + 1 });
    }

    voltarPagina = async (skip) => {
        skip = skip - 20;
        this.state.getDados(skip);
        this.state.pagina > 1 ? this.setState({ pagina: this.state.pagina - 1 }) : this.setState({ pagina: 1 });
    }
}

export default ControlePaginas;