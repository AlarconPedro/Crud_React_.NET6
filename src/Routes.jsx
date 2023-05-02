import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login/login';
import Principal from './layout/Estrutura/EstruturaPages';

export default Rotas => {
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