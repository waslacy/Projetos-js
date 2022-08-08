var altura = 0
var largura = 0
var vidas = 1

ajustaTela()
cronometro()
dificuldade()

function ajustaTela() {

    altura = window.innerHeight
    largura = window.innerWidth
}

function iniciaJogo(){
    var nivel = document.getElementById('nivel').value
    
    if (nivel == ''){
        alert('Selecione um nível para iniciar o jogo')
        return false
    }

    window.location.href = 'jogo.html?' + nivel
}

function dificuldade(){
    var nivel = window.location.search.replace('?', '')

    if (nivel == 'normal'){
        return 1500
    
    } else if (nivel == 'dificil'){
        return 1000

    } else if (nivel == 'brabo'){
        return 750
        
    } else if (nivel == 'chucknorris'){
        return 200
    }
}

function cronometro() {
    var tempo = 10

    setInterval(function(){
        if (tempo >= 0){
            document.getElementById('cronometro').innerHTML = tempo
        
        } else{
            window.location.href = 'vitoria.html'
        }

        tempo--
    }, 1000)
}

function cria(){  

    if (document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        if (vidas > 3){
            window.location.href = 'gameOver.html'

        } else{
            document.getElementById('v' + vidas).src = 'imgs/coracao_vazio.png'
            vidas++
        }
    }

    var mosquito = document.createElement('img')
    mosquito.src = 'imgs/mosca.png'
    mosquito.className = tamanho() + ' ' + lado()
    mosquito.style.left = posicao('x') + 'px'
    mosquito.style.top = posicao('y') + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){ this.remove() }

    document.body.appendChild(mosquito)
}

function posicao(pos){

    var posX = Math.floor(Math.random() * largura) - 90
    var posY = Math.floor(Math.random() * altura) - 90

    posX = posX < 0 ? 0 : posX
    posY = posY < 0 ? 0 : posY

    if (pos == 'x') {
        return posX
    } else if (pos == 'y'){
        return posY
    }
}

function tamanho(){

    var classe = Math.floor(Math.random() * 3)
    
    switch (classe){
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

function lado(){

    var classe = Math.floor(Math.random() * 2)

    switch (classe){
        case 0: 
            return 'ladoA'
        
        case 1: 
            return 'ladoB'
    }
}