import React, { Component, useEffect, useState } from "react";
import moment from "moment";

export default function Session({
    isLogged,
    isIdle,
}) {
    const logout = () => {
        localStorage.clear();
        window.location.replace("/login");
    }

    const login = () => {
        localStorage.setItem("logado", true);
        window.location.replace("/home");
    }

    const logado = isLogged;
    const ocioso = isIdle;

    if (logado && !ocioso) {
        login();
    } else if (!logado && !ocioso){
        logout();
    } else if (logado && ocioso) {
        logout();
    }
}