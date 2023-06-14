import React, { Component } from "react";

import "./Estilos/ComponenteImagem.css"

import Api from "../../../services/Api";

const initialState = {
    tamanho: "",
    label: "",
    name: "",
    type: "",
    urlImagem: "",
    imagens: null,
    file: null,
    reader: new FileReader(),
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

    redimensionarImagem(img) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        var MAX_WIDTH = 300;
        var MAX_HEIGHT = 300;
        var width = img.width;
        var height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                return canvas.toDataURL("image/jpeg");
            }
        }

        // var resize = new window.resizeBy();
        // resize.init();
        // if (this.state.imagePreviewUrl == '' || this.state.imagePreviewUrl == null) {
        //     resize.photo(this.state.imagens, 600, 'dataURL', async function (dataUri) {
        //         var retorno = await Api.post('/imagem', dataUri).then(response => {
        //             console.log(response.data);
        //             return response.data;
        //         });
        //         // this.setState({
        //         //     imagens: dataUri
        //         // })
        //         console.log(dataUri);
        //     });
        // } else {
        //     resize.photo(this.state.imagePreviewUrl, 600, 'dataURL', function (dataUri) {
        //         // this.setState({
        //         //     imagens: dataUri
        //         // })
        //         console.log(dataUri);
        //     });
        // }
    }

    // selecionarImagem(e) {
    //     // e.preventDefault();

    //     // const reader = new FileReader();
    //     // reader.readAsDataURL(e.target.files[0]);
    //     // reader.onload = () => {
    //     //     if (reader.readyState === 1) {
    //     //         this.setState({
    //     //             imagens: reader.result
    //     //         })
    //     //     }
    //     // }
    // }

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

        var response = null;

        // let reader = new FileReader();
        this.state.file = e.target.files[0];
        console.log(this.state.file);
        this.state.reader.onloadend = async () => {
            response = await this.redimensionarImagem(this.state.file);
            this.setState({
                file: this.state.file,
                imagePreviewUrl: this.state.reader.result
            });
        };
        if (this.state.file) {
            if (response == null) {
                this.state.reader.readAsDataURL(this.state.file);
            } else {
                this.state.reader.readAsDataURL(response);
            }
        }
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        // imagePreviewUrl = this.state == null ? this.state.urlImagem : this.state;
        if (imagePreviewUrl = this.state.urlImagem != '' && imagePreviewUrl == null ? this.state.urlImagem : imagePreviewUrl) {
            $imagePreview = <img src={imagePreviewUrl} alt="preview" />;
        } else {
            $imagePreview =
                <div className="custom-file-upload">
                    <label for="file-upload" className="col-12">
                        <h4>Selecionar Imagem</h4>
                    </label>
                </div>;
        }

        return (
            <div className="previewComponent col-md-4">
                <form onSubmit={e => this._handleSubmit(e)}>
                    {imagePreviewUrl == null ?
                        <input className="fileInput"
                            id="file-upload"
                            type="file"
                            onChange={e => this._handleImageChange(e)}
                        />
                        : null}
                </form>
                <div className="imgPreview">{$imagePreview}</div>
                {imagePreviewUrl !== '' ?
                    <React.Fragment>
                        <input className="fileInput"
                            id="file-upload"
                            type="file"
                            onChange={e => this._handleImageChange(e)}
                        />
                        <div className="custom-file-edit">
                            <label for="file-upload" className="col-12">
                                Editar
                            </label>
                        </div>
                    </React.Fragment>
                    : null}
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