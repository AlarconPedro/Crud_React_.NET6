import React from "react";

import Api from "../../services/Api";

class CheckBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };

        this.listarModalidades = this.listarModalidades.bind(this);
        // this.handleCheck = this.handleCheck.bind(this);
    }

    listarModalidades = (modNome) => {
        modalidadeDesafio.filter(modalidade => {
            if (modalidade.modNome === modNome) {
                this.setState({ checked: true });
            }
            this.setState({ checked: false });
        })
    }

    buscarModalidadesDesafio = async (desCodigo) => {
        await Api.get(`desafio/modalidades/${desCodigo}`).then(response => {
            setModalidadeDesafio(response.data);
            // listarModalidades();
        }).catch(error => {
            console.log(error);
        });
    }

    handleCheck = () => {
        this.setState({ checked: !this.state.checked });
    };

    render() {
        return (
            <div className="form-check" key={this.props.modCodigo}>
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                    checked={this.state.checked}
                    onChange={this.handleCheck}
                />
                <label className="form-check-label" for="flexCheckDefault">
                    {this.props.modNome}
                </label>
            </div>
        );
    }
}

export default CheckBox;