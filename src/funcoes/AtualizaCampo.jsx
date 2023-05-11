import React from "react";

class AtualizaCampo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            campos: {[this.props.nome]: [this.props.valor]},
            // valor: this.props.valor,
            // nome: this.props.nome,
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.campos !== this.props.campos){
            this.setState({campos: this.props.campos}); 
        }
        // if(prevProps.valor !== this.props.valor){
        //     this.setState({valor: this.props.valor});
        // }
        // if(prevProps.nome !== this.props.nome){
        //     this.setState({nome: this.props.nome});
        // }
    }

    atualizaValor = (e) => {
        this.setState({campos: {
            ...this.state.campos,
            [e.target.name]: e.target.value
        }});

        return this.state.campos;
        // const { name, value } = e.target;
        // setAluno({
        //     ...aluno,
        //     [name]: value
        // });
        // this.setState({valor: e.target.value});
        // this.props.funcAtualiza(e.target.value);
    }
    
}

export default AtualizaCampo;