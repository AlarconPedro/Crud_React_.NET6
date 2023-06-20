import React from 'react';

import { BrowserRouter } from "react-router-dom";

import Nav from './Nav';
import NavRotas from '../../NavigationRoutes';
import Footer from './Footer';
import Logo from './Logo';

export default props =>
    <div className="app">
        <Logo />
        <Nav />
        <NavRotas />
        <Footer />
    </div>
