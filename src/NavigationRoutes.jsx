import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home';
import Alunos from './pages/Alunos/AlunosCrud';

export default nav => 
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/alunos" element={<Alunos />} />
            <Route path="*" element={<Home />} />
        </Routes>