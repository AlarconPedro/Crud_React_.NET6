import React from 'react';

import { BrowserRouter } from "react-router-dom";

import Nav from '../../components/Layout/Nav';
import NavRotas from '../../NavigationRoutes';
import Footer from '../../components/Layout/Footer';
import Logo from '../../components/Layout/Logo';

export default props =>
    <div className="app">
        <Logo />
        <Nav />
        <NavRotas />
        <Footer />
    </div>
