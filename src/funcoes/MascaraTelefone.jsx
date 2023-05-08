export default function MascaraTelefone(telefone) {
    const mascara = (telefone) => {
        let input = telefone.target;
        input.value = phoneMask(input.value);
        setAluno({ ...aluno, [telefone.target.name]: input.value });
    }

    const phoneMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{4})$/, "$1-$2")
        return value
    }

    return mascara;
}