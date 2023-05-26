import React from "react";

class ComponenteImagem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tamanho: "",
            label: "",
            name: "",
            type: "",
            urlImagem: "",
        }
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

        if (prevState.type !== this.props.type) {
            this.setState({
                type: this.props.type
            })
        }

        if (prevState.urlImagem !== this.props.urlImagem) {
            this.setState({
                urlImagem: this.props.urlImagem
            })
        }
    }

    render() {
        return (
            <div className={this.state.tamanho}>
                <label className="form-label mb-0">{this.state.label}</label>
                <input type={this.state.type} className="form-control"
                    name={this.state.name} />
                <img src={this.state.urlImagem} alt="" />
            </div>
        )
    }
}

export default ComponenteImagem;