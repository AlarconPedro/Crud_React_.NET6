import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home';
import Alunos from './pages/Alunos/AlunosCrud';
import Treinadores from './pages/Treinadores/TreinadoresCrud';

export default nav => 
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/alunos" element={<Alunos />} />
            <Route path="/treinadores" element={<Treinadores />} />
            <Route path="/desafios" element={<Treinadores />} />
            <Route path="/eventos" element={<Treinadores />} />
            <Route path="/notificacao" element={<Treinadores />} />
            <Route path="/modalidade" element={<Treinadores />} />
            <Route path="/medalhas" element={<Treinadores />} />
            <Route path="/calendario" element={<Treinadores />} />
            <Route path="*" element={<Home />} />
        </Routes>