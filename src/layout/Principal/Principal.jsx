import React from 'react';

import { BrowserRouter } from "react-router-dom";

import Nav from '../../components/Nav';
import NavRotas from '../../NavigationRoutes';
import Footer from '../../components/Footer';
import Logo from '../../components/Logo';

export default props =>
    <div className="app">
        <Logo />
        <Nav />
        <NavRotas />
        <Footer />
    </div>
