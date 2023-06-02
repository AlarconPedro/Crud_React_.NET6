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
            imagens: null,
        }
    }

    componentDidMount() {
        this.setState({
            tamanho: this.props.tamanho,
            label: this.props.label,
            name: this.props.name,
            type: this.props.type,
            urlImagem: this.props.urlImagem,
            imagens: '',
        });
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

        if (prevState.imagens !== this.state.imagens) {
            this.setState({
                imagens: this.state.imagens
            })
        }
    }

    selecionarImagem(event) {
        this.state.imagens = event.target.files[0];
        console.log(this.state.imagens);
    }

    postarImagem() {
        const formData = new FormData();
        let response = "";
        formData.append("file", this.state.imagens);
        formData.append("upload_preset", "upload");
        formData.append("cloud_name", "dwsxjwv8p");
        fetch("https://api.cloudinary.com/v1_1/dwsxjwv8p/image/upload", {
            method: "post",
            body: formData
        }).then(res => res.json()).then(data => {
            this.setState({
                urlImagem: data.url
            })
            response = data.url;
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className={this.state.tamanho}>
                <label className="form-label mb-0">{this.state.label}</label>
                <input type={this.state.type} className="form-control "
                    name={this.state.name} onChange={(e) => this.selecionarImagem(e)}/>
                {
                    this.state.urlImagem !== '' ?
                        <img src={this.state.urlImagem} alt="" className="imagem" />
                        : this.state.imagens !== null ?
                            <img src={this.state.imagens} alt="" className="imagem" />
                            : <div></div>
                }
                {/* <ReactImageUploading
                    multiple
                    value={this.state.images}
                    onChange={this.onChange}
                    maxNumber={this.state.maxNumber}
                    dataURLKey="data_url"
                /> */}
                <button onClick={this.postarImagem}>Postar</button>
            </div>
        )
    }
}

export default ComponenteImagem;