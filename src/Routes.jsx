import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login/login';
import Principal from './components/Layout/Estrutura/EstruturaPages';

import useIdle from './components/Layout/Hooks/useIdle';

export default Rotas => {

    const logout = () => {
        // sessionStorage.removeItem("session");
        window.location.href = "/";
    }

    const { isIdle } = useIdle({
        onIdle: logout,
        idleTime: 0.25
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/login" element={<Login />} />
                <Route path="/*" element={<Principal />} />
            </Routes>
        </BrowserRouter>
    );
};