export default function ConverteData(data) {
    let dataAtual = new Date(data);
    let dia = '' + (dataAtual.getDate());
    let mes = '' + (dataAtual.getMonth() + 1);
    let ano = dataAtual.getFullYear();

    if (mes.length < 2)
    mes = '0' + mes;

    if (dia.length < 2)
    dia = '0' + dia;
    // let dataFormatada = `${dia}/${mes}/${ano}`;
    let dataFormatada = [dia, mes, ano].join('/');
    return dataFormatada;
}