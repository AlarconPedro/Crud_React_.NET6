import React, { useState, useEffect } from "react";

function Data(props) {
    dataAuxiliar(props.date);

    const dataAuxiliar = (date = props.date) => {
        var data = new Date(date),
            month = '' + (data.getMonth() + 1),
            day = '' + (data.getDate() + 1),
            year = data.getFullYear();
    
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        
        console.log([day, month, year].join('-'));
        return [day, month, year].join('-');
    }    
}

export default Data;