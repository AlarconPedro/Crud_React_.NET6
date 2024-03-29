export default function tipoDesafio(id) {
    const distancia = () => {
        let lista = [];
        lista = [
            { id: 1, nome: "KM" },
            { id: 2, nome: "Metros" },
        ]

        return lista;
    }

    const tempo = () => {
        let lista = [];
        lista = [
            { id: 3, nome: "Horas" },
            { id: 4, nome: "Minutos" },
        ]

        return lista;
    }

    const frequencia = () => {
        let lista = [];
        lista = [
            { id: 5, nome: "Dias" },
        ]

        return lista;
    }

    switch (id) {
        case '1':
            return distancia();
        case '2':
            return tempo();
        case '3':
            return frequencia();
        default:
            return [
                { id: 1, nome: "Km" },
                { id: 2, nome: "Metros" },
                { id: 3, nome: "Horas" },
                { id: 4, nome: "Minutos" },
                { id: 5, nome: "Dias" },
            ];
    }
}