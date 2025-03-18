const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/sons/beep.mp3')
const comecar = document.querySelector('#start')
const imgPausePlay = document.querySelector ('.app__card-primary-butto-icon')
const timer = document.querySelector('.app__card-timer')

let contexto = 'foco'
let tempoDecorridoEmSegundos = obterTempo()
let intervaloId = null

musica.loop = true
atualizaTimer(obterTempo(contexto))
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
    contexto = 'foco'
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    contexto = 'descanso-curto'
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    contexto = 'descanso-longo'
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            atualizaTimer(obterTempo('foco'))
            zerar()
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            atualizaTimer(obterTempo('descanso-curto'))
            zerar()
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            atualizaTimer(obterTempo('descanso-longo'))
            zerar()
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    timer.innerHTML  = new Date(tempoDecorridoEmSegundos * 1000).toISOString().substr(14, 5)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    comecar.innerHTML= 'Pausar'
    imgPausePlay.setAttribute('src','/imagens/pause.png')
    if(intervaloId){
        audioPausa.play()
        comecar.innerHTML= 'Começar'
        imgPausePlay.setAttribute('src','/imagens/play_arrow.png')
        zerar()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    tempoDecorridoEmSegundos = obterTempo(contexto)
    atualizaTimer(obterTempo(contexto))
}

function zerar() {
    clearInterval(intervaloId) 
    intervaloId = null
    comecar.innerHTML= 'Começar'
    imgPausePlay.setAttribute('src','/imagens/play_arrow.png')
}

function obterTempo(contexto){
    switch(contexto){
        case 'foco':
            return 1500
        case 'descanso-curto':
            return 300
        case 'descanso-longo':
            return 900
        default:
            return
    }
}

function atualizaTimer(tempo){
    timer.textContent = new Date(tempo * 1000).toISOString().substr(14, 5)
}

