import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login/login';
import Home from './pages/Home/Home';
import Principal from './components/Layout/Estrutura/EstruturaPages';

export default Rotas => {
    if (localStorage.length > 0 && localStorage.getItem("logado") === "true") {
        if (window.location.pathname === "/login") {
            window.location.replace("/home");
        }
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Principal />} />
                <Route path="/*" element={<Principal />} />
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
        // <BrowserRouter>
        //     <Routes>
        //         <Route exact path="/" element={<Login />} />
        //         <Route exact path="/login" element={<Login />} />
        //         <Route path="/*" element={<Principal />} />
        //     </Routes>
        // </BrowserRouter>
    );
};