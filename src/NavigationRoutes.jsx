import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home';
import Alunos from './pages/Alunos/AlunosCrud';
import Treinadores from './pages/Treinadores/TreinadoresCrud';
import Desafios from './pages/Desafios/DesafiosCrud';
import Eventos from './pages/Eventos/EventosCrud';
import Notificacao from './pages/Notificacao/NotificacaoCrud';
import Modalidades from './pages/Modalidades/ModalidadesCrud';
import Medalhas from './pages/Medalhas/MedalhasCrud';

export default nav => 
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/alunos" element={<Alunos />} />
            <Route path="/treinadores" element={<Treinadores />} />
            <Route path="/desafios" element={<Desafios />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/notificacao" element={<Notificacao />} />
            <Route path="/modalidade" element={<Modalidades />} />
            <Route path="/medalhas" element={<Medalhas />} />
            <Route path="/calendario" element={<Treinadores />} />
            <Route path="*" element={<Home />} />
        </Routes>