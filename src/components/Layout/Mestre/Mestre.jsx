import React, { useEffect } from 'react';

import "./Mestre.css";

import Header from '../Estrutura/Header';
import useIdle from '../Hooks/useIdle';
import moment from 'moment';

import Session from '../../../Session';

export default props => {

    const logout = () => {
        localStorage.clear();
        window.location.replace("/login");
    }

    const { isIdle } = useIdle({
        onIdle: logout,
        idleTime: 1,
    });

    useEffect(() => {
        verificaLogin();
    }, []);

    // useEffect(() => {
    //     moment.locale("pt-br");
    //     let expira = moment().add(1, "minutes").format("HH:mm:ss");
    //     localStorage.setItem("expira ", expira);
    // }, []);

    const verificaLogin = () => {
        if (localStorage.length === 0 && localStorage.getItem("logado") === "false") {
            return Session({ isLogged: false, isIdle: true });
        }
    }

    if (!isIdle && localStorage.length > 0) {
        localStorage.setItem("logado", true);
        return (
            <React.Fragment>
                <Header {...props} />
                <main className="content container-fluid">
                    <div className="p-3 mt-3">
                        {props.children}
                    </div>
                </main>
            </React.Fragment>
        );
    } else {
        localStorage.setItem("logado", false);
        logout();
    }
}