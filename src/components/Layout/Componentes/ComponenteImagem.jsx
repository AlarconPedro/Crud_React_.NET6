import React, { Component } from "react";

import "./Estilos/ComponenteImagem.css"

const initialState = {
    tamanho: "",
    label: "",
    name: "",
    type: "",
    urlImagem: "",
    imagens: null,
    file: null,
    imagePreviewUrl: null
}

export default class ComponenteImagem extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
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

    selecionarImagem(e) {
        // e.preventDefault();

        // const reader = new FileReader();
        // reader.readAsDataURL(e.target.files[0]);
        // reader.onload = () => {
        //     if (reader.readyState === 1) {
        //         this.setState({
        //             imagens: reader.result
        //         })
        //     }
        // }
    }

    postarImagem(e) {
        // e.preventDefault();

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
        });
    }


    _handleSubmit(e) {
        e.preventDefault();
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(file);
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = <img src={imagePreviewUrl} alt="preview" />;
        } else {
            $imagePreview = <div className="previewText">Selecionar Imagem</div>;
        }

        return (
            <div className="previewComponent col-4">
                <form onSubmit={e => this._handleSubmit(e)}>
                    {
                        imagePreviewUrl == null ?
                            <input className="fileInput" type="file" onChange={e => this._handleImageChange(e)} />
                            : null
                    }
                </form>
                <div className="imgPreview">{$imagePreview}</div>
                {
                    imagePreviewUrl !== null ?
                        <button className="submitButton" type="submit" onClick={e => this._handleSubmit(e)}>
                            Editar
                        </button>
                        : null
                }
            </div>
            // <div className="form-group">
            //     <label htmlFor={this.state.name}>{this.state.label}</label>
            //     <input
            //         type={this.state.type}
            //         name={this.state.name}
            //         className={this.state.tamanho}
            //         onChange={this.selecionarImagem.bind(this)}
            //     />
            //     <button type="button" className="btn btn-primary" onClick={this.postarImagem.bind(this)}>Postar</button>
            //     <img src={this.state.urlImagem} alt="" />
            // </div>
        )
    }
}

// class ComponenteImagem extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             tamanho: "",
//             label: "",
//             name: "",
//             type: "",
//             urlImagem: "",
//             imagens: null,
//         }
//     }

//     componentDidMount() {
//         this.setState({
//             tamanho: this.props.tamanho,
//             label: this.props.label,
//             name: this.props.name,
//             type: this.props.type,
//             urlImagem: this.props.urlImagem,
//             imagens: '',
//         });
//     }

//     componentDidUpdate(prevProps, prevState) {
//         if (prevState.tamanho !== this.props.tamanho) {
//             this.setState({
//                 tamanho: this.props.tamanho
//             })
//         }

//         if (prevState.label !== this.props.label) {
//             this.setState({
//                 label: this.props.label
//             })
//         }

//         if (prevState.name !== this.props.name) {
//             this.setState({
//                 name: this.props.name
//             })
//         }

//         if (prevState.type !== this.props.type) {
//             this.setState({
//                 type: this.props.type
//             })
//         }

//         if (prevState.urlImagem !== this.props.urlImagem) {
//             this.setState({
//                 urlImagem: this.props.urlImagem
//             })
//         }

//         if (prevState.imagens !== this.state.imagens) {
//             this.setState({
//                 imagens: this.state.imagens
//             })
//         }
//     }

//     selecionarImagem(event) {
//         // this.state.imagens = event.target.files[0];
//         // console.log(this.state.imagens);
//         const reader = new FileReader();
//         reader.readAsDataURL(event.target.files[0]);
//         reader.onload = () => {
//             if (reader.readyState === 1) {
//                 this.setState({
//                     imagens: reader.result
//                 })
//             }
//         }
//     }

//     postarImagem() {
//         const formData = new FormData();
//         let response = "";
//         formData.append("file", this.state.imagens);
//         formData.append("upload_preset", "upload");
//         formData.append("cloud_name", "dwsxjwv8p");
//         fetch("https://api.cloudinary.com/v1_1/dwsxjwv8p/image/upload", {
//             method: "post",
//             body: formData
//         }).then(res => res.json()).then(data => {
//             this.setState({
//                 urlImagem: data.url
//             })
//             response = data.url;
//             console.log(response);
//         }).catch(err => {
//             console.log(err);
//         })
//     }

//     render() {
//         return (
//             <div className={this.state.tamanho}>
//                 <label className="form-label mb-0">{this.state.label}</label>
//                 <input type={this.state.type} className="form-control "
//                     name={this.state.name} onChange={(e) => this.selecionarImagem(e)}/>
//                 {
//                     this.state.urlImagem !== '' ?
//                         <img src={this.state.urlImagem} alt="" className="imagem" />
//                         : this.state.imagens !== null ?
//                             <img src={this.state.imagens} alt="" className="imagem" />
//                             : <div></div>
//                 }
//                 {/* <ReactImageUploading
//                     multiple
//                     value={this.state.images}
//                     onChange={this.onChange}
//                     maxNumber={this.state.maxNumber}
//                     dataURLKey="data_url"
//                 /> */}
//                 <button onClick={this.postarImagem}>Postar</button>
//             </div>
//         )
//     }
// }

// export default ComponenteImagem;