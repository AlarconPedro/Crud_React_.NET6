import React, { Component, useEffect, useState } from "react";
import moment from "moment";

// export default function Session() {

//     const [sessionOcioso, setSessionOcioso] = useState(0);
//     const [sessionTime, setSessionTime] = useState(60);

//     useEffect(() => {
//         let sessionOcioso = parseInt(localStorage.getItem("tempoOcioso"));
//         let sessionTime = parseInt(localStorage.getItem("sessionTime"));
//         if (sessionOcioso !== null && sessionTime !== null) {
//             setSessionOcioso(sessionOcioso);
//             setSessionTime(sessionTime);
//         } else {
//             localStorage.setItem("tempoOcioso", 0);
//             localStorage.setItem("sessionTime", 60);
//             setSessionOcioso(0);
//             setSessionTime(60);
//             timeInterval();
//         }
//     }, []);

//     setInterval(timeInterval, 1000);

//     function timeInterval() {
//         if (sessionOcioso >= sessionTime) {
//             logout();
//         } else {
//             let retorno = atualizaSession();
//             localStorage.setItem("tempoOcioso", retorno);
//         }
//     }

//     const atualizaSession = () => {
//         localStorage.setItem("tempoOcioso", sessionOcioso + 1);
//         let tempo = sessionOcioso + 1;
//         setSessionOcioso(tempo);
//         return tempo;
//     }

//     const logout = () => {
//         clearInterval(timeInterval);
//         sessionStorage.removeItem("session");
//         window.location.href = "/";
//     }
// }