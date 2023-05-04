import React from "react";

class ConverteData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: new Date(),
        };
    }
    
    render() {
        return (
        <div>
            <h1>Converte Data</h1>
        </div>
        );
    }
}

export default ConverteData;