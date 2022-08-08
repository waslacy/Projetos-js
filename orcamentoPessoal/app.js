class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        let flag = 0
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                flag = 1
                return false
            }
        }
        if (flag === 0) {
            return true
        }
    }
}

class Bd {
    constructor(){
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    recuperaRegistros(){
        let despesas = Array()
        let id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))
            if(despesa != null){
                despesa.id = i
                despesas.push(despesa)
            }
        }

        return despesas
    }

    pesquisar(despesa){
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperaRegistros()

        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function addDespesa(){
    var ano = document.getElementById('ano').value
    var mes = document.getElementById('mes').value
    var dia = document.getElementById('dia').value
    var tipo = document.getElementById('tipo').value
    var descricao = document.getElementById('descricao').value
    var valor = document.getElementById('valor').value

    var despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    
    valida(despesa)
}

function styleModal(titulo, classeTitulo, body, btn, classeBtn){
    document.getElementById('tituloModal').innerHTML = titulo
    document.getElementById('tituloModal').className = classeTitulo
    document.getElementById('bodyModal').innerHTML = body
    document.getElementById('btnFooter').innerHTML = btn
    document.getElementById('btnFooter').className = classeBtn
}

function valida(d){
    if(d.validarDados()){
        bd.gravar(d)
        $('#modal').modal('show')

        styleModal('Despesa gravada com sucesso',
                   'modal-title text-success',
                   'Despesa registrada com sucesso',
                   'Voltar',
                   'btn btn-success')

        document.getElementById('ano').value = ''
        document.getElementById('mes').value = ''
        document.getElementById('dia').value = ''
        document.getElementById('tipo').value = ''
        document.getElementById('descricao').value = ''
        document.getElementById('valor').value = ''

    } else{
        $('#modal').modal('show')

        styleModal('Erro na gravação',
                   'modal-title text-danger',
                   'Existem campos obrigatórios que não foram preechidos',
                   'Voltar e corrigir',
                   'btn btn-danger')
    }
}

function carregaDespesas(){
    let despesas = Array()
    despesas = bd.recuperaRegistros()

    geraTabela(despesas)
}

function geraTabela(a){
    let tabelaDespesas = document.getElementById('tabela')
    tabelaDespesas.innerHTML = ''

    a.forEach(function(d){
        let linha = tabelaDespesas.insertRow()

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `idDespesa${d.id}` 
        btn.onclick = function(){
            let id = this.id.replace('idDespesa', '')
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })
}

function pesquisaDespesa(){
    var ano = document.getElementById('ano').value
    var mes = document.getElementById('mes').value
    var dia = document.getElementById('dia').value
    var tipo = document.getElementById('tipo').value
    var descricao = document.getElementById('descricao').value
    var valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    geraTabela(bd.pesquisar(despesa))
}