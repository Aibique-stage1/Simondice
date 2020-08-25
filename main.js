// Constantes que seran los colores, el boton y el numero de niveles
const celeste=document.getElementById('celeste')
const violeta=document.getElementById('violeta')
const naranja=document.getElementById('naranja')
const verde=document.getElementById('verde')
const btnEmpezar=document.getElementById('btnEmpezar')
const NIVEL_MAX=10
class Juego {
  // nuestro objeto que sera la base de todo el Juego
  // Dentro tenemos el inicializador, el que crea el array de colores a encender y el paso de nivel
  constructor() {
    this.inicializar=this.inicializar.bind(this)
    this.inicializar()
    this.creadorSecuencia()
    setTimeout(this.detectarNiveles,500)
  }
  // Se inicializa, borrando el boton dependiendo de si ya estaba escondido o no
  inicializar (){
    this.detectarNiveles=this.detectarNiveles.bind(this)
    this.detectarColor=this.detectarColor.bind(this)
    this.toggleBtnEmpezar()
    // el nivel en el que se empieza
    this.level =1
    // los colores que habra
    this.color={
      celeste,
      violeta,
      naranja,
      verde
    }
  }
  // Funcion que esconde el boton dependiendo de si ya lo estaba o no
  toggleBtnEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide')
    }
  }
  // Nos crea una secuencia de subnivelesmaximo
  creadorSecuencia(){
    this.secuencia=new Array(NIVEL_MAX).fill(0).map(n=>Math.floor(Math.random()*4))
  }
  // Nos para al siguiente nivel, iluminando los colores y donde hacemos click
  detectarNiveles(){
    this.subnivel=0
    this.iluminarSecuencia()
    this.detectarClicks()
  }
  // Pasa el color a un numero que sabemos
  numeroAColor(numero){
    switch (numero) {
      case 0:
      return 'celeste'
      case 1:
      return 'violeta'
      case 2:
      return 'naranja'
      case 3:
      return 'verde'
    }
  }
  // Pasa de numero a color
  colorANumero(color){
    switch (color) {
      case 'celeste':
      return 0
      case 'violeta':
      return 1
      case 'naranja':
      return 2
      case 'verde':
      return 3
    }
  }
  // Se encarga de iluminar los colores segun el nivel
  iluminarSecuencia(){
    for (let i = 0; i < this.level; i++) {
      const color=this.numeroAColor(this.secuencia[i])
      setTimeout(()=>this.iluminarColor(color),1000*i)
  }
}
// Funcion que ilumina el color
  iluminarColor(color){
    this.color[color].classList.add('light')
    setTimeout(()=>this.desiluminarColor(color),350)
}
// Funcion que apaga el color
desiluminarColor(color){
  this.color[color].classList.remove('light')
}
// Detecta donde le damos click
detectarClicks(){
  // Si no se pone el metodo, el this se refira al boton
  this.color.celeste.addEventListener('click',this.detectarColor)
  this.color.violeta.addEventListener('click',this.detectarColor)
  this.color.naranja.addEventListener('click',this.detectarColor)
  this.color.verde.addEventListener('click',this.detectarColor)
}
// Cancela que hagamos mas clicks
eliminarEventosClick(){
  this.color.celeste.removeEventListener('click',this.detectarColor)
  this.color.violeta.removeEventListener('click',this.detectarColor)
  this.color.naranja.removeEventListener('click',this.detectarColor)
  this.color.verde.removeEventListener('click',this.detectarColor)
}
// Agarra el color y los compara. Tambien pasa al siguiente nivel y te envia mensajes de error o premio
detectarColor(e){
  const colorDetectado= e.target.dataset.color
  const numeroColor=this.colorANumero(colorDetectado)
  this.iluminarColor(colorDetectado)

  if(numeroColor===this.secuencia[this.subnivel]){
  this.subnivel++
  if(this.subnivel===this.level){
    this.level++
    this.eliminarEventosClick()
    if(this.level=== (NIVEL_MAX+1)){
      this.ganoElJuego()
    }else{
      setTimeout(this.detectarNiveles,1500)
    }
  }
}else{
  this.perdioElJuego()
}
}
ganoElJuego(){
  swal('Felicitaciones','Ganaste el Juego','success')
  .then(this.inicializar)
}
perdioElJuego(){
  swal('Error','Lo siento, has perdido','error')
  .then(()=>{
    this.eliminarEventosClick()
    this.inicializar()
  })
}
}



// Al hacer click en el boton el juego comienza con un objeto
function empezarJuego(){
  // No entiendo por que el prototipo lleva los parentesis?
  window.juego= new Juego()
}
