class Player{
    constructor(idDoVideo){
        this.video = document.getElementById(idDoVideo)
        this.display = document.querySelector('#displayTempo')
        this.barra = document.querySelector('#barraProgresso')
        this.video.addEventListener('timeupdate',()=>{
            const tempoFormatado = this.formatarTempo(this.video.currentTime)
                this.display.innerHTML = tempoFormatado
                if(!isNaN(this.video.duration)){
                    const porcentagem = (this.video.currentTime / this.video.duration) * 100
                    this.barra.value = porcentagem
                }
            })
            this.barra.addEventListener('input',()=>{
                this.buscarTempo()
            })
    }
    formatarTempo(segundosTotais){
        const minutos = Math.floor(segundosTotais / 60)
        const segundos = Math.floor(segundosTotais % 60)

        const minFormatado = String(minutos).padStart(2, '0')
        const segFormatado = String(segundos).padStart(2,'0')
        
        return `${minFormatado}:${segFormatado}`
    }
    tocar(){
        this.video.play()
        console.log('O vídeo começou!')
    }
    pausar(){
        this.video.pause()
        console.log('O vídeo parou!')
    }
    mudarVelocidade(valor){
        this.video.playbackRate = valor
    }
    toggleVelocidade(){
        if(this.video.playbackRate === 1.0){
            this.video.playbackRate = 2.0
            console.log('Velocidade = 2.0.')
        }else{
            this.video.playbackRate = 1.0
        }
    }
    toggleMutar(){
        this.video.muted = !this.video.muted
        console.log(this.video.muted ? 'Vídeo mutado.' : 'Vídeo com som.')
    }
    ajustarVolume(valor){
        if(valor < 0) valor = 0
        if(valor > 1) valor = 1

        this.video.volume = valor
        console.log(`Volume atual: ${Math.round(valor * 100)}%.`)
    }
    avancar(){
        this.video.currentTime = this.video.currentTime + 10
    }
    voltar(){
        this.video.currentTime = this.video.currentTime - 10
    }
    buscarTempo(){
        const tempoParaPular = (this.barra.value / 100) * this.video.duration
        this.video.currentTime = tempoParaPular
    }
}

const meuPlayer = new Player('meuVideo')

const btnPlay = document.querySelector('#btnPlay')
const btnPause = document.querySelector('#btnPause')
const btnVeloz = document.querySelector('#btnMaisVeloz')
const btnLento = document.querySelector('#btnMenosVeloz')
const btnMutar = document.querySelector('#btnMutar')
const btnAvancar = document.querySelector('#btnPularTempo')
const btnVoltar = document.querySelector('#btnVoltarTempo')

const volControl = document.querySelector('#volControl')
volControl.addEventListener('input',(e)=>{
    meuPlayer.ajustarVolume(e.target.value)
})

btnPlay.addEventListener('click',function(){
    meuPlayer.tocar()
})

btnPause.addEventListener('click',function(){
    meuPlayer.pausar()
})

btnVeloz.addEventListener('click',function(){
    meuPlayer.toggleVelocidade()
})

btnLento.addEventListener('click',function(){
    meuPlayer.mudarVelocidade(1.0)
    console.log('Velocidade = 1.0.')
})

btnMutar.addEventListener('click',function(){
    meuPlayer.toggleMutar()
})

btnAvancar.addEventListener('click',function(){
    meuPlayer.avancar()
    console.log(`Avançou dez segundos.`)
})
btnVoltar.addEventListener('click',function(){
    meuPlayer.voltar()
    console.log(`Voltou dez segundos.`)
})