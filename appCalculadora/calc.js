function calcula(tipo, valor){
    if (tipo === 'acao'){
        if (valor === 'c'){
            document.getElementById('resultado').value = ''
        }

        if (valor === '+' || valor === '-' || valor === '*' || valor === '/' || valor === '.'){
            document.getElementById('resultado').value += valor
        }

        if (valor === '='){
            var valorResult = document.getElementById('resultado').value
            document.getElementById('resultado').value = (eval(valorResult))
        }

    } else {
        document.getElementById('resultado').value += valor
    }
}