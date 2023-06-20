import React from "react";

class ComponenteComboBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tamanho: "",
            label: "",
            name: "",
            value: "", 
            options: [],
        }
    }

    componentDidMount() {
        this.setState({
            tamanho: this.props.tamanho,
            label: this.props.label,
            name: this.props.name,
            options: this.props.options,
            value: this.props.value,
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

        if (prevState.options !== this.props.options) {
            this.setState({
                options: this.props.options
            })
        }

        if (prevState.value !== this.props.value) {
            this.setState({
                value: this.props.value
            })  
        }
    }

    render() {
        return (
            <div className={this.state.tamanho}>
                <label className="form-label">{this.state.label}</label>
                <select className="form-select w-100 h-50"
                    value={this.state.value}
                    name={this.state.name} onChange={e => this.props.onChange(e)}>
                    <option value=""></option>
                    {
                        this.state.options.map((item, index) => {
                            return (
                                <option key={index} value={item.id}>{item.nome}</option>
                            )
                        })
                    }
                </select>
            </div>
        );
    }
}

export default ComponenteComboBox;