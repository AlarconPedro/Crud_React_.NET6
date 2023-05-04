import React from "react";

class Busca extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            placeholder: 'Buscar...'
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ value: event.target.value });
    }

    handleDefault = (event) => {
        event.preventDefault();
        this.setState({ value: '' });
    }

    atualizaCampoBusca = (event) => {
        this.setState({ value: event.target.value });
    }
    
    buscar = () => {
        this.props.buscar(this.state.value);
    }

    render() {
        return (
            <form onSubmit={this.handleDefault}>
                <div className="input-group rounded">
                    <input type="search" className="form-control rounded" name="desNome" placeholder={this.state.placeholder} aria-label="Search" aria-describedby="search-addon" onChange={this.atualizaCampoBusca} />
                    <button className="botaoBusca" onClick={() => this.buscar()} type="submit">
                        <span className="input-group-text border-0" id="search-addon">
                            <i className="fa fa-search"></i>
                        </span>
                    </button>
                </div>
            </form>
        );
    }
}

export default Busca;