import React from "react";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

class ComponenteData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dados: [{
                tamanho: 1,
                label: "",
                name: "",
                selected: "",
            }]
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.dados !== this.props.dados) {
            this.setState({
                dados: this.props.dados
            })
        }
    }

    render() {
        return (
            //tamanho do compontente 1 - 12
            <div className={this.props.tamanho}>
                <label className="form-label">{this.props.label}</label>
                <DatePicker
                    className="form-control"
                    name={this.props.name}
                    selected={this.props.selected}
                    // selected={new Date(atividade.aluAtiDataHora)}
                    onChange={date => this.props.selecionaData(date)}
                    dateFormat={"dd/MM/yyyy"}
                    timeFormat="yyyy-MM-dd"
                    customInput={
                        <InputMask
                            type="text"
                            mask="99/99/9999"
                        />
                    }
                />
            </div>
        );
    }
}

export default ComponenteData;