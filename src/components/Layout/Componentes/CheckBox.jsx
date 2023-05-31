import React from "react";

import Api from "../../../services/Api";

class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            modalidadeExibir: []
        };

        this.listarModalidades = this.listarModalidades.bind(this);
        this.buscarModalidades = this.buscarModalidades.bind(this);

        if (this.props.desCodigo !== null) {
            this.buscarModalidades();
        }
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.modNome !== this.props.modNome) {
    //         this.listarModalidades(this.props.modNome);
    //     }
    // }

    // componentDidMount() {
    //     this.listarModalidades(this.props.modNome);
    // }

    listarModalidades = (nome) => {
        // this.modalidadeDesafio.filter(modalidade => {
        //     if (modalidade.modNome === modNome) {
        //         this.setState({ checked: true });
        //     }
        // })
        this.modalidadeExibir.find(modalidade => {
            if (modalidade.modNome === nome) {
                this.setState({ checked: true });
            } 
        })
    }

    buscarModalidades = async () => {
        // await Api.get(`desafio/modalidades/${this.props.codigoSelecionado}`).then(response => {
        await Api.get(this.props.url).then(response => {
            this.setState({ modalidadeExibir: this.modalidadeExibir = response.data });
            this.listarModalidades(this.props.nome);
        }).catch(error => {
            console.log(error);
        });
    }

    handleCheck = () => {
        this.setState({ checked: !this.state.checked });
    };

    render() {
        return (
            <div className="form-check" key={this.props.codigo}>
                <input className="form-check-input" type="checkbox" value="" id="checkBoxId"
                    checked={this.state.checked}
                    onChange={this.handleCheck}
                />
                <label className="form-check-label" for="flexCheckDefault">
                    {this.props.nome}
                </label>
            </div>
        );
    }
}

export default CheckBox;