import React, { Component, useEffect, useState } from "react";
import moment from "moment";

export default function Session() {

    const [session, setSession] = useState({
        tempoOcioso: 0,
        tempoSessao: 60000,
    });

    useEffect(() => {
        const sessionReturn = JSON.parse(sessionStorage.getItem("session"));
        if (session !== null) {
            setSession({
                tempoOcioso: sessionReturn.tempoOcioso,
                tempoSessao: sessionReturn.tempoSessao,
            });
        } else {
            sessionStorage.setItem("session", JSON.stringify({
                tempoOcioso: 0,
                tempoSessao: session.tempoSessao,
            }));
        }

        // const interval = setInterval(() => {
        //     if (session) {
        //         console.log("tempoOcioso: " + session.tempoOcioso);
        //         if (session.tempoOcioso === 0) {
        //             setSession({
        //                 tempoOcioso: session.tempoOcioso + 1,
        //                 tempoSessao: session.tempoSessao + 1,
        //             });
        //         } else {
        //             console.log("tempoSessao: " + session.tempoSessao);
        //             setSession({
        //                 tempoOcioso: session.tempoOcioso + 1,
        //                 tempoSessao: session.tempoSessao,
        //             });
        //         }
        //     }
        // }, 1000);

        if (session.tempoOcioso >= session.tempoSessao) {
            sessionStorage.removeItem("session");
            window.location.href = "/";
        } else {
            atualizarSession();
        }

        // return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (session) {
            sessionStorage.setItem("session", JSON.stringify(session));
        }
    }, [session]);

    const atualizarSession = () => {
        session.tempoOcioso < session.tempoSessao 
        ? session.tempoOcioso = setInterval(() => {
            setSession({
                tempoOcioso: session.tempoOcioso + 1,
                tempoSessao: session.tempoSessao,
            });
        }, 1000) 
        : logout();
    }

    // const atualizarTempoSessao = () => {
    //     setSession({
    //         tempoOcioso: session.tempoOcioso,
    //         tempoSessao: session.tempoSessao,
    //     });
    // }

    const logout = () => {
        sessionStorage.removeItem("session");
        window.location.href = "/";
    }
}