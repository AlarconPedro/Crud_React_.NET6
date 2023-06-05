import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login/login';
import Principal from './components/Layout/Estrutura/EstruturaPages';

export default Rotas => {
    return (
        <BrowserRouter>
            <Routes>
                {sessionStorage.getItem("session") === null
                    ? <Route exact path="/" element={<Login />} />
                    || <Route exact path="/login" element={<Login />} />
                    : <Route exact path="/*" element={<Principal />} />
                }
                <Route exact path="/" element={<Login />} />
                <Route exact path="/login" element={<Login />} />
                <Route path="/*" element={<Principal />} />
            </Routes>
        </BrowserRouter>
    );
};