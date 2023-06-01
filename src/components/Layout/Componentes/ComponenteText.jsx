import React from "react";

class ComponenteText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tamanho: "",
            label: "",
            name: "",
            maxLength: 15,
            value: "",
            placeholder: "",
            type: "",
            funcMascara: this.props.adicionarMascara,
            funcAtualizaCampo: this.props.onChange,
        }
    }

    componentDidMount() {
        this.setState({
            tamanho: this.props.tamanho,
            label: this.props.label,
            name: this.props.name,
            maxLength: this.props.maxLength,
            value: this.props.value,
            placeholder: this.props.placeholder,
            type: this.props.type,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tamanho !== this.props.tamanho) {
            this.setState({
                tamanho: this.props.tamanho
            })
        }

        if (prevState.label !== this.props.label) {
            this.setState({
                label: this.props.label
            })
        }

        if (prevState.name !== this.props.name) {
            this.setState({
                name: this.props.name
            })
        }

        if (prevState.maxLength !== this.props.maxLength) {
            this.setState({
                maxLength: this.props.maxLength
            })
        }

        if (prevState.value !== this.props.value) {
            this.setState({
                value: this.props.value
            })  
        }

        if (prevState.placeholder !== this.props.placeholder) {
            this.setState({
                placeholder: this.props.placeholder
            })
        }

        if (prevState.type !== this.props.type) {
            this.setState({
                type: this.props.type
            })
        }
    }

    render() {
        return (
            <div className={this.state.tamanho}>
                <label className="form-label mb-0 mt-2">{this.state.label}</label>
                <input type={this.state.type} className="form-control"
                    placeholder={this.state.placeholder}
                    maxLength={this.state.maxLength}
                    name={this.state.name}
                    value={this.state.value}
                    onKeyUp={e => this.state.funcMascara(e)}
                    onChange={e => this.state.funcAtualizaCampo(e)}
                />
            </div>
        );
    }
}

export default ComponenteText;