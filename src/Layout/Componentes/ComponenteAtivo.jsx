import React from "react";

class ComponenteAtivo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tamanho: "",
            name: "",
            label: "",
            checked: false,
            funcAtualizaCampo: this.props.onChange,
        }
    }

    componentDidMount() {
        this.setState({
            tamanho: this.props.tamanho,
            name: this.props.name,
            label: this.props.label,
            checked: this.props.checked,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tamanho !== this.props.tamanho) {
            this.setState({
                tamanho: this.props.tamanho
            })
        }

        if (prevState.name !== this.props.name) {
            this.setState({
                name: this.props.name
            })
        }

        if (prevState.label !== this.props.label) {
            this.setState({
                label: this.props.label
            })
        }

        if (prevState.checked !== this.props.checked) {
            this.setState({
                checked: this.props.checked
            })
        }
    }

    render() {
        return (
            <div className={this.state.tamanho}>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck"
                        name={this.props.name}
                        checked={this.props.checked}
                        onChange={e => this.state.funcAtualizaCampo(e)}
                        value={true} />
                    <label className="form-check-label" id="label-ativo">{this.state.label}</label>
                </div>
            </div>
            // <div className="form-check">
            //     <input
            //         className="form-check-input"
            //         type="checkbox"
            //         name={this.props.name}
            //         checked={this.props.checked}
            //         onChange={this.props.atualizaCampo}
            //     />
            //     <label className="form-check-label">{this.props.label}</label>
            // </div>
        );
    }
}

export default ComponenteAtivo;