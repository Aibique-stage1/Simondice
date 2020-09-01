// Constants for color, button and maximum levels of the game. Actually:10;
const celeste=document.getElementById('celeste')
const violeta=document.getElementById('violeta')
const naranja=document.getElementById('naranja')
const verde=document.getElementById('verde')
const btnEmpezar=document.getElementById('btnEmpezar')
const NIVEL_MAX=10

//2.Creating the Prototype of "Juego"
//(Class)--> it's basically a "special function", and object you assign a name or not. and when you call that 
//classes count with prototypes and methods.
//(Constructor)--> that are methods to initializing a class. There can be only one per class.
//(This)-->to point out the property and methods of the objects.
//(.bing())--> It relates to the object or property of the object you indicate.
class Juego {
  // This will be the Prototype of the Object "Juego".
  // As we mentioned, the constructor initializing the Prototype.
  constructor() {
  //So basically there are 4 methods, first it's binding and the rest aren't.
    this.inicializar=this.inicializar.bind(this)
    this.inicializar()
    this.creadorSecuencia()
    setTimeout(this.detectarNiveles,500)
  }

  // called by "constructor"--> It will initializing the Game.
  inicializar (){
    // 2 binding functions and one without it.
    this.detectarNiveles=this.detectarNiveles.bind(this)
    this.detectarColor=this.detectarColor.bind(this)
    this.toggleBtnEmpezar()

    // The level we will start for.
    this.level =1

    // Objects of the colors that we will find.
    this.color={
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  // called by "Inicializar"--> Delete the button if it was before or not.
  toggleBtnEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide')
    }
  }

  // Called by "constructor"--> It will create the sequence,that is the maximum of levels.
  //In this case is 10.
  creadorSecuencia(){
    this.secuencia=new Array(NIVEL_MAX).fill(0).map(n=>Math.floor(Math.random()*4))
  }

  // Called by "constructor"--> It detect the level we are, for that create a sublevel that will increase
  //till reach Sequence's length.
  //It will illuminate the Sequence in the respective level the user is.
  //It will detect the clicks the user make on the object.
  detectarNiveles(){
    this.subnivel=0
    this.iluminarSecuencia()
    this.detectarClicks()
  }

  // Called by "iluminarSecuencia"-->It transform the number into a colour.
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

  //Called by ""-->It transform the colour into a number.
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

  //Called by "detectarnivel"--> It does illuminate the respective colours depending in wish level the user is.
  //Ex--> level 3(there are 10 levels because Sequence)--->colors to illuminate are 3.
  //First it transform the numbers of the Sequence into color 
  //Finally it illuminate the colors with the method "iluminarColor"
  iluminarSecuencia(){
    for (let i = 0; i < this.level; i++) {
      const color=this.numeroAColor(this.secuencia[i])
      setTimeout(()=>this.iluminarColor(color),1000*i)
  }
}

// Called by "iluminarSecuencia"-->It does illuminate the colors it's sent.
  iluminarColor(color){
    this.color[color].classList.add('light')
    setTimeout(()=>this.desiluminarColor(color),350)
}

// Called by "iluminarColor"--> To give the effect, when it's illuminate the colour after a certain period of time
//this function it's called to switch off the lightness of the colour.
desiluminarColor(color){
  this.color[color].classList.remove('light')
}

// Called by "detectarNiveles"--> It register the click events the user make on the colours.
detectarClicks(){
  // It associate and event to each colour, at the same time it calls the method to detect the color.
  this.color.celeste.addEventListener('click',this.detectarColor)
  this.color.violeta.addEventListener('click',this.detectarColor)
  this.color.naranja.addEventListener('click',this.detectarColor)
  this.color.verde.addEventListener('click',this.detectarColor)
}

// Called by "detectarColor"--> After the clicks have been register and test, it removes the event click.
eliminarEventosClick(){
  this.color.celeste.removeEventListener('click',this.detectarColor)
  this.color.violeta.removeEventListener('click',this.detectarColor)
  this.color.naranja.removeEventListener('click',this.detectarColor)
  this.color.verde.removeEventListener('click',this.detectarColor)
}

// Called by "detectarClicks"--> MAIN METHOD> It does compare the color the user had made click on, 
//It throws succeed or error message to the user if he made a mistake.
// It will pass to the next level if the click sequence was successful.
detectarColor(e){
  //e.target.dataset.color--> which is the colour where the event has occur.
  //It transform the color into a number to make it easier to compare with the Sequence numbers.
  //Illuminate the colours the user had made click on.
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



// The button "start the game", has an attribute onclick that calls this function
//This function called "empezarJuego" does create a new Object called "Juego"
function empezarJuego(){
  // This object has parentesis because we will work on it later.
  window.juego= new Juego()
}
