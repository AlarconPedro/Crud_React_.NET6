export default function ConverteTempo(tempo) {
    let tempoSegundos = 0;
    let tempoMinutos = 0;
    let tempoHoras = 0;

    if (tempo) {
        tempoSegundos = tempo % 60;
        tempoMinutos = Math.floor((tempo / 60) % 60);
        tempoHoras = Math.floor(tempo / 3600);
    }

    if (tempoSegundos < 10) 
        tempoSegundos = `0${tempoSegundos}`;
    
    if (tempoMinutos < 10)
        tempoMinutos = `0${tempoMinutos}`;
    
    if (tempoHoras < 10)
        tempoHoras = `0${tempoHoras}`;

    // return `${tempoMinutos}:${tempoSegundos}`;
    return `${tempoHoras}:${tempoMinutos}:${tempoSegundos}`;
}