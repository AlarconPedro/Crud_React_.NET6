export default function ConverteDistancia(distancia) {
    let distanciaMetros = 0;
    let distanciaKm = 0;

    if (distancia) {
        let distanciaConvertida = distancia * 1000;
        distanciaMetros = Math.floor(distanciaConvertida % 1000);
        distanciaKm = Math.floor(distanciaConvertida / 1000);
    }

    if (distanciaMetros < 10)
        distanciaMetros = `00${distanciaMetros}`;
    else if (distanciaMetros < 100)
        distanciaMetros = `0${distanciaMetros}`;

    // if (distanciaKm < 10)
    //     distanciaKm = `0${distanciaKm}`;

    return `${distanciaKm},${distanciaMetros}`;
}