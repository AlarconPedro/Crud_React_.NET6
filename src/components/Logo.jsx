import React from "react";
import "./css/Logo.css";

import logo from "../assets/imgs/logo_branca.png";
import { Link } from "react-router-dom";

export default props => 
<aside className="logo">
    <Link to="/home" className="logo">
        <img src={logo} alt="logo" />
    </Link>
</aside> 