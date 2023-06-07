import React, { Component, useEffect, useState } from "react";
import moment from "moment";

import useIdle from './components/Layout/Hooks/useIdle';

import Mestre from "./components/Layout/Mestre/Mestre";

export default function Session() {
    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const { isIdle } = useIdle({
        onIdle: logout,
        idleTime: 0.1,
    });

    return isIdle;
}