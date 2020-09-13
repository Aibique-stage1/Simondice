// Constants for color, button and maximum levels of the game. Actually:10;
const cyan=document.getElementById('cyan')
const violet=document.getElementById('violet')
const orange=document.getElementById('orange')
const green=document.getElementById('green')
const btnStart=document.getElementById('btnStart')
const nLevel= document.getElementById('nLevel');
const nMaxLevel=document.getElementById('nMaxLevel');

let slider=document.getElementById("slider");
// let selectedValue = document.getElementById("selectedValue");

nMaxLevel.innerHTML = slider.value;
slider.oninput = function(){
  nMaxLevel.innerHTML = slider.value;
  selector.style.left = this.value + "%";
}

// let LEVEL_MAX;

//2.Creating the Prototype of "Juego"
//(Class)--> it's basically a "special function", and object you assign a name or not. and when you call that 
//classes count with prototypes and methods.
//(Constructor)--> that are methods to initializing a class. There can be only one per class.
//(This)-->to point out the property and methods of the objects.
//(.bing())--> It relates to the object or property of the object you indicate.
class Game {
  // This will be the Prototype of the Object "Juego".
  // As we mentioned, the constructor initializing the Prototype.
  constructor() {
  //So basically there are 4 methods, first it's binding and the rest aren't.
    this.initialize=this.initialize.bind(this)
    this.initialize()
    this.sequenceMaker()
    setTimeout(this.sublevelPosition,500)
  }





  //1.INITIALIZATION-->
  // called by "constructor"--> It will initializing the Game.
  initialize (){
    // 2 binding functions and one without it.
    this.sublevelPosition=this.sublevelPosition.bind(this)
    this.detectColor=this.detectColor.bind(this)
    this.toggleBtnStart()

    // The level we will start for.
    this.level =1

    // Objects of the colors that we will find.
    this.color={
      cyan,
      violet,
      orange,
      green
    }
  }

  // called by "Initialize"--> Delete the button if it was before or not.
  toggleBtnStart(){
    if(btnStart.classList.contains('hide')){
      btnStart.classList.remove('hide')
    }else{
      btnStart.classList.add('hide')
    }
  }





  //2.CREATION OF THE SEQUENCE.
  // Called by "constructor"--> It will create the sequence,that is the maximum of levels.
  //In this case is 10.
  sequenceMaker(){
    let levelsMax=slider.value;
    this.LEVEL_MAX= parseInt(levelsMax);
    this.sequence=new Array(this.LEVEL_MAX).fill(0).map(n=>Math.floor(Math.random()*4))
    nMaxLevel.innerText=`${this.LEVEL_MAX}`;
  }





  // Called by "constructor"--> It detect the level we are, for that create a sublevel that will increase
  //till reach Sequence's length.
  //It will illuminate the Sequence in the respective level the user is.
  //It will detect the clicks the user make on the object.
  sublevelPosition(){
    this.sublevel=0
    this.illuminateSequence()
    this.detectClick()
  }

  // Called by "illuminateSequence"-->It transform the number into a colour.
  numberToColor(number){
    switch (number) {
      case 0:
      return 'cyan'
      case 1:
      return 'violet'
      case 2:
      return 'orange'
      case 3:
      return 'green'
    }
  }

  //Called by ""-->It transform the colour into a number.
  colorToNumber(color){
    switch (color) {
      case 'cyan':
      return 0
      case 'violet':
      return 1
      case 'orange':
      return 2
      case 'green':
      return 3
    }
  }

  //Called by "sublevelPosition"--> It does illuminate the respective colours depending in wish level the user is.
  //Ex--> level 3(there are 10 levels because Sequence)--->colors to illuminate are 3.
  //First it transform the numbers of the Sequence into color 
  //Finally it illuminate the colors with the method "illuminateColor"
  illuminateSequence(){
    for (let i = 0; i < this.level; i++) {
      const color=this.numberToColor(this.sequence[i])
      setTimeout(()=>this.illuminateColor(color),1000*i)
  }
}

// Called by "illuminateSequence"-->It does illuminate the colors it's sent.
illuminateColor(color){
    this.color[color].classList.add('light')
    setTimeout(()=>this.turnOffColor(color),350)
}

// Called by "illuminateColor"--> To give the effect, when it's illuminate the colour after a certain period of time
//this function it's called to switch off the lightness of the colour.
turnOffColor(color){
  this.color[color].classList.remove('light')
}

// Called by "sublevelPosition"--> It register the click events the user make on the colours.
detectClick(){
  // It associate and event to each colour, at the same time it calls the method to detect the color.
  this.color.cyan.addEventListener('click',this.detectColor)
  this.color.violet.addEventListener('click',this.detectColor)
  this.color.orange.addEventListener('click',this.detectColor)
  this.color.green.addEventListener('click',this.detectColor)
}

// Called by "detectColor"--> After the clicks have been register and test, it removes the event click.
omitEventsClick(){
  this.color.cyan.removeEventListener('click',this.detectColor)
  this.color.violet.removeEventListener('click',this.detectColor)
  this.color.orange.removeEventListener('click',this.detectColor)
  this.color.green.removeEventListener('click',this.detectColor)
}



// Called by "detectClick"--> MAIN METHOD> It does compare the color the user had made click on, 
//It throws succeed or error message to the user if he made a mistake.
// It will pass to the next level if the click sequence was successful.
detectColor(e){
  //e.target.dataset.color--> which is the colour where the event has occur.
  //It transform the color into a number to make it easier to compare with the Sequence numbers.
  //Illuminate the colours the user had made click on.
  const colorDetected= e.target.dataset.color
  const numberColor=this.colorToNumber(colorDetected)
  this.illuminateColor(colorDetected)

  //Once it's a number the color, it's time to compare it with the number in the Sequence.
  //If both are the same, the sublevel will increase.
  //If the sublevel is the same as the level, then increase the level.
  //Finally if the level it's equal to the maximum level--> User passed the game "CONGRATULATIONS"
  //Otherwise call all the methods again for the next level.
  if(numberColor===this.sequence[this.sublevel]){
  this.sublevel++;

  if(this.sublevel===this.level){
    this.level++;
    nLevel.innerText=`${this.level}`
    this.omitEventsClick()
    if(this.level=== (this.LEVEL_MAX+1)){
      this.wonGame();
      nLevel.innerText=`0`;
    }else{
      setTimeout(this.sublevelPosition,1500)
    }
  }
}else{
  this.lostGame()
  nLevel.innerText=`0`;
}
}



//Called by "detectColor"-->Message showed once the user pass all the levels.
wonGame(){
  swal('Congratulations','you won the game','success')
  .then(this.initialize)
}

//Called by "detectColor"-->Message showed once the user make a mistake.
lostGame(){
  swal('Error','Sorry, you lost','error')
  .then(()=>{
    this.omitEventsClick()
    this.initialize()
  })
}

}



// The button "Start Game!", has an attribute onclick that calls this function
//This function called "startGame" does create a new Object called "game"
function startGame(){
  // This object has parentesis because we will work on it later.
  window.game= new Game()
}
