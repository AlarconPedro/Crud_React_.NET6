import React from "react";
import Calendar from 'rc-calendar';
import Local from 'rc-calendar/lib/locale/pt_BR'
import 'rc-calendar/assets/index.css';

import Mestre from "../../components/Layout/Mestre/Mestre";

import "./Calendario.css";

export default function Calendario() {

    const selectDate = (value) => {
        value.Date = value.getDate();
    }

    return (
        <Mestre icon="calendar" title="Calendário" subtitle="Painel Sou+Fit">
            <Calendar
                className="calendario"
                format={"DD/MM/YYYY"}
                showDateInput={false}
                locale={Local}
                showToday={true}
                value={new Date()}
                selectedValue={new Date(Date.now().toString())}
                onSelect={(value) => selectDate(value)}
            />
        </Mestre>
    )
}